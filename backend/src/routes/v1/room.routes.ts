import { Router } from 'express';
import RoomController from '../../controllers/room.controller';

const router = Router();

router.post('/', RoomController.handleCreateRoom);
router.post('/access-link', RoomController.handleCreateAccessLink);
router.get('/', RoomController.handleGetRoom);
router.get('/:id', RoomController.handleGetSpecificRoom);

export default router;
