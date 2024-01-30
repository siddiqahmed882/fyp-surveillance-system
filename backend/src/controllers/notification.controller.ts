import type { Request, Response } from 'express';
import { createUserDto, updateUserDto } from '../validations/users.validator';
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

async function handleGetNotifications(request: Request, response: Response) {

  const userId = request.user?.id;

  const notifications = await PrismaClient.instance.notification.findMany({
    where: {
      user_id: userId
    }
  })
  return response.status(201).json(new ApiSuccessResponse(201, 'Notifications retrieved successfully', notifications));
}


async function handleCreateNotification(request: Request, response: Response) {

  if (request.user && request.user.role !== "admin") {
    throw new HttpNotFoundError('User Role is not authorized');
  }
  const user = await UserService.getUsers();

  return response.status(201).json(new ApiSuccessResponse(201, 'User retrieved successfully', user));
}

async function handleCreateFcmToken(request: Request, response: Response) {


  const userId = request.user?.id;

  if (!userId || !request.body.token) {
    throw new HttpUnauthorizedError('Unauthorized');
  }

  const fcmToken = await PrismaClient.instance.fcmToken.create(
    {
      data: {
        user_id: userId as number,
        fcm_token: request.body.token as string
      }
    }
  )

  return response.status(201).json(new ApiSuccessResponse(201, 'Fcm token created successfully', fcmToken));
}

export default {
  handleGetNotifications,
  handleCreateNotification,
  handleCreateFcmToken
};
