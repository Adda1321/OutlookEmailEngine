import { Router } from 'express';
import { createUserHandler } from '../controllers/userController';

const router = Router();

router.post('/createuser', createUserHandler);

export default router;
