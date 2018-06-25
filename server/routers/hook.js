import express from 'express';
import hook from '../controllers/hook';
const router = express.Router();

router.get('/projects/:id', hook.getHooksByProjectId);
router.post('/projects/:id', hook.createProjectHook);
router.delete('/projects/:projectId/hooks/:id', hook.deleteProjectHook);
router.put('/projects/:projectId/hooks/:id', hook.updateProjectHook);

router.get('/organizations/:id', hook.getHooksByOrganizationId);
router.post('/organizations/:id', hook.createOrganizationHook);
router.delete('/organizations/:organizationId/hooks/:id',
  hook.deleteOrganizationHook);
router.put('/organizations/:organizationsId/hooks/:id',
  hook.updateOrganizationHook);

export default router;
