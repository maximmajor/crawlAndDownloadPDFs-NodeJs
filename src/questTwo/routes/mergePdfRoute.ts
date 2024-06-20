import express, { Router } from 'express';
import MergePdfController from '../controller/mergePdfController';
import { upload } from '../utils/multerConfig';

const router: Router = express.Router();
const mergePdfController = new MergePdfController();

router.post('/upload', upload.array('pdfFiles', 10), mergePdfController.mergePdfServiceAndDownloadPdf);

export default router;