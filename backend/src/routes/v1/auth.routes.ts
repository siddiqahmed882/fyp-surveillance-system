import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.handleRegister);
router.post('/login', AuthController.handleLogin);
router.get('/refresh', AuthController.handleRefreshToken);
router.post('/logout', AuthController.handleLogout);

export default router;
