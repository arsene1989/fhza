import express from 'express';
import map from './routers/map';
import hook from './routers/hook';
import callback from './routers/callback';
const router = express.Router();

router.use('/map', map);
router.use('/hook', hook);
router.use('/callback', callback);
export default router;
