import teambition from '../common/teambition';
import config from 'config';
import Task from '../services/task';
import { eventsForProject } from '../common/constants';
import taskUtils from '../utils/taskUtils';
import projectUtils from '../utils/projectUtils';

export default {

  /*
   * Project hook回调
   */
  async callbackProjectHook(req, res, next) {
    const event = req.body.event;
    const data = req.body.data;
    console.log('event', event);
    console.log('data', data);
    switch(event){
    // 根节点名字修改
    case "project.rename":{
      let projectId = data.project._id;
      let projectName = data.project.name;
      let condition = { projectId: projectId, parent: null };
      console.log('condition', condition);
      let task = await Task.findOneTaskByCondition(condition);
      console.log('task', task);
      await Task.updateTask(task._id, { name: projectName });
    }
      break;
    // 创建任务
    case "task.create":{
      let parent;
      if(!data.task.ancestorIds.length) {
        let condition = { taskId: data.project._id };
        console.log('condition', condition);
        parent = await Task.findOneTaskByCondition(condition);
      } else {
        let condition = { taskId: data.task.ancestorIds[0] };
        console.log('condition', condition);
        parent = await Task.findOneTaskByCondition(condition);
      }
      console.log('parent', parent);
      let node = {
        name: data.task.content,
        parent: parent.taskId,
        isHidden: false,
        isArchived: false,
        projectId: data.project._id,
        taskId: data.task._id,
        level: data.task.ancestorIds.length ?
          data.task.ancestorIds.length + 1 : 1,
      }
      await Task.insertTask(node);
    }
      break;
    case "task.update":
      return res.json({ code: 200, msg: '不支持 task.update' });
    // 删除任务及其子任务
    case "task.remove": {
      await taskUtils.removeAllSubtasksByTaskId(data.task._id)
    }
      break;
    // 复制任务及其子任务
    case "task.fork": {
      let node = {
        name: data.task.content,
        parent: data.project._id,
        isHidden: false,
        isArchived: false,
        projectId: data.project._id,
        taskId: data.task._id,
        level: data.task.ancestorIds.length ?
          data.task.ancestorIds.length + 1 : 1,
      }
      // 复制任务
      await Task.insertTask(node);

      let subTasks = await teambition.getTasksByAncestorId(data.task._id);
      console.log('subTasks', subTasks);
    }
      break;
    case "task.update.executor":
      return res.json({ code: 200, msg: '不支持 task.update.executor' });
    case "task.update.startDate":
      return res.json({ code: 200, msg: '不支持 task.update.startDate' });
    case "task.update.dueDate":
      return res.json({ code: 200, msg: '不支持 task.update.dueDate' });
    case "task.update.priority": {
      let priority = data.task.priority;
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      let priorityNumber = 0;
      if(priority === 'normal') {
        priorityNumber = 0;
      } else if(priority === 'high') {
        priorityNumber = 1;
      } else if(priority === 'urgent') {
        priorityNumber = 2;
      }
      await Task.updateTask(task._id, { priority: priorityNumber });
    }
      break;
    case "task.update.involveMembers":
      return res.json({ code: 200, msg: '不支持 task.update.involveMembers' });
    case "task.update.storyPoint":
      return res.json({ code: 200, msg: '不支持 task.update.storyPoint' });
    case "task.update.workTime.totalTime":
      return res.json({ code: 200, msg: '不支持 task.update.workTime.totalTime' });
    case "task.update.workTime.usedTime":
      return res.json({ code: 200, msg: '不支持 task.update.workTime.usedTime' });
    case "task.update.progress":{
      let progress = data.task.progress;
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      await Task.updateTask(task._id, { progress: progress });
    }
      break;
    case "task.update.rating":
      return res.json({ code: 200, msg: '不支持 task.update.rating' });
    case "task.update.taskflowstatus":
      return res.json({ code: 200, msg: '不支持 task.update.taskflowstatus' });
    case "task.update.scenariofieldconfig":
      return res.json({ code: 200,
        msg: '不支持 task.update.scenariofieldconfig' });
    // 任务重命名，节点名字修改
    case "task.rename": {
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      await Task.updateTask(task._id, { name: data.task.content });
    }
      break;
    // 移动项目
    case "task.move": {
      // 同个项目内任务平移
      if(data.project._id === data.old._projectId){
        console.log('same');
      // 任务从一个项目移动到另外一个项目中
      } else {
        // 任务修改父节点,
        let condition = { taskId: data.task._id };
        console.log('condition', condition);
        let task = await Task.findOneTaskByCondition(condition);
        console.log('task', task);
        let update = { parent: data.project._id, projectId: data.project._id };
        await Task.updateTask(task._id, update);
        // 所有子任务projectId修改
        await taskUtils.setSubTaskProjectIdByTaskId(data.task._id,
          data.project._id);
      }
    }
      break;
    case "task.done": {
      let isDone = data.task.isDone;
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      await Task.updateTask(task._id, { isDone: isDone });
    }
      break;
    // 任务归档
    case "task.archive": {
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      await Task.archiveTaskById(task._id);
    }
      break;
    // 任务解档
    case "task.unarchive": {
      let condition = { taskId: data.task._id };
      let task = await Task.findOneTaskByCondition(condition);
      await Task.unarchiveTaskById(task._id);
    }
      break;
    case "task.bulk.update.executor":
      return res.json({ code: 200, msg: '不支持 task.bulk.update.executor' });
    case "task.bulk.archive":
      return res.json({ code: 200, msg: '不支持 task.update.rating' });
    case "task.bulk.remove":
      return res.json({ code: 200, msg: '不支持 task.bulk.remove' });
    case "task.bulk.move":
      return res.json({ code: 200, msg: '不支持 task.bulk.move' });
    case "task.bulk.update.sprint":
      return res.json({ code: 200, msg: '不支持 task.bulk.update.sprint' });
    case "task.bulk.update.dueDate":
      return res.json({ code: 200, msg: '不支持 task.bulk.update.dueDate' });
    case "task.bulk.update.startDate":
      return res.json({ code: 200, msg: '不支持 task.bulk.update.startDate' });
    case "task.bulk.done.by.sprint":
      return res.json({ code: 200, msg: '不支持 task.bulk.done.by.sprint' });
    // 移动列表所有项目
    case "task.bulk.update.stage.by.stage":{
      if(data.current._projectId === data.project._id &&
         data.current._stageId === data.stage._id) {
        console.log('same');
      } 
      // let tasks = await teambition.getTasksByStageId()
    }
      break;
    case "task.bulk.update.executor.by.stage":
      return res.json({ code: 200, msg: 'task.bulk.update.executor.by.stage' });
    case "task.bulk.update.dueDate.by.stage":
      return res.json({ code: 200, msg:
        'task.bulk.update.executor.by.stage' });
    case "task.bulk.update.visibility.by.stage":
      return res.json({ code: 200, msg:
        '不支持 task.bulk.update.visibility.by.stage' });
    case "task.bulk.archive.by.stage":
      return res.json({ code: 200, msg: '不支持 task.bulk.archive.by.stage' });
    default:
      return res.json({ code: 400, msg: 'hook类型错误' });
    }
    return res.json({ code: 200, msg: 'Hook回调完成' });
  },

  /*
   * Organization hook回调
   */
  async callbackOrganizationHook(req, res, next) {
    const event = req.body.event;
    const data = req.body.data;
    console.log('event', event);
    console.log('data', data);
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    console.log('token', token);
    switch(event)
    {
    // 创建项目，给项目添加Webhook，同时设置项目为任务根节点
    case "project.create":{
      let projectId = data.project._id;
      let callbackUrl =
        `http://${config.hook_host}:${config.port}/callback/project`;
      let result = await teambition.
        createProjectHook(projectId, callbackUrl, eventsForProject, token);
      console.log('result', result);
      let projectName = data.project.name;
      let root = {
        name: projectName,
        parent: null,
        isHidden: false,
        isArchived: false,
        projectId: projectId,
        taskId: projectId,
        level: 0,
        isDone: false,
        priority: 0,
        progress: 0
      }
      await Task.insertTask(root);
    }
      break;
    // 项目删除，项目所有任务删除
    case "project.remove":{
      let projectId = data.project._id;
      let condition = { projectId: projectId };
      await Task.removeByCondition(condition);
    }
      break;
    // 项目归档，项目内所有的任务不可见
    case "project.archive":{
      let projectId = data.project._id;
      let condition = { projectId: projectId };
      await Task.hideTasksByCondition(condition);
    }
      break;
    // 项目解档，项目内所有的任务设置为可见, 需要验证是否添加hook
    case "project.unarchive":{
      let projectId = data.project._id;
      let project = await teambition.getPorjectInfoById(projectId, token);
      await projectUtils.initProjectData(project);
      let condition = { projectId: projectId };
      await Task.unhideTasksByCondition(condition);
    }
      break;
    default:
      return res.json({ code: 200, msg: 'hook类型错误' });
    }
    return res.json({ code: 200, msg: 'Hook回调完成' });
  },

}
