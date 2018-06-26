
import teambition from '../common/teambition';
import taskUtils from '../utils/taskUtils';
import config from 'config';
import { TimingTask } from '../proxy';
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
    let timingTasks = await TimingTask.findTimingTasksByCondition(condition);

    if (!timingTasks.length) {
      let tasksFromTB = await teambition.getAllTasksByProjectId(project._id);
      console.log('tasksFromTB', tasksFromTB);
      for(let task of tasksFromTB){
        let level = await taskUtils.getLevelByTaskId(task._id);
        let taskFromTB = await teambition.
          getTaskById(task._id, token);
        console.log('taskFromTB', taskFromTB);
        let projectFromTB = await teambition.
          getPorjectInfoById(task._projectId, token);
        console.log('projectFromTB', projectFromTB);
        let timingTask = {
          name: task.content,
          isHidden: false,
          isArchived: false,
          organizationId: projectFromTB._organizationId,
          organizationName: projectFromTB.organization.name,
          projectId: task._projectId,
          projectName: projectFromTB.name,
          taskId: task._id,
          type: null,
          level: level,
          startDate: task.startDate ? new Date(task.startDate) : null,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          tempStartDate: null,
          tempDueDate: null,
          duration: 0,
          executorId: task._executorId,
          executorName: taskFromTB.executor.name,
          status: 0,
        }
        await TimingTask.insertTimingTask(timingTask);
      }
    }
  },

}
