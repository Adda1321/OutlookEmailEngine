import express from 'express';
import { createAccountHandler } from '../controllers/accountHandler';
import { ensureAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

// router.get('/createaccount', ensureAuthenticated, createAccountHandler);

export default router;
