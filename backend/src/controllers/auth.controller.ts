import type { Request, Response } from 'express';
import { createUserDto } from '../validations/users.validator';
import PrismaClient from '../helpers/PrismaClient';
import UserService from '../services/User.service';

import formatZodError from '../helpers/formatZodError';
import HttpBadRequestError from '../errors/HttpBadRequestError';
import HttpConflictError from '../errors/HttpConfictError';
import ApiSuccessResponse from '../helpers/ApiSuccessResponse';
import { loginUserDto } from '../validations/loginUser.validator';
import HttpNotFoundError from '../errors/HttpNotFoundError';
import { compare } from 'bcrypt-ts';
import AuthService from '../services/Auth.service';
import safeEnv from '../config/safeEnv';
import HttpUnauthorizedError from '../errors/HttpUnauthorizedError';

async function handleRegister(request: Request, response: Response) {
  const validationResults = createUserDto.safeParse(request.body);

  if (!validationResults.success) {
    const { conciseErrorMessages, errorObject } = formatZodError(validationResults.error);
    throw new HttpBadRequestError(conciseErrorMessages, errorObject);
  }

  const isEmailTaken = await PrismaClient.instance.user.findUnique({
    where: { email: validationResults.data.email },
  });

  if (isEmailTaken) {
    throw new HttpConflictError('Email is already taken');
  }

  const user = await UserService.createUser(validationResults.data);

  return response.status(201).json(new ApiSuccessResponse(201, 'User created', user));
}

async function handleLogin(request: Request, response: Response) {
  const validationResults = loginUserDto.safeParse(request.body);

  if (!validationResults.success) {
    const { conciseErrorMessages, errorObject } = formatZodError(validationResults.error);
    throw new HttpBadRequestError(conciseErrorMessages, errorObject);
  }

  const user = await PrismaClient.instance.user.findUnique({
    where: { email: validationResults.data.email },
  });

  if (!user) {
    throw new HttpNotFoundError('User not found');
  }

  const isPasswordValid = await compare(validationResults.data.password, user.password);

  if (!isPasswordValid) {
    throw new HttpNotFoundError('Invalid credentials');
  }

  const accessToken = AuthService.generateAccessToken({ id: user.id, email: user.email, emailVerified: user.emailVerified, role: user.role });
  const refreshToken = await AuthService.generateRefreshToken(user.id, user.email);

  response.cookie(AuthService.refreshTokenCookieName, refreshToken, {
    httpOnly: true, // only allow http requests to access this cookie
    secure: safeEnv.NODE_ENV === 'production', // only allow https requests to access this cookie
    sameSite: safeEnv.NODE_ENV === 'production' ? 'none' : 'lax', // only allow same site requests to access this cookie
    domain: safeEnv.DOMAIN, // only allow requests from this domain to access this cookie
    maxAge: AuthService.refreshTokenExpiresInMilliseconds, // expire this cookie after 30 days
    path: '/',
  });

  return response.status(200).json(new ApiSuccessResponse(200, 'Login successful', { accessToken, userId: user.id }));
}

async function handleRefreshToken(request: Request, response: Response) {
  const cookies = request.cookies;

  if (!cookies || !cookies[AuthService.refreshTokenCookieName]) {
    throw new HttpUnauthorizedError('No refresh token received');
  }

  const refreshToken = cookies[AuthService.refreshTokenCookieName];

  try {
    const user = await AuthService.verifyRefreshToken(refreshToken);

    const accessToken = AuthService.generateAccessToken({
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    });
    const newRefreshToken = await AuthService.generateRefreshToken(user.id, user.email);

    response.cookie(AuthService.refreshTokenCookieName, newRefreshToken, {
      httpOnly: true,
      sameSite: safeEnv.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: safeEnv.NODE_ENV === 'production',
      domain: safeEnv.DOMAIN,
      maxAge: AuthService.refreshTokenExpiresInMilliseconds,
      path: '/'
    });

    return response.status(200).json(new ApiSuccessResponse(200, 'Token refreshed', { accessToken }));
  } catch (error) {
    response.clearCookie(AuthService.refreshTokenCookieName, {
      httpOnly: true,
      sameSite: safeEnv.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: safeEnv.NODE_ENV === 'production',
    });
    if (error instanceof HttpUnauthorizedError) {
      throw error;
    } else {
      throw new HttpUnauthorizedError('Invalid refresh token');
    }
  }
}

async function handleLogout(request: Request, response: Response) {
  const cookies = request.cookies;

  if (!cookies || !cookies[AuthService.refreshTokenCookieName]) {
    return response.sendStatus(204);
  }

  const refreshToken = cookies[AuthService.refreshTokenCookieName];

  response.clearCookie(AuthService.refreshTokenCookieName, {
    httpOnly: true,
    sameSite: safeEnv.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: safeEnv.NODE_ENV === 'production',
  });

  await PrismaClient.instance.refreshToken.delete({ where: { token: refreshToken } });

  return response.sendStatus(204);
}

export default {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout
};
