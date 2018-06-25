
import teambition from '../common/teambition';
import config from 'config';
import { TaskNode } from '../models/taskNode';
import taskNodeUtils from '../utils/taskNodeUtils';
import Task from '../services/task';
import taskUtils from '../utils/taskUtils';
import projectUtils from '../utils/projectUtils';

export default {
  /*
   * 根据项目Id获取所有任务
   */
  async getTasksByProjectId(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.getAllTasksByProjectId(id, token);
    res.json({ status:200, data: data, count: data.length })
  },

  /*
   * 根据项目Id获取所有任务
   */
  async getDisplayTasksByProjectId(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { projectId: id, isHidden: false, isArchived: false };
    const tasks = await Task.findTasksByCondition(condition);
    res.json({ status:200, data: tasks, count: tasks.length })
  },

  /*
   * 根据项目Id项目信息
   */
  async getProjectInfo(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const data = await teambition.getPorjectInfoById(id, token);
    console.log('data', data);
    res.json({ status:200, data: data })
  },

  /*
   * 根据项目Id获取任务树形结构
   */
  async getTaskTreeByProjectId(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const root = await teambition.getRootNode(id, token);
    console.log('root', root);
    if(!root){
      return res.json({ status: 400, msg: '项目不存在' })
    }
    const tasks = await teambition.getAllTasksByProjectId(id, token);
    const nodes = new Array();
    for(let task of tasks) {
      let node = new TaskNode(task._id, task.content,
        task.ancestorIds.length + 1, task.ancestorIds)
      nodes.push(node);
    }
    const tree = taskNodeUtils.getTaskTree(root, nodes);
    res.json({ status:200, data: tree });
  },

  /*
   * 根据项目Id获取任务树形结构
   */
  async taskTreeByProjectId(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const tree = await projectUtils.getTaskTreeByProjectId(id);
    console.log('data', tree);
    res.json({ status:200, data: tree });
  },

  /*
   * 设置任务状态（完成和未完成）
   */
  async setStatusByTaskId(req, res, next) {
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const isDone = req.body.isDone;
    if(isDone === undefined){
      return res.json({ status: 400, msg: 'isDone不存在' });
    }
    console.log('isDone', isDone);
    const task = await Task.findOneTaskByCondition({ taskId: id });
    console.log('task', task);
    if(!task.level) {
      return res.json({ status: 400, msg: '根节点不能设置状态' });
    }
    if(isDone === task.isDone) {
      return res.json({ status: 400, msg: '无效的完成状态(和当前状态一致)' });
    }
    if(isDone === true) {
      const subtasks = await Task.findTasksByCondition({ parent: id });
      console.log('subtasks', subtasks);
      for(let subtask of subtasks) {
        if(!subtask.isDone){
          return res.json({ status: 400, msg: '子任务没有完成' })
        }
      }
    }
    const data = await teambition.setStatusByTaskId(id, isDone, token);
    console.log('data', data);
    res.json({ status: 200, data: data });
  },

  /*
   * 设置任务优先级
   */
  async setPriorityByTaskId(req, res, next) {
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const priority = req.body.priority;
    if(!priority){
      return res.json({ status: 400, msg: 'priority不能为空' });
    }
    if(priority > 2 || priority < 0 || priority % 1 !== 0) {
      return res.json({ status: 400, msg: '优先级输入有误' });
    }
    const task = await Task.findOneTaskByCondition({ taskId: id });
    console.log('task', task);
    if(!task.level) {
      return res.json({ status: 400, msg: '根节点不能设置优先级' });
    }

    if(priority == task.priority) {
      return res.json({ status: 400, msg: '和当前优先级状态一致' });
    }
    const data = await teambition.setPriorityByTaskId(id, priority, token);
    console.log('data', data);
    res.json({ status: 200, data: data });
  },

  /*
   * 设置任务名称
   */
  async setContentByTaskId(req, res, next) {
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const content = req.body.content;
    if(!content){
      return res.json({ status: 400, msg: '名称不能为空' });
    }
    const task = await Task.findOneTaskByCondition({ taskId: id });
    if(!task){
      return res.json({ status: 400, msg: '任务不存在' });
    }
    console.log('task', task);
    // 根节点
    if(!task.level){
      let data = await teambition.
        setNameByProjectId(task.projectId, content, token);
      res.json({ status: 200, data: data.name });
    } else {
      let data = await teambition.setContentByTaskId(id, content, token);
      res.json({ status: 200, data: data.content });
    }
  },

  /*
   * 设置任务进度
   */
  async setProgressByTaskId(req, res, next) {
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const progress = req.body.progress;
    if(progress < 0 || progress > 100){
      return res.json({ status: 400, msg: '进度范围在0到100之间' });
    }
    const task = await Task.findOneTaskByCondition({ taskId: id });
    if(!task){
      return res.json({ status: 400, msg: '任务不存在' });
    }
    console.log('task', task);
    let data = await teambition.
      setProgressByProjectId(task.taskId, progress, token);
    res.json({ status:200, data: data });
  },

  /*
   * 子任务转化为独立任务
   */
  async transformTask(req, res, next) {
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const id = req.params.id;
    const condition = { taskId: id };
    const task = await Task.findOneTaskByCondition(condition);
    if(!task){
      return res.json({ status: 400, msg: '任务不存在' });
    }
    if(task.level == 1) {
      return res.json({ status: 400, msg: '已经是独立任务' });
    }
    const { doLink, doLinked } = req.body;
    const data = await teambition.transformTask(id, doLink, doLinked, token);
    console.log('data', data);
    // 独立任务后任务的parent和level改变
    await Task.updateTask(task._id, { level: 1, parent: task.projectId });
    const gap = task.level - 1;
    console.log('gap', gap);
    await taskUtils.resetTaskLevel(id, gap);
    const tree = await projectUtils.getTaskTreeByProjectId(task.projectId);
    res.json({ status: 200, data: tree, msg: '设置独立任务成功' });
  }

}
