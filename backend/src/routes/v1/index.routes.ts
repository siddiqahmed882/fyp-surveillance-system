import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roomRoutes from './room.routes';
import adminRoutes from './admin.routes';
import notificationRoutes from './notification.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/room', roomRoutes);
router.use('/admin', adminRoutes);
router.use('/notification', notificationRoutes);

export default router;