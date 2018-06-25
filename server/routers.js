import express from 'express';
import timing from './routers/workTime'
import hook from './routers/hook';
import callback from './routers/callback';
const router = express.Router();

router.use('/timing', timing);
router.use('/hook', hook);
router.use('/callback', callback);
export default router;
