import { HttpException } from '../../middlewares/HttpException';
import { PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs-extra';

class MergePdfService {
  public async mergePdf(inputFiles: string[], outputFile: string): Promise<void> {
    if (!inputFiles || inputFiles.length === 0) {
      throw new HttpException(400, 'No input files provided');
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of inputFiles) {
      if (!await fs.pathExists(file)) {
        throw new HttpException(404, `Input file not found: ${file}`);
      }

      const pdfBytes = await fs.readFile(file);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

      copiedPages.forEach((page: PDFPage) => {
        mergedPdf.addPage(page);
      });
    }

    const mergedPdfBytes = await mergedPdf.save();
    await fs.writeFile(outputFile, mergedPdfBytes);
  }
}

export default MergePdfService;