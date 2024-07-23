import express from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware';
import { subscribeHandler } from '../controllers/subscriptionController';

const router = express.Router();

router.get('/subscribe', ensureAuthenticated, subscribeHandler);

export default router;
