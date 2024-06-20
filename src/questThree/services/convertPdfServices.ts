import { extractTextFromPDF, translateText, createPDFWithText } from '../helpers/translate';
import fs from 'fs-extra';

class TranslatePdfService {
  public async translatePdf(inputFilePath: string, outputFilePath: string): Promise<void> {
    try {
      const koreanText = await extractTextFromPDF(inputFilePath);
      const englishText = await translateText(koreanText);
      await createPDFWithText(englishText, outputFilePath);
      await fs.remove(inputFilePath);
    } catch (error) {
      throw error;
    }
  }
}

export default TranslatePdfService;