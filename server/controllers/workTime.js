
// import teambition from '../common/teambition';
// import config from 'config';
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
    const workTimes = WorkTime.
      findWorkTimesByCondition(condition, pageSize, current)
    res.json({ status:200, data: workTimes })
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
    const workTimes = WorkTime.
      findWorkTimesByCondition(condition, pageSize, current)
    res.json({ status:200, data: workTimes })
  },

  /*
   * 根据任务id开始计时
   */
  async startTimingByTaskId(req, res, next) {
    const id = req.params.id;
    if(!id){
      return res.json({ status: 400, msg: 'id不存在' });
    }
    const condition = { executorId: id, isHidden: false, isArchived: false };
    const workTimes = WorkTime.
      findWorkTimesByCondition(condition, pageSize, current)
    res.json({ status:200, data: workTimes })
  },
}
