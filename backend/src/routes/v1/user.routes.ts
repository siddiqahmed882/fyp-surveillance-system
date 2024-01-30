import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import verifyJwt from '../../middlewares/verifyJwt';

const router = Router();

router.get('/', verifyJwt, UserController.handleUser);
router.get('/:id', UserController.handleGetUser);
router.put('/:id', UserController.handleUpdateUser);
router.get('/ipAddress/:id', UserController.handleGetUserByIpAddress);


export default router;
