import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

// Define the directory to save and unzip the dataset
const baseDownloadPath = path.join(process.cwd(), 'tmp', 'datasets');
const datasetFolder = path.join(baseDownloadPath, 'paris-2024-olympic-summer-games');

async function downloadFile(url, filePath) {
    const res = await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.KAGGLE_USERNAME}:${process.env.KAGGLE_KEY}`).toString('base64')}`,
        },
    });

    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);

    const fileStream = fs.createWriteStream(filePath);

    for await (const chunk of res.body) {
        fileStream.write(chunk);
    }
    fileStream.end();
}

async function unzipFile(zipFilePath, extractToPath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractToPath }))
            .on('close', resolve)
            .on('error', reject);
    });
}

export async function GET() {
    // Ensure the base directory exists
    if (!fs.existsSync(baseDownloadPath)) {
        fs.mkdirSync(baseDownloadPath, { recursive: true });
    }

    // Check if the dataset folder already exists
    if (fs.existsSync(datasetFolder)) {
        // If the dataset folder exists, return the list of files in it
        const existingFiles = fs.readdirSync(datasetFolder);
        return NextResponse.json({
            success: true,
            message: 'Dataset already exists.',
            files: existingFiles,
        });
    }

    try {
        // Create the dataset folder if it doesn’t exist
        fs.mkdirSync(datasetFolder, { recursive: true });

        const dataset = 'piterfm/paris-2024-olympic-summer-games';
        const kaggleUrl = `https://www.kaggle.com/api/v1/datasets/download/${dataset}`;
        const zipFilePath = path.join(datasetFolder, 'dataset.zip');

        // Download the Kaggle dataset as a zip file
        await downloadFile(kaggleUrl, zipFilePath);

        // Unzip the downloaded file into the dataset folder
        await unzipFile(zipFilePath, datasetFolder);

        // Delete the zip file after extraction
        fs.unlinkSync(zipFilePath);

        // Get the list of extracted files in the folder
        const extractedFiles = fs.readdirSync(datasetFolder);

        return NextResponse.json({
            success: true,
            message: 'Dataset downloaded and unzipped successfully',
            files: extractedFiles,
        });
    } catch (error) {
        console.error('Error processing dataset:', error);
        return NextResponse.json({ success: false, message: error.message });
    }
}