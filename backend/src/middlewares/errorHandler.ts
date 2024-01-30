import type { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';
import ApiErrorResponse from '../helpers/ApiErrorResponse';

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    return response.status(error.status).json(new ApiErrorResponse(error));
  }

  const status = response.statusCode === 200 ? 500 : response.statusCode;

  if (process.env.NODE_ENV === 'development') {
    const errorStack = error.stack || '';
    const prettifiedErrorStack = errorStack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>');
    console.log('############## Express Error Handler ##############');
    console.log('Error Message: ', error.message);
    console.log(prettifiedErrorStack);
    console.log('############## Express Error Handler ##############');
  }

  return response.status(status).json(new ApiErrorResponse(new HttpError("HttpError", status, error.message)));
};

export default errorHandler;