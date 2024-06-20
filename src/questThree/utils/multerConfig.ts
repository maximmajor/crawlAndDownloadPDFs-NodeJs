import multer from 'multer'; // Multer setup for file uploads
import path from 'path';

export const upload = multer({ dest: path.join(__dirname, '../uploads/') });

