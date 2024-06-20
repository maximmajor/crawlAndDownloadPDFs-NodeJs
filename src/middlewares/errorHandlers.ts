import { Request, Response, NextFunction } from 'express';
import { HttpException } from './HttpException';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpException(404, 'Resource not found');
  next(error);
};

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  let status = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  if (error instanceof HttpException) {
    status = error.statusCode;
    message = error.message;
  }

  res.status(status).json({ status, message });
};