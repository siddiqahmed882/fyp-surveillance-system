import { Router } from 'express';
import verifyJwt from '../../middlewares/verifyJwt';
import UserController from '../../controllers/user.controller';
import RoomController from '../../controllers/room.controller';


const router = Router();

router.get('/users', verifyJwt, UserController.handleGetUsers);
router.get('/user-rooms', verifyJwt, RoomController.handleGetRooms);
router.get('/access-links', verifyJwt, RoomController.handleGetAccessLinks);
router.post('/access-link', verifyJwt, RoomController.handleCreateAccessLink);
router.delete('/user-room/:id', verifyJwt, RoomController.handleDeleteUserRoom);
router.delete('/access-link/:id', verifyJwt, RoomController.handleDeleteAccessLink);

export default router;
