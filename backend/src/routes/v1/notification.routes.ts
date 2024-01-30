import { Router } from 'express';
import NotificationController from '../../controllers/notification.controller';
import verifyJwt from '../../middlewares/verifyJwt';

const router = Router();

router.get('/', verifyJwt, NotificationController.handleGetNotifications);
router.post('/', NotificationController.handleCreateNotification);
router.post('/fcm', verifyJwt, NotificationController.handleCreateFcmToken);

export default router;
