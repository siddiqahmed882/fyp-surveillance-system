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
import RoomService from '../services/Room.service';

async function handleCreateRoom(request: Request, response: Response) {

  const accessToken = request.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    throw new HttpUnauthorizedError('Unauthorized');
  }

  const userData = await AuthService.verifyAccessToken(accessToken);

  const room = await RoomService.createRoom(userData.id, request.body);

  return response.status(200).json(new ApiSuccessResponse(200, 'Rooms created successfully', room));
}

async function handleGetRoom(request: Request, response: Response) {

  const accessToken = request.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    throw new HttpUnauthorizedError('Unauthorized');
  }

  const userData = await AuthService.verifyAccessToken(accessToken);

  const room = await RoomService.getRoom(userData.id);

  return response.status(201).json({ status: 201, message: 'Rooms retrieved successfully', data: room });
}

async function handleGetRooms(request: Request, response: Response) {


  if (request.user && request.user?.role !== 'admin') {
    throw new HttpUnauthorizedError('Unauthorized');
  }


  const room = await RoomService.getRooms();

  return response.status(201).json({ status: 201, message: 'Rooms retrieved successfully', data: room });
}

async function handleGetSpecificRoom(request: Request, response: Response) {
  const roomId = request.params.id;

  if (!roomId) {
    throw new HttpUnauthorizedError('Unauthorized');
  }


  const room = await RoomService.getRoomById(parseInt(roomId));

  return response.status(201).json(new ApiSuccessResponse(201, 'Room retrieved successfully', room));
}

async function handleCreateAccessLink(request: Request, response: Response) {

  const accessToken = request.headers.authorization?.split(' ')[1];

  if (!accessToken) {

    throw new HttpUnauthorizedError('Unauthorized');
  }

  const userData = await AuthService.verifyAccessToken(accessToken);

  const room = await RoomService.createAccessLink(request.body);

  return response.status(200).json(new ApiSuccessResponse(200, 'Access link created successfully', room));
}

async function handleGetAccessLinks(request: Request, response: Response) {

  if (request.user && request.user?.role !== 'admin') {
    throw new HttpUnauthorizedError('Unauthorized');
  }


  const accessLinks = await RoomService.getAccessLinks();

  return response.status(201).json({ status: 201, message: 'Access Links retrieved successfully', data: accessLinks });
}

async function handleDeleteUserRoom(request: Request, response: Response) {
  const roomId = request.params.id;

  if (!roomId) {
    throw new HttpUnauthorizedError('Unauthorized');
  }


  const room = await RoomService.deleteRoomById(parseInt(roomId));

  return response.status(201).json(new ApiSuccessResponse(201, 'Room deleted successfully', room));
}


async function handleDeleteAccessLink(request: Request, response: Response) {
  const roomId = request.params.id;

  if (!roomId) {
    throw new HttpUnauthorizedError('Unauthorized');
  }


  const room = await RoomService.deleteAccessLinkById(parseInt(roomId));

  return response.status(201).json(new ApiSuccessResponse(201, 'Access Link deleted successfully', room));
}

export default {
  handleCreateRoom,
  handleGetRooms,
  handleGetRoom,
  handleGetSpecificRoom,
  handleGetAccessLinks,
  handleCreateAccessLink,
  handleDeleteAccessLink,
  handleDeleteUserRoom
};
