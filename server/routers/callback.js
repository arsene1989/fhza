import express from 'express';
import callback from '../controllers/callback';

const router = express.Router();

// hook回调
router.post('/project', callback.callbackProjectHook);
router.post('/organization', callback.callbackOrganizationHook);

export default router;
