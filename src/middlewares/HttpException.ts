export class HttpException extends Error {
  message: string;
  statusCode: number;

  constructor(statusCode: number, message: string) {
    if (!statusCode || !message) {
      throw new Error('Status code and message are required');
    }

    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}