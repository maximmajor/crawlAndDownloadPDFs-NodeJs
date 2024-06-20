import multer from 'multer'; // Multer setup for file uploads

export const upload = multer({ dest: 'uploads/' });

