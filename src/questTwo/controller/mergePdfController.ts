import { Request, Response } from 'express';
import MergePdfService from '../services/mergePdfServices';
import { HttpException } from '../../middlewares/HttpException';

class MergePdfController {
  private mergePdfService: MergePdfService;

  constructor() {
    this.mergePdfService = new MergePdfService();
  }

  public mergePdfServiceAndDownloadPdf = async (req: Request, res: Response): Promise<void> => {
    try {
      const uploadedFiles = req.files as Express.Multer.File[];
      const inputFiles = uploadedFiles.map(file => file.path);
      const outputFile = './mergedPdfFile.pdf';

      if (!uploadedFiles || uploadedFiles.length === 0) {
        throw new HttpException(400, 'No files uploaded');
      }

      await this.mergePdfService.mergePdf(inputFiles, outputFile);
      res.status(200).json({ status: 'success', message: 'PDFs merged successfully.' });
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

export default MergePdfController;