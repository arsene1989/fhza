import express from 'express';
import workTime from '../controllers/workTime';

const router = express.Router();

router.get('/projects/:id', workTime.workTimesByProjectId);
router.get('/organizations/:id', workTime.workTimesByOrganizationId);
router.get('/executors/:id', workTime.workTimesByExecutorId);

router.put('/workTimings/:id/start', workTime.startTimingById);
router.put('/workTimings/:id/pause', workTime.pauseTimingById);
router.put('/workTimings/:id/continue', workTime.continueTimingById);
router.put('/workTimings/:id/complete', workTime.completeTimingById);

export default router;
