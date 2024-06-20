import express, { Request, Response } from 'express';
import IrosService from "../services/IrosServices";
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { HttpException } from '../../middlewares/HttpException';

class IrosController {
  private IrosService: IrosService;

  constructor() {
    this.IrosService = new IrosService();
  }

  public IrosCrawler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.body;

      if (!url) {
        throw new HttpException(400, 'No URL provided');
      }

      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new HttpException(response.status, 'Failed to fetch URL');
      }

      const dom = new JSDOM(response.data);
      const document = dom.window.document;

      const IrosCrawler = await this.IrosService.IrosCrawler(document);

      if (!IrosCrawler) {
        throw new HttpException( 500, 'Failed to crawl IROS');
      }

      res.status(200).json({
        status: 'success',
        message: 'Crawling IROS from linux successfully.',
        data: IrosCrawler
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

export default IrosController;