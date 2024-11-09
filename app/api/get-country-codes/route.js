import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

export async function GET() {
    const baseDownloadPath = path.join(process.cwd(), 'tmp', 'datasets');
    const datasetFolder = path.join(baseDownloadPath, 'paris-2024-olympic-summer-games');

    const csvFileName = 'countries_codes_flags.csv';
    const csvFilePath = path.join(datasetFolder, csvFileName);

    if (!fs.existsSync(csvFilePath)) {
        console.log('CSV file does not exist in the dataset folder.');
        return NextResponse.json({
            countries: null,
            success: false,
            message: 'Country code CSV file does not exist in the dataset folder.',
        });
    }

    const getCountries = () => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results)
                    return results;
                })
                .on('error', (error) => reject(error))

        })
    }
    try {
        const countries = await getCountries();

        return NextResponse.json({
            countries: countries ? countries : null,
            success: true,
            message: 'CSV processed and JSON sent!',
        });
    } catch (error) {
        console.error('Error processing the CSV file:', error);
        return NextResponse.json({
            countries: null,
            success: false,
            message: 'Country code CSV processing the CSV file.',
        })
    }
}