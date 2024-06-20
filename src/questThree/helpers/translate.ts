import fs from 'fs-extra';
import pdfParse from 'pdf-parse';
import PDFDocument from 'pdfkit';
import { translate } from '@vitalets/google-translate-api';

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData: any = await pdfParse(dataBuffer);

    if (pdfData.isEncrypted) {
      throw new Error('PDF file is encrypted');
    }

    return pdfData.text;
  } catch (error) {
    throw error;
  }
}

export async function translateText(text: string, targetLang: string = 'en'): Promise<string> {
  try {
    const result: any = await translate(text, { to: targetLang });

    if (result.error) {
      throw new Error(`Error translating text: ${result.error}`);
    }

    return result.text;
  } catch (error) {
    throw error;
  }
}

export async function createPDFWithText(text: string, outputPath: string): Promise<void> {
  try {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(outputPath);

    doc.pipe(writeStream);

    const fontSize = 12;
    const margin = 40;
    let y = margin;

    doc
      .fontSize(fontSize)
      .text(text, margin, y, {
        width: doc.page.width - margin * 2,
        height: doc.page.height - margin * 2,
        align: 'left',
        lineGap: 5,
      });

    doc.end();

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw error;
  }
}