
import WorkTime from '../services/workTime';

export default {
  /*
   * 根据项目Id获取所有任务工时
   */
  async workTimesByProjectId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { projectId: id, isHidden: false, isArchived: false };
    const workTimes = await WorkTime.
      findWorkTimesByCondition(condition, pageSize, current);
    res.json({ status:200, data: workTimes });
  },

  /*
   * 根据项目Id获取所有任务
   */
  async workTimesByExecutorId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { executorId: id, isHidden: false, isArchived: false };
    const workTimes = await WorkTime.
      findWorkTimesByCondition(condition, pageSize, current);
    res.json({ status:200, data: workTimes });
  },

  /*
   * 根据项目Id获取所有任务
   */
  async workTimesByOrganizationId(req, res, next) {
    const id = req.params.id;
    const { pageSize, current } = req.query;
    console.log('pageSize and current', pageSize, current);
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { organizationId: id, 
      isHidden: false, isArchived: false };
    const workTimes = await WorkTime.
      findWorkTimesByCondition(condition, pageSize, current);
    res.json({ status:200, data: workTimes });
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
      const task = await WorkTime.findWorkTimeById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      const condition = { executorId: task.executorId, isHidden: false, 
        isArchived: false, status: 1 };
      const workTime = await WorkTime.
        findOneWorkTimeByCondition(condition);
      console.log('workTime', workTime);
      if(workTime){
        await WorkTime.pauseTiming(workTime);
      }
      await WorkTime.startTimingById(id);
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
      const task = await WorkTime.findWorkTimeById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      await WorkTime.pauseTiming(workTime);
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
      const task = await WorkTime.findWorkTimeById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      // 停止正在进行的计时
      const condition = { executorId: task.executorId, isHidden: false, 
        isArchived: false, status: 1 };
      const workTime = await WorkTime.
        findOneWorkTimeByCondition(condition);
      console.log('workTime', workTime);
      if(workTime){
        await WorkTime.pauseTiming(workTime);
      }
      await WorkTime.continueTiming(task);
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
      const task = await WorkTime.findWorkTimeById(id);
      if(!task){
        return res.json({ status: 400, msg: '找不到任务' });
      } 
      
      await WorkTime.completeTiming(task);
    } catch (error) {
      next(error);
    }
    
  },
}
