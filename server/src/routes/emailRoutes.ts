import express from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware';
import { initialFetchController } from '../controllers/emailController';

const router = express.Router();

router.get('/initialFetch', ensureAuthenticated, initialFetchController);

export default router;
