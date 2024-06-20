import { Request, Response } from 'express';
import CrawlPdfDownloadService from '../services/crawlAndDownloadPDFsServices';
import { HttpException } from '../../middlewares/HttpException';

class CrawlPdfDownloadController {
  private crawlPdfDownloadService: CrawlPdfDownloadService;

  constructor() {
    this.crawlPdfDownloadService = new CrawlPdfDownloadService();
  }

  public crawlWebAndDownloadPdf = async (req: Request, res: Response): Promise<void> => {
    try {
      const crawlData  = req.body;

      if (!crawlData) {
        throw new HttpException(400, 'No data provided',);
      }

      const downloadPdf = await this.crawlPdfDownloadService.crawlWebAndDownloadPdf(crawlData);

      if (!downloadPdf) {
        throw new HttpException(500, 'Failed to download PDF');
      }

      res.status(200).json({
        status: 'success',
        message: downloadPdf,
      });
    } catch (error: any) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ error: message });
      } else {
        const { statusCode = 500, message = 'Internal Server Error' } = error;
        res.status(statusCode).json({ error: message });
      }
    }
  };
}

export default CrawlPdfDownloadController;