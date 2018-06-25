import teambition from '../common/teambition';
import config from 'config';
export default {

  /*
   * 根据项目Id获取所有Hook
   */
  async getHooksByProjectId(req, res, next) {
    const id = req.params.id;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.getHooksByProjectId(id, token);

    res.json({ data: data });
  },

  /*
   * 创建项目Hook
   */
  async createProjectHook(req, res, next) {
    const id = req.params.id;
    const { callbackURL, events } = req.body;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.
      createProjectHook(id, callbackURL, events, token);
    res.json({ data: data });
  },

  /*
   * 删除项目Hook
   */
  async deleteProjectHook(req, res, next) {
    const id = req.params.id;
    const projectId = req.params.projectId;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.deleteProjectHook(id, projectId, token);
    res.json({ data: data });
  },

  /*
   * 更新项目Hook
   */
  async updateProjectHook(req, res, next) {
    const id = req.params.id;
    const projectId = req.params.projectId;
    const { callbackURL, events } = req.body;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.updateProjectHook(id,
      projectId, callbackURL, events, token);
    res.json({ data: data });
  },

  /*
   * 根据组织Id获取所有Hook
   */
  async getHooksByOrganizationId(req, res, next) {
    const id = req.params.id;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.getHooksByOrganizationId(id, token);

    res.json({ data: data });
  },

  /*
   * 创建组织Hook
   */
  async createOrganizationHook(req, res, next) {
    const id = req.params.id;
    const { callbackURL, events } = req.body;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.
      createOrganizationHook(id, callbackURL, events, token);
    res.json({ data: data });
  },

  /*
   * 删除组织Hook
   */
  async deleteOrganizationHook(req, res, next) {
    const id = req.params.id;
    const organizationId = req.params.organizationId;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.deleteOrganizationHook(id,
      organizationId, token);
    res.json({ data: data });
  },

  /*
   * 更新组织Hook
   */
  async updateOrganizationHook(req, res, next) {
    const id = req.params.id;
    const organizationId = req.params.organizationId;
    const { callbackURL, events } = req.body;
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.updateOrganizationHook(id,
      organizationId, callbackURL, events, token);
    res.json({ data: data });
  },
}
