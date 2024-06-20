import express, { Router } from 'express';
import translatePdfController from '../controller/convertPdfController';
import { upload } from '../utils/multerConfig';

const router: Router = express.Router();
const TranslatePdfController = new translatePdfController();

router.post('/upload', upload.single('pdfFile'), TranslatePdfController.translatePdf);

export default router;