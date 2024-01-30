import type { Request, Response, NextFunction } from 'express';
import { whitelist } from '../config/cors.config';

const credentials = (request: Request, response: Response, next: NextFunction) => {
  const origin = request.headers.origin;
  if (origin == null || whitelist.includes(origin)) {
    response.header('Access-Control-Allow-Credentials', "true");
  }
  next();
};

export default credentials;
