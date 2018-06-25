import Task from '../services/task';
import teambition from '../common/teambition';
import config from 'config';
export default {
  // 获取所有任务的最高level
  getTasksLevel(nodes){
    console.log('nodes', nodes);
    if(!nodes.length) {
      return 0;
    }
    let max = nodes[0].level;
    for(let i = 1; i < nodes.length; i++){
      if( max <= nodes[i].level){
        max = nodes[i].level;
      }
    }
    return max;
  },
  // 返回树形结构数据
  getTaskTree(nodes){
    const level = this.getTasksLevel(nodes);
    console.log('level', level);
    if(level === 0) {
      return nodes[0];
    }
    const group = new Array();
    for(let i = 0; i <= level; i ++) {
      let object = {};
      object.children = [];
      group.push(object);
    }
    console.log('group', group);

    for(let node of nodes) {
      let level = node.level;
      console.log(`group[${level}]`, group[level]);
      group[level].children.push(node);
    }

    console.log('group', group);
    for(let i = level; i >= 1; i --) {
      let subTasks = group[i].children;
      console.log('subTasks', subTasks);
      let parentTasks = group[i-1].children;
      console.log('parentTasks', parentTasks);
      for(let subTask of subTasks) {
        for(let parentTask of parentTasks) {
          // 用任务的taskId和子任务的parent判断
          if(parentTask.taskId === subTask.parent){
            parentTask.children.push(subTask);
          }
        }
      }
    }

    return group[0].children[0];
  },

  /*
   * 设置任务及其子任务的ProjectId，递归调用
   */
  async setSubTaskProjectIdByTaskId(taskId, projectId){
    const condition = { parent: taskId };
    const subTasks = await Task.findTasksByCondition(condition);
    await Task.setProjectIdByCondition(condition, projectId);
    for(let subTask of subTasks) {
      await this.setSubTaskProjectIdByTaskId(subTask.taskId, projectId);
    }
  },

  /*
   * 删除任务及其子任务，递归调用
   */
  async removeAllSubtasksByTaskId(taskId){
    const condition = { taskId: taskId };
    const task = await Task.findOneTaskByCondition(condition);
    await Task.removeByCondition(condition);
    // 子任务
    const conditionOfParent = { parent: task.taskId }
    const subTasks = await Task.findTasksByCondition(conditionOfParent);
    console.log('subTasks', subTasks);
    for(let subTask of subTasks){
      await this.removeAllSubtasksByTaskId(subTask.taskId);
    }
  },

  // 获取单个task的level
  async getLevelByTaskId(taskId){
    let level = 1;
    let token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const task = await teambition.getTaskById(taskId, token);
    // console.log('task', task);
    let parent = task.parent;

    while(parent){
      level ++;
      let task = await teambition.getTaskById(parent._id, token);
      parent = task.parent;
    }

    return level;
  },

  /*
   * 生成独立任务重置后所有子任务改变子任务的level
   */
  async resetTaskLevel(taskId, gap){
    const condition = { parent: taskId }
    let subTasks = await Task.findTasksByCondition(condition);
    if(subTasks.length){
      for(let subTask of subTasks) {
        let level = subTask.level - gap;
        await Task.updateTask(subTask._id, { level: level });
        await this.resetTaskLevel(subTask.taskId, gap);
      }
    }
  },
}
