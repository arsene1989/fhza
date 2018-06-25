
import teambition from '../common/teambition';
import taskUtils from '../utils/taskUtils';
import config from 'config';
import { Task } from '../proxy';
import { Node } from '../models/taskNode'
import { eventsForProject,
  callbackUrlProject } from '../common/constants';

export default {
  // 初始化项目的任务数据
  async initProjectData(project){
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);

    let hooks = await teambition.getHooksByProjectId(project._id, token);
    console.log('hooks', hooks);
    let contains = false;
    for(let hook of hooks) {
      if(callbackUrlProject === hook.callbackURL) {
        contains = true;
      }
    }
    if(!contains){
      let result = await teambition.createProjectHook(project._id,
        callbackUrlProject, eventsForProject, token);
      console.log('result', result)
    }
    let condition = { projectId: project._id };
    let tasks = await Task.findTasksByCondition(condition);

    if (!tasks.length) {
      let root = {
        name: project.name,
        parent: null,
        isHidden: false,
        isArchived: false,
        projectId: project._id,
        taskId: project._id,
        level: 0,
        isDone: false,
        priority: 0,
        progress: 0
      }
      await Task.insertTask(root);
      console.log('create root node', root);
      let tasksFromTB = await teambition.getAllTasksByProjectId(project._id);
      console.log('tasksFromTB', tasksFromTB);
      for(let task of tasksFromTB){
        let level = await taskUtils.getLevelByTaskId(task._id)
        let node = {
          name: task.content,
          parent: task.parent ? task.parent._id : project._id,
          isHidden: false,
          isArchived: false,
          projectId: project._id,
          taskId: task._id,
          level: level,
          isDone: false,
          priority: 0,
          progress: 0
        }
        await Task.insertTask(node);
      }
    }
  },

  async getTaskTreeByProjectId(projectId) {
    let tasks = await Task.findTasksByCondition({ projectId: projectId,
      isArchived: false, isHidden: false });
    console.log('tasks', tasks);
    let nodes = new Array();
    for(let task of tasks) {
      let node = new Node(task);
      nodes.push(node);
    }
    const tree = taskUtils.getTaskTree(nodes);
    return tree;
  }

}
