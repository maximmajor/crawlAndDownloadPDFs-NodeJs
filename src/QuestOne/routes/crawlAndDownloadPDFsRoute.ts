import express, { Router } from 'express';
import crawlPdfDownloadController from '../controller/crawlAndDownloadPDFsController';


const router: Router = express.Router();
const CrawlPdfDownloadController = new crawlPdfDownloadController();

router.post('',  CrawlPdfDownloadController.crawlWebAndDownloadPdf);

export default router;
