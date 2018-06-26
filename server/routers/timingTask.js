import express from 'express';
import timingTask from '../controllers/timingTask';

const router = express.Router();

router.get('/projects/:id', timingTask.timingTasksByProjectId);
router.get('/organizations/:id', timingTask.timingTasksByOrganizationId);
router.get('/executors/:id', timingTask.timingTasksByExecutorId);

router.put('/tasks/:id/start', timingTask.startTimingById);
router.put('/tasks/:id/pause', timingTask.pauseTimingById);
router.put('/tasks/:id/continue', timingTask.continueTimingById);
router.put('/tasks/:id/complete', timingTask.completeTimingById);

export default router;
