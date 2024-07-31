import { Router } from 'express';
import { isAuthenticated, authenticateOutlook, outlookCallback, logoutOutlook } from '../controllers/authControllers';

const router = Router();

router.get('/auth/outlook',authenticateOutlook);
router.get('/delegated/callback', outlookCallback);
router.get('/isAuthenticated', isAuthenticated);
router.get('/logout', logoutOutlook);
export default router