import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { countryName, selectedDisciplines } = await req.json();

    if (!Array.isArray(selectedDisciplines)) {
        console.error('selectedDisciplines is not an array');
        return NextResponse.json({
            success: false,
            message: 'selectedDisciplines should be an array.',
        });
    }

    const baseDownloadPath = path.join(process.cwd(), 'tmp', 'datasets');
    const datasetFolder = path.join(baseDownloadPath, 'paris-2024-olympic-summer-games');

    const medalsFileName = 'medals.csv';
    const medalFilePath = path.join(datasetFolder, medalsFileName);

    if (!fs.existsSync(medalFilePath)) {
        console.log('CSV file does not exist in the dataset folder.');
        return NextResponse.json({
            medalByDisciplines: null,
            success: false,
            message: 'Country code CSV file does not exist in the dataset folder.',
        });
    }

    const getAllDisciplines = (arr) => {
        const disicplines = arr.map((data) => data['discipline']);
        const uniqueDisciplines = Array.from(new Set(disicplines));
        return uniqueDisciplines;
    }

    const getMedalsByGender = (allMedals) => {
        const disciplinesObjArr = selectedDisciplines.map((dis) => ({
            discipline: dis,
            Males: 0,
            Females: 0
        }));

        disciplinesObjArr.forEach((disObj) => {
            const disMalesMedals = allMedals.filter(medal => medal['discipline'] === disObj.discipline && medal['gender'] === 'M');
            const disFemalesMedals = allMedals.filter(medal => medal['discipline'] === disObj.discipline && medal['gender'] === 'W');

            disObj.Males = disMalesMedals.length;
            disObj.Females = disFemalesMedals.length;
        });

        return disciplinesObjArr;
    };

    const getAllMedals = (arr) => {
        const allMedals = arr.filter(medal => medal["country"] === countryName);

        const disciplinesArray = getMedalsByGender(allMedals);

        return [disciplinesArray];
    };

    const getMedalsByDisciplines = () => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(medalFilePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        const allDisciplines = getAllDisciplines(results);
                        const [disciplinesArray] = getAllMedals(results);
                        const allData = {
                            allDisciplines: allDisciplines,
                            disciplinesArray: disciplinesArray
                        }
                        resolve(allData);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => reject(error));
        });
    }

    try {
        const data = await getMedalsByDisciplines();

        return NextResponse.json({
            allDisciplines: data.allDisciplines,
            medalByDisciplines: data.disciplinesArray,
            success: true,
            message: 'CSV processed and JSON sent!',
        });
    } catch (error) {
        console.error('Error processing the CSV file:', error);
        return NextResponse.json({
            success: false,
            message: 'Error processing the CSV file.',
        });
    }
}