
import TimingTask from '../services/timingTask';

export default {
  /*
   * 根据项目Id获取所有任务工时
   */
  async timingTasksByProjectId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { projectId: id, isHidden: false, isArchived: false };
    const timingTasks = await TimingTask.
      findTimingTasksByCondition(condition, pageSize, current);
    res.json({ status:200, data: timingTasks });
  },

  /*
   * 根据项目Id获取所有任务
   */
  async timingTasksByExecutorId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { executorId: id, isHidden: false, isArchived: false };
    const timingTasks = await TimingTask.
      findTimingTasksByCondition(condition, pageSize, current);
    res.json({ status:200, data: timingTasks });
  },

  /*
   * 根据项目Id获取所有任务
   */
  async timingTasksByOrganizationId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { organizationId: id, 
      isHidden: false, isArchived: false };
    const timingTasks = await TimingTask.
      findTimingTasksByCondition(condition, pageSize, current);
    res.json({ status:200, data: timingTasks });
  },


  /*
   * 根据id开始计时
   */
  async startTimingById(req, res, next) {
    const id = req.params.id;
    const { type } = req.body; 
    if(!id){
      return res.json({ status: 400, msg: 'id不能为空' });
    }

    if(!type){
      return res.json({ status: 400, msg: '任务类型不能为空' });
    }
    
    try {
      const task = await TimingTask.findTimingTaskById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      const condition = { executorId: task.executorId, isHidden: false, 
        isArchived: false, status: 1 };
      const timingTask = await TimingTask.
        findOneTimingTaskByCondition(condition);
      console.log('timingTask', timingTask);
      if(timingTask){
        await TimingTask.pauseTiming(timingTask);
      }
      await TimingTask.startTimingById(id);
      res.json({ status: 200, msg: '任务开始计时' });
    } catch (error) {
      next(error);
    }
    
  },

  /*
   * 根据id暂停计时
   */
  async pauseTimingById(req, res, next) {
    const id = req.params.id; 
    if(!id){
      return res.json({ status: 400, msg: 'id不能为空' });
    }
    try {
      const task = await TimingTask.findTimingTaskById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      await TimingTask.pauseTiming(task);
      res.json({ status: 200, msg: '任务暂停计时' });
    } catch (error) {
      next(error);
    }
  },

  /*
   * 根据id继续计时
   */
  async continueTimingById(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    
    try {
      const task = await TimingTask.findTimingTaskById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      const condition = { executorId: task.executorId, isHidden: false, 
        isArchived: false, status: 1 };
      const timingTask = await TimingTask.
        findOneTimingTaskByCondition(condition);
      console.log('timingTask', timingTask);
      if(timingTask){
        await TimingTask.pauseTiming(timingTask);
      }
      await TimingTask.continueTiming(task);
      res.json({ status: 200, msg: '任务继续计时' });
    } catch (error) {
      next(error);
    }
  },

  /*
   * 根据id完成计时
   */
  async completeTimingById(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    try {
      const task = await TimingTask.findTimingTaskById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      
      await TimingTask.completeTiming(task);
      res.json({ status: 200, msg: '任务完成计时' });
    } catch (error) {
      next(error);
    }
    
  },
}
