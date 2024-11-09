import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { countryName } = await req.json()
    const baseDownloadPath = path.join(process.cwd(), 'tmp', 'datasets');
    const datasetFolder = path.join(baseDownloadPath, 'paris-2024-olympic-summer-games');

    const csvFileName = 'medals_total.csv';
    const csvFilePath = path.join(datasetFolder, csvFileName);

    const athletesFileName = 'athletes.csv';
    const athletesFilePath = path.join(datasetFolder, athletesFileName);

    if (!fs.existsSync(csvFilePath) && !fs.existsSync(athletesFileName)) {
        console.log('One or more CSV files do not exist in the dataset folder.');
        return NextResponse.json({
            totalMedals: null,
            athletesAgeGroups: null,
            success: false,
            message: 'One or more CSV files do not exist in the dataset folder.',
        });
    }

    // Function to parse CSV data and find the desired country's data
    const getMedals = () => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    const medals = results.find(country => country["country"] === countryName);
                    resolve(medals);
                })
                .on('error', (error) => reject(error));
        });
    };

    const getAthletesAgeArray = (arr) => {
        const currentYear = new Date().getFullYear();
        const athletesAgeArr = arr.map((data) => currentYear - Number(data.birth_date.split('/')[2]));
        return athletesAgeArr;
    }

    const groupAgesByGender = (maleAges, femaleAges, groupCount = 7) => {
        // Determine the minimum and maximum age across both arrays
        const allAges = [...maleAges, ...femaleAges];
        const minAge = Math.min(...allAges);
        const maxAge = Math.max(...allAges);
        const rangeInterval = Math.ceil((maxAge - minAge) / groupCount);

        // Initialize age groups with ranges and separate counts for Males and Females
        const ageGroups = Array(groupCount).fill(0).map((_, index) => ({
            range: `${minAge + rangeInterval * index}+`,
            Males: 0,
            Females: 0
        }));

        // Function to increment count based on age array and gender
        const assignAgesToGroups = (ages, gender) => {
            ages.forEach(age => {
                const groupIndex = Math.min(
                    Math.floor((age - minAge) / rangeInterval),
                    groupCount - 1
                );
                ageGroups[groupIndex][gender] += 1;
            });
        };

        // Assign ages to groups for both males and females
        assignAgesToGroups(maleAges, 'Males');
        assignAgesToGroups(femaleAges, 'Females');

        return ageGroups;
    };

    const getAthletesAgeDist = () => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(athletesFilePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        const countryAthletes = results.filter(athlete => athlete["country"] === countryName);
                        const maleAthletes = countryAthletes.filter(athlete => athlete["gender"] === 'Male');
                        const femaleAthletes = countryAthletes.filter(athlete => athlete["gender"] === 'Female');

                        // Await the age array calculations
                        const maleAthletesAgeArr = await getAthletesAgeArray(maleAthletes);
                        const femaleAthletesAgeArr = await getAthletesAgeArray(femaleAthletes);

                        const ageGroups = groupAgesByGender(maleAthletesAgeArr, femaleAthletesAgeArr)
                        resolve(ageGroups);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => reject(error));
        })
    }

    try {
        const medals = await getMedals();
        const athletesAgeGroups = await getAthletesAgeDist()

        return NextResponse.json({
            totalMedals: medals ? medals : null,
            athletesAgeGroups: athletesAgeGroups ? athletesAgeGroups : null,
            success: true,
            message: 'CSV processed and JSON sent!',
        });
    } catch (error) {
        console.error('Error processing the CSV file:', error);
        return NextResponse.json({
            totalMedals: null,
            athletesAgeGroups: null,
            success: false,
            message: 'Error processing the CSV file.',
        });
    }
}