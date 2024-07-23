import express from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware';
import { initialFetchController, queryEmailsController } from '../controllers/emailController';

const router = express.Router();

router.get('/initialFetch', ensureAuthenticated, initialFetchController);
router.get('/emails', ensureAuthenticated, queryEmailsController);

export default router;
