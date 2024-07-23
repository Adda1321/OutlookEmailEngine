import express from 'express';
import { notificationHandler } from '../controllers/notificationController';

const router = express.Router();

router.post('/api/notifications', notificationHandler);

export default router;
