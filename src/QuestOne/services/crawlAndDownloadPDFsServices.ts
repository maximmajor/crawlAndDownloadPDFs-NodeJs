import { HttpException } from '../../middlewares/HttpException';
import { CrawlAndDownloadParams, crawlAndDownloadPDFs } from '../helpers/crawlAndDownloadPDFs';
import { isValidUrl } from '../helpers/validateUrl';

class CrawlPdfDownloadService {
  public async crawlWebAndDownloadPdf(crawlData: CrawlAndDownloadParams): Promise<string> {
    const { url } = crawlData;

    if (!url) {
      throw new HttpException(401, 'URL is required');
    }

    if (!isValidUrl(url)) {
      throw new HttpException(400, 'Invalid URL format');
    }

    await crawlAndDownloadPDFs(crawlData);

    return 'PDFs downloaded successfully';
  }
}

export default CrawlPdfDownloadService;