import express from 'express';
import timingTask from './routers/timingTask'
import hook from './routers/hook';
import callback from './routers/callback';
const router = express.Router();

router.use('/timing', timingTask);
router.use('/hook', hook);
router.use('/callback', callback);
export default router;
