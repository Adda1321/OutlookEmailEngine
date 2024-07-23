import { Router } from 'express';
import { isAuthenticated, authenticateOutlook, outlookCallback } from '../controllers/authControllers';

const router = Router();

router.get('/auth/outlook', authenticateOutlook);
router.get('/delegated/callback', outlookCallback);
router.get('/isAuthenticated', isAuthenticated);

export default router