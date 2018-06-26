import teambition from '../common/teambition';
import config from 'config';
export default {

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
}
