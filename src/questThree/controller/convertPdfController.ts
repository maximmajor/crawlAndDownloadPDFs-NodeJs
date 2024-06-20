import { Request, Response } from 'express';
import TranslatePdfService from '../services/convertPdfServices';
import { HttpException } from '../../middlewares/HttpException';
import path from 'path';

class TranslatePdfController {
  private translatePdfService: TranslatePdfService;

  constructor() {
    this.translatePdfService = new TranslatePdfService();
  }

  public translatePdf = async (req: Request, res: Response): Promise<void> => {
    try {
      const uploadedFile = req.file;

      if (!uploadedFile) {
        throw new HttpException(400, 'No file uploaded');
      }

      const inputFilePath = uploadedFile.path;
      const outputFilePath = path.join(__dirname, '../translated.pdf');

      await this.translatePdfService.translatePdf(inputFilePath, outputFilePath);

      res.status(200).json({
        status: 'success',
        message: 'PDFs converted and translated successfully.',
      });
    } catch (error: any) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ error: message });
      } else {
        res.status(500).json({ error: error.message || 'Internal server error' });
      }
    }
  }
}

export default TranslatePdfController;