import express from 'express';
import map from '../controllers/map';

const router = express.Router();

router.get('/projects/:id/tasks', map.getTasksByProjectId);
router.get('/projects/:id', map.getProjectInfo);
router.get('/projects/:id/tree', map.taskTreeByProjectId);

router.get('/projects/:id/displayTasks', map.getDisplayTasksByProjectId);
router.put('/tasks/:id/status', map.setStatusByTaskId);
router.put('/tasks/:id/content', map.setContentByTaskId);
router.put('/tasks/:id/priority', map.setPriorityByTaskId);
router.put('/tasks/:id/transform', map.transformTask);
router.put('/tasks/:id/progress', map.setProgressByTaskId);
export default router;
