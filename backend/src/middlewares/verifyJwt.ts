import type { Request, Response, NextFunction } from 'express';
import AuthService from '../services/Auth.service';
import HttpForbiddenError from '../errors/HttpForbiddenError';
import HttpUnauthorizedError from '../errors/HttpUnauthorizedError';
import type { AccessTokenDto } from '../validations/accessToken.validator';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AccessTokenDto;
  }
}

export default function verifyJwt(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader?.startsWith('Bearer ')) {
    // either authorization header is not present or it does not start with 'Bearer '. Either way, throw an unauthorized error which forces the client to login again
    throw new HttpUnauthorizedError('Authorization header required');
  }

  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
    // authorization header is present but access token is not. Throw an unauthorized error which forces the client to login again
    throw new HttpUnauthorizedError('Access token required');
  }

  const decodedAccessToken = AuthService.verifyAccessToken(accessToken);

  request.user = decodedAccessToken;

  next();
}
