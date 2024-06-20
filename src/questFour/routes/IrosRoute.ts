import express, { Router } from 'express';
import IrosController from '../controller/IrosController';


const router: Router = express.Router();
const irosController = new IrosController();

router.post('', irosController.IrosCrawler);

export default router;