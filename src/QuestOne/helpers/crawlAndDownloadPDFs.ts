import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

export interface CrawlAndDownloadParams {
  url: string;
  mustCompany: boolean;
  signUpDetails: {
    username: string;
    password: string;
  };
  address: string;
}

export const crawlAndDownloadPDFs = async (params: CrawlAndDownloadParams) => {
  try {
    const { url, mustCompany, signUpDetails, address } = params;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    if (mustCompany) {
      await page.evaluate(() => {
        const translateWidget: any = document.querySelector('#google_translate_element select');
        if (translateWidget) {
          translateWidget.value = 'en';
          translateWidget.dispatchEvent(new Event('change'));
        }
      });

      await page.type('input[name="Id"]', signUpDetails.username);
      await page.type('input[name="password"]', signUpDetails.password);
      await page.click('button[type="submit"]');

      await page.type('input[name="address"]', address);
      await page.click('button[type="submit"]');

      await page.click('a[href*="issuance-of-building-ledger"]');
    }

    const pdfLinks = await page.$$eval('a[href$=".pdf"]', anchors => anchors.map(anchor => anchor.href));
    const downloadDir = path.resolve(__dirname, '..', 'downloads');

    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }

    const downloadPromises = pdfLinks.map(async (pdfLink) => {
      const pdfName = path.basename(pdfLink);
      const pdfPath = path.resolve(downloadDir, pdfName);
      const file = fs.createWriteStream(pdfPath);

      await new Promise<void>((resolve, reject) => {
        https.get(pdfLink, response => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', err => {
          reject(err);
        });
      });
    });

    await Promise.all(downloadPromises);
    await browser.close();
  } catch (err) {
    console.error(`Error crawling and downloading PDFs: ${err}`);
  }
};