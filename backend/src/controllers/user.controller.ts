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

async function handleGetUser(request: Request, response: Response) {

  if (!request.params.id) {
    throw new HttpNotFoundError('User ID is required');
  }
  const user = await UserService.getUserById(parseInt(request.params.id));

  return response.status(201).json(new ApiSuccessResponse(201, 'User retrieved successfully', user));
}


async function handleGetUsers(request: Request, response: Response) {

  if (request.user && request.user.role !== "admin") {
    throw new HttpNotFoundError('User Role is not authorized');
  }
  const user = await UserService.getUsers();

  return response.status(201).json(new ApiSuccessResponse(201, 'User retrieved successfully', user));
}

async function handleUpdateUser(request: Request, response: Response) {
  const validationResults = updateUserDto.safeParse(request.body);

  if (!validationResults.success) {
    const { conciseErrorMessages, errorObject } = formatZodError(validationResults.error);
    throw new HttpBadRequestError(conciseErrorMessages, errorObject);
  }

  const user = await UserService.updateUser(parseInt(request.params.id as string), validationResults.data);

  if (!user) {
    throw new HttpNotFoundError('User not found');
  }

  return response.status(201).json(new ApiSuccessResponse(201, 'User updated successfully', user));
}

async function handleUser(request: Request, response: Response) {

  return response.status(201).json(new ApiSuccessResponse(201, 'User found successfully', request.user));
}

async function handleGetUserByIpAddress(request: Request, response: Response) {

  const userIpAddress = request.params?.id;

  console.log("userIpAddress: ", userIpAddress)

  if (!userIpAddress) {
    throw new HttpNotFoundError('User IP Address is required');
  }

  const userRecord = await UserService.getUserByIpAddress(userIpAddress);

  return response.status(200).json(new ApiSuccessResponse(200, 'User Record found successfully', { email: userRecord.email, name: userRecord.name }));
}

export default {
  handleUser,
  handleGetUsers,
  handleGetUser,
  handleUpdateUser,
  handleGetUserByIpAddress
};
