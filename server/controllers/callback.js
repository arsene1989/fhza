import teambition from '../common/teambition';
import config from 'config';
import { eventsForProject } from '../common/constants';
import projectUtils from '../utils/projectUtils';
import TimingTask from '../services/timingTask';

export default {

  /*
   * Project hook回调
   */
  async callbackProjectHook(req, res, next) {
    const event = req.body.event;
    const data = req.body.data;
    console.log('event', event);
    console.log('data', data);
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    console.log('token', token);
    switch(event){
    // 修改所有
    case "project.rename":{
      let projectId = data.project._id;
      let projectName = data.project.name;
      let condition = { projectId: projectId };
      let update = { projectName: projectName }
      await TimingTask.updateTimingTaskesByCondition(condition, update);
    }
      break;
    // 创建任务
    case "task.create":{
      let organizationId = data.project._organizationId;
      let organization = await teambition.
        getOrganizationById(organizationId, token)
      let timingTask = {
        name: data.task.content,
        isHidden: false,
        isArchived: false,
        organizationId: organizationId,
        organizationName: organization.name,
        projectId: data.project._id,
        projectName: data.project.name,
        taskId: data.task._id,
        type: null,
        level: data.task.ancestorIds.length ?
          data.task.ancestorIds.length + 1 : 1,
        startDate: null,
        dueDate: null,
        duration: 0,
        tempStartDate: null,
        tempDueDate: null,
        executorId: data.task.executor._id,
        executorName: data.task.executor.name,
        status: 0
      }
      await TimingTask.insertTimingTask(timingTask);
    }
      break;
    case "task.update":
      console.log('不支持 task.update');
      return res.json({ code: 200, msg: '不支持 task.update' });
    // 删除任务及其子任务
    case "task.remove": 
      console.log('不支持 task.remove');
      return res.json({ code: 200, msg: '不支持 task.remove' });
    // 复制任务及其子任务
    case "task.fork": {
      let organizationId = data.project._organizationId;
      let organization = await teambition.
        getOrganizationById(organizationId, token)
      let timingTask = {
        name: data.task.content,
        isHidden: false,
        isArchived: false,
        organizationId: organizationId,
        organizationName: organization.name,
        projectId: data.project._id,
        projectName: data.project.name,
        taskId: data.task._id,
        level: data.task.ancestorIds.length ?
          data.task.ancestorIds.length + 1 : 1,
        startDate: null,
        type: null,
        dueDate: null,
        duration: 0,
        tempStartDate: null,
        tempDueDate: null,
        executorId: data.task.executor._id,
        executorName: data.task.executor.name,
        status: 0
      }
      await TimingTask.insertTimingTask(timingTask);
    }
      break;
    // 任务执行者变更,新建一个计时任务，原来的任务暂停
    case "task.update.executor":{
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      let update = { executorId: data.task.executor._id, 
        executorName: data.task.executor.name };
      await TimingTask.updateTimingTask(timingTask._id, update);
    }
      break;
    // 任务开始时间
    case "task.update.startDate":{
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      let date = new Date(data.task.startDate);
      console.log('date', date);
      let update = { startDate: date };
      await TimingTask.updateTimingTask(timingTask._id, update);
    }
      break;
    // 任务开始时间
    case "task.update.dueDate":{
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      let date = new Date(data.task.dueDate);
      console.log('date', date);
      let update = { dueDate: date };
      await TimingTask.updateTimingTask(timingTask._id, update);
    }
      break;
    case "task.update.priority": 
      console.log('不支持 task.update.priority');
      return res.json({ code: 200, msg: '不支持 task.update.priority' });
    case "task.update.involveMembers":
      console.log('不支持 task.update.involveMembers');
      return res.json({ code: 200, msg: '不支持 task.update.involveMembers' });
    case "task.update.storyPoint":
      console.log('不支持 task.update.storyPoint');
      return res.json({ code: 200, msg: '不支持 task.update.storyPoint' });
    case "task.update.workTime.totalTime":
      console.log('不支持 task.update.workTime.totalTime');
      return res.json({ code: 200, msg: '不支持 task.update.workTime.totalTime' });
    case "task.update.workTime.usedTime":
      console.log('不支持 task.update.workTime.usedTime');
      return res.json({ code: 200, msg: '不支持 task.update.workTime.usedTime' });
    case "task.update.progress":
      console.log('不支持 task.update.workTime.progresstask.update.dueDate');
      return res.json({ code: 200, msg: '不支持 task.update.workTime.progress' });
    case "task.update.rating":
      console.log('不支持 task.update.rating');
      return res.json({ code: 200, msg: '不支持 task.update.rating' });
    case "task.update.taskflowstatus":
      console.log('不支持 task.update.taskflowstatus');
      return res.json({ code: 200, msg: '不支持 task.update.taskflowstatus' });
    case "task.update.scenariofieldconfig":
      console.log('不支持 task.update.scenariofieldconfig');
      return res.json({ code: 200,
        msg: '不支持 task.update.scenariofieldconfig' });
    // 任务重命名，节点名字修改
    case "task.rename": {
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      let update = { name: data.task.content };
      await TimingTask.updateTimingTask(timingTask._id, update);
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
        let timingTask = await TimingTask.
          findOneTimingTaskByCondition(condition);
        console.log('timingTask', timingTask);
        let update = { projectId: data.project._id, 
          projectName: data.project.name };
        await TimingTask.updateTimingTask(timingTask._id, update);
      }
    }
      break;
    // 任务是否完成
    case "task.done": 
      console.log('不支持 task.done');
      return res.json({ code: 200, msg: '不支持 task.done' });
    // 任务归档
    case "task.archive": {
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      await TimingTask.archiveTimingTaskById(timingTask._id);
    }
      break;
    // 任务解档
    case "task.unarchive": {
      let condition = { taskId: data.task._id };
      let timingTask = await TimingTask.findOneTimingTaskByCondition(condition);
      await TimingTask.unarchiveTimingTaskById(timingTask._id);
    }
      break;
    case "task.bulk.update.executor":
      console.log('不支持 task.bulk.update.executor');
      return res.json({ code: 200, msg: '不支持 task.bulk.update.executor' });
    case "task.bulk.archive":
      console.log('不支持 task.update.rating');
      return res.json({ code: 200, msg: '不支持 task.update.rating' });
    case "task.bulk.remove":
      console.log('不支持 task.bulk.remove');
      return res.json({ code: 200, msg: '不支持 task.bulk.remove' });
    case "task.bulk.move":
      console.log('不支持 task.bulk.move');
      return res.json({ code: 200, msg: '不支持 task.bulk.move' });
    case "task.bulk.update.sprint":
      console.log('不支持 task.bulk.update.sprint');
      return res.json({ code: 200, msg: '不支持 task.bulk.update.sprint' });
    case "task.bulk.update.dueDate":
      console.log('不支持 task.bulk.update.dueDate');
      return res.json({ code: 200, msg: '不支持 task.bulk.update.dueDate' });
    case "task.bulk.update.startDate":
      console.log('不支持 task.bulk.update.startDate');
      return res.json({ code: 200, msg: '不支持 task.bulk.update.startDate' });
    case "task.bulk.done.by.sprint":
      console.log('不支持 task.bulk.done.by.sprint');
      return res.json({ code: 200, msg: '不支持 task.bulk.done.by.sprint' });
    // 移动列表所有项目
    case "task.bulk.update.stage.by.stage":
      console.log('不支持 task.bulk.done.by.sprint');
      return res.json({ code: 200, msg: '不支持 task.bulk.done.by.sprint' });
    case "task.bulk.update.executor.by.stage":
      console.log('不支持 task.bulk.update.executor.by.stage');
      return res.json({ code: 200, msg: 'task.bulk.update.executor.by.stage' });
    case "task.bulk.update.dueDate.by.stage":
      console.log('不支持 task.bulk.update.executor.by.stage');
      return res.json({ code: 200, msg:
        '不支持 task.bulk.update.executor.by.stage' });
    case "task.bulk.update.visibility.by.stage":
      console.log('不支持 task.bulk.update.visibility.by.stage');
      return res.json({ code: 200, msg:
        '不支持 task.bulk.update.visibility.by.stage' });
    case "task.bulk.archive.by.stage":
      console.log('不支持 task.bulk.archive.by.stage');
      return res.json({ code: 200, msg: '不支持 task.bulk.archive.by.stage' });
    default:
      console.log('hook类型错误');
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
    }
      break;
    // 项目删除，项目所有任务删除
    case "project.remove":{
      let projectId = data.project._id;
      let condition = { projectId: projectId };
      await TimingTask.removeByCondition(condition);
    }
      break;
    // 项目归档，项目内所有的任务不可见
    case "project.archive":{
      let projectId = data.project._id;
      let condition = { projectId: projectId };
      await TimingTask.hideTimingTasksByCondition(condition);
    }
      break;
    // 项目解档，项目内所有的任务设置为可见, 需要验证是否添加hook
    case "project.unarchive":{
      let projectId = data.project._id;
      let project = await teambition.getPorjectInfoById(projectId, token);
      await projectUtils.initProjectData(project);
      let condition = { projectId: projectId };
      await TimingTask.unhideTimingTasksByCondition(condition);
    }
      break;
    default:
      return res.json({ code: 200, msg: 'hook类型错误' });
    }
    return res.json({ code: 200, msg: 'Hook回调完成' });
  },

}
