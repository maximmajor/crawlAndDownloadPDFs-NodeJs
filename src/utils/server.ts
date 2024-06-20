import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';
import crawlPdfDownloadRoutes from '../QuestOne/routes/crawlAndDownloadPDFsRoute'
import mergePdfRoute from '../questTwo/routes/mergePdfRoute'
import translateRoute from '../questThree/routes/convertPdfRoute'
import irosRoute from '../questFour/routes/IrosRoute'
import helmet from 'helmet';

function createServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  // Use helmet for basic security headers
  app.use(helmet());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true
  }));
  app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });


  // use middlewares
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());

  //Home page
  app.get('/', (req, res) => {
    res.send(`QUEST  
         `);
  });


  // use routes
  app.use('/rpa', crawlPdfDownloadRoutes);
  app.use('/merge', mergePdfRoute);
  app.use('/translate', translateRoute);
  app.use('/iros', irosRoute)




  // handle 404 errors
  app.use(notFoundHandler);

  // handle errors
  app.use(errorHandler);

  // Add the rate limit error handler middleware


  return app;
}

export default createServer;