import request from './async';
import jsdom from 'jsdom';
import config from 'config';
import { TaskNode } from '../models/taskNode';

export default {
  async access_token(email, pwd) {
    const { JSDOM } = jsdom;
    let dom = await JSDOM.fromURL(`${config.account_api}/login`);
    let document = dom.window.document.getElementById('secrets');
    let clientId = document.getAttribute('data-clientid');
    let token = document.getAttribute('data-clienttoken');
    let result = await request.
      axios_post(`${config.account_api}/api/login/email`, {
        email: email,
        password: pwd,
        response_type: 'token',
        client_id: clientId,
        token: token
      });
    return result.data ? result.data.access_token : null;
  },
  /**
   * 获取项目下所有任务
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getAllTasksByProjectId(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.
      axios_get(`${config.account_api}/api/projects/${id}/tasks`, token);
    return result.data ? result.data : null;
  },
  /**
   * 获取项目信息
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getPorjectInfoById(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.
      axios_get(`${config.account_api}/api/projects/${id}`, token);
    return result.data ? result.data : null;
  },
  /**
   * 获取根节点
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getRootNode(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.
      axios_get(`${config.account_api}/api/projects/${id}`, token);
    return result.data ? new TaskNode(result.data._id,
      result.data.name, 0, null) : null;
  },
  /**
   * 获取项目hooks
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getHooksByProjectId(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.
      axios_get(`${config.account_api}/api/projects/${id}/hooks`, token);
    return result.data ? result.data : null;
  },
  /**
   * 新建项目hook
   * @param {*} id id
   * @param {*} callbackURL callbackURL
   * @param {*} events events
   * @param {*} token token
   * @returns {Promise} promise
   */
  async createProjectHook(id, callbackURL, events, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }

    const data = {
      callbackURL: callbackURL,
      events: events
    }

    const result = await request.
      axios_postToken(`${config.account_api}/api/projects/${id}/hooks`,
        data, token);
    return result.data ? result.data : null;
  },
  /**
   * 删除项目hook
   * @param {*} id id
   * @param {*} projectId projectId
   * @param {*} token token
   * @returns {Promise} promise
   */
  async deleteProjectHook(id, projectId, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }

    const result = await request.axios_delete(`
      ${config.account_api}/api/projects/${projectId}/hooks/${id}`, token);
    return result.data ? result.data : null;
  },
  /**
   * 更新项目hook
   * @param {*} id id
   * @param {*} projectId projectId
   * @param {*} callbackURL callbackURL
   * @param {*} events events
   * @param {*} token token
   * @returns {Promise} promise
   */
  async updateProjectHook(id, projectId, callbackURL, events, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = {
      callbackURL: callbackURL,
      events: events
    }
    const result = await request.axios_put(`
      ${config.account_api}/api/projects/${projectId}/hooks/${id}`
      , data, token);
    return result.data ? result.data : null;
  },
  /**
   * 获取组织hook
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getHooksByOrganizationId(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.
      axios_get(`${config.account_api}/api/organizations/${id}/hooks`, token);
    return result.data ? result.data : null;
  },
  /**
   * 更新组织hook
   * @param {*} id id
   * @param {*} callbackURL callbackURL
   * @param {*} events events
   * @param {*} token token
   * @returns {Promise} promise
   */
  async createOrganizationHook(id, callbackURL, events, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }

    const data = {
      callbackURL: callbackURL,
      events: events
    }

    const result = await request.
      axios_postToken(`${config.account_api}/api/organizations/${id}/hooks`,
        data, token);
    return result.data ? result.data : null;
  },
  /**
   * 删除组织hook
   * @param {*} id id
   * @param {*} organizationId organizationId
   * @param {*} token token
   * @returns {Promise} promise
   */
  async deleteOrganizationHook(id, organizationId, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }

    const result = await request.axios_delete(`
      ${config.account_api}/api/organizations/
      ${organizationId}/hooks/${id}`, token);
    return result.data ? result.data : null;
  },
  /**
   * 更新组织hook
   * @param {*} id id
   * @param {*} organizationId organizationId
   * @param {*} callbackURL callbackURL
   * @param {*} events events
   * @param {*} token token
   * @returns {Promise} promise
   */
  async updateOrganizationHook(id, organizationId, callbackURL, events, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = {
      callbackURL: callbackURL,
      events: events
    }
    const result = await request.axios_put(`
      ${config.account_api}/api/organizations/${organizationId}/hooks/${id}`
      , data, token);
    return result.data ? result.data : null;
  },
  /**
   * 获取任务
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getTaskById(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const result = await request.axios_get(`
      ${config.account_api}/api/tasks/${id}`, token);
    return result.data ? result.data : null;
  },

  /**
   * 组织下所有项目
   * @param {*} id id
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getAllProjectsByOrganizationId(id, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const url = `${config.account_api}/api/organizations/${id}/projects/all`;
    const result = await request.axios_get(url, token);
    return result.data ? result.data : null;
  },

  /**
   * 设置任务状态
   * @param {*} id id
   * @param {*} isDone isDone
   * @param {*} token token
   * @returns {Promise} promise
   */
  async setStatusByTaskId(id, isDone, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { isDone: isDone };
    const url = `${config.account_api}/api/tasks/${id}/isDone`;
    let result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },

  /**
   * 设置任务优先级
   * @param {*} id id
   * @param {*} doLink doLink
   * @param {*} doLinked doLinked
   * @param {*} token token
   * @returns {Promise} promise
   */
  async transformTask(id, doLink, doLinked, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { doLink: doLink, doLinked: doLinked };
    const url = `${config.account_api}/api/tasks/${id}/transform`;
    const result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },

  /**
   * 设置任务优先级
   * @param {*} id id
   * @param {*} priority priority
   * @param {*} token token
   * @returns {Promise} promise
   */
  async setPriorityByTaskId(id, priority, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { priority: priority };
    const url = `${config.account_api}/api/tasks/${id}`;
    const result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },

  /**
   * 修改任务名称
   * @param {*} id id
   * @param {*} content content
   * @param {*} token token
   * @returns {Promise} promise
   */
  async setContentByTaskId(id, content, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { content: content };
    const url = `${config.account_api}/api/tasks/${id}`;
    const result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },

  /**
   * 修改项目名称
   * @param {*} id id
   * @param {*} name name
   * @param {*} token token
   * @returns {Promise} promise
   */
  async setNameByProjectId(id, name, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { name: name };
    const url = `${config.account_api}/api/projects/${id}`;
    const result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },

  /**
   * 修改任务进度（0-100）
   * @param {*} id id
   * @param {*} progress progress
   * @param {*} token token
   * @returns {Promise} promise
   */
  async setProgressByProjectId(id, progress, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const data = { progress: progress };
    const url = `${config.account_api}/api/tasks/${id}/progress`;
    const result = await request.axios_put(url, data, token);
    return result.data ? result.data : null;
  },
  /**
   * 根据分组id获取任务
   * @param {*} stageId stageId
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getTasksByStageId(stageId, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const url = `${config.account_api}/api/tasks?_stageId=${stageId}`;
    const result = await request.axios_get(url, token);
    return result.data ? result.data : null;
  },
  /**
   * 根据父任务id获取子任务
   * @param {*} ancestorId ancestorId
   * @param {*} token token
   * @returns {Promise} promise
   */
  async getTasksByAncestorId(ancestorId, token) {
    if (!token) {
      token = await this.access_token(config.account.email,
        config.account.pwd);
    }
    const url = `${config.account_api}/api/tasks?_ancestorId=${ancestorId}`;
    const result = await request.axios_get(url, token);
    return result.data ? result.data : null;
  }
};
