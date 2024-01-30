import safeEnv from '../config/safeEnv';
import HttpForbiddenError from '../errors/HttpForbiddenError';
import HttpUnauthorizedError from '../errors/HttpUnauthorizedError';
import PrismaClient from '../helpers/PrismaClient';
import { accessTokenValidator, type AccessTokenDto } from '../validations/accessToken.validator';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

class AuthService {
  static accessTokenExpiresIn = '30d';
  static refreshTokenExpiresIn = '30d';
  static refreshTokenExpiresInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  static refreshTokenCookieName = 'talenet-hub-refresh-token';

  static generateAccessToken(accessTokenDto: AccessTokenDto) {
    return jwt.sign(accessTokenDto, safeEnv.ACCESS_TOKEN_SECRET, { expiresIn: AuthService.accessTokenExpiresIn });
  }

  static async generateRefreshToken(id: number, email: string) {
    const refreshToken = jwt.sign({ email }, safeEnv.REFRESH_TOKEN_SECRET, { expiresIn: AuthService.refreshTokenExpiresIn });

    await PrismaClient.instance.refreshToken.deleteMany({ where: { userId: id } }); // delete all refresh tokens from database for this user

    // save refresh token to database
    await PrismaClient.instance.refreshToken.create({
      data: { token: refreshToken, userId: id, expiresAt: new Date(Date.now() + AuthService.refreshTokenExpiresInMilliseconds) },
    });

    return refreshToken;
  }

  static verifyAccessToken(accessToken: string): AccessTokenDto {
    try {
      const decoded = jwt.verify(accessToken, safeEnv.ACCESS_TOKEN_SECRET);
      if (typeof decoded === 'string') throw new HttpForbiddenError("Invalid access token");

      const decodedAccessToken = accessTokenValidator.safeParse(decoded);

      if (!decodedAccessToken.success) {
        throw new HttpForbiddenError("Invalid access token");
      }

      return decodedAccessToken.data;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
        throw new HttpUnauthorizedError('Access token expired');
      } else {
        throw error;
      }
    }
  }

  static async verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, safeEnv.REFRESH_TOKEN_SECRET);
      if (typeof decoded === 'string') throw new HttpUnauthorizedError("Invalid refresh token");

      if (typeof decoded !== 'object' || decoded === null || !('email' in decoded) || typeof decoded.email !== 'string') {
        throw new HttpUnauthorizedError("Invalid refresh token");
      }

      const user = await PrismaClient.instance.user.findUnique({ where: { email: decoded.email } });
      if (!user) {
        await PrismaClient.instance.refreshToken.delete({ where: { token: refreshToken } }); // delete refresh token from database if user does not exist
        throw new HttpUnauthorizedError('Invalid refresh token');
      }

      const dbRefreshToken = await PrismaClient.instance.refreshToken.findFirst({ where: { token: refreshToken, userId: user.id } });
      if (!dbRefreshToken) {
        // user has refresh token in cookies, it is valid as well but not in database. 
        // This means this token has already been used to generate a new access token.
        // It could be a sign of a stolen token, so we should invalidate it.
        await PrismaClient.instance.refreshToken.delete({ where: { token: refreshToken } });
        throw new HttpUnauthorizedError('Invalid refresh token');
      }

      if (dbRefreshToken.expiresAt < new Date()) {
        await PrismaClient.instance.refreshToken.delete({ where: { token: refreshToken } }); // delete refresh token from database if it is expired
        throw new HttpUnauthorizedError('Refresh token expired');
      }

      // delete refresh token from database after it has been used to generate a new access token
      await PrismaClient.instance.refreshToken.delete({ where: { id: dbRefreshToken.id } });

      return user;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
        throw new HttpUnauthorizedError('Refresh token expired');
      } else {
        throw error;
      }
    }
  }
}

export default AuthService;