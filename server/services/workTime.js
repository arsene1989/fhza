import { WorkTime } from '../proxy';
export default {

  /**
   * ----{根据条件查看任务工时数量}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async countWorkTimesByCondition(condition){
    return await WorkTime.countWorkTimesByCondition(condition);
  },

  /**
   * ----{根据条件查看任务工时列表}----
   * @param {Object} condition condition
   * @param {String} pageSize pageSize
   * @param {String} current current
   * @returns {Promise} Promise
   */
  async findWorkTimesByCondition(condition, pageSize, current){
    const workTimes = await WorkTime.
      findWorkTimesByCondition(condition, pageSize, current);
    const total = await WorkTime.countWorkTimesByCondition(condition);
    return await { workTimes, total }
  },

  /**
   * ----{获取任务工时}----
   * @param {ObjectId} id id
   * @returns {Promise} Promise
   */
  async findWorkTimeById(id){
    return await WorkTime.findById(id);
  },

  /**
   * ----{新增任务工时}----
   * @param {Object} workTime workTime
   * @returns {Promise} Promise
   */
  async insertWorkTime(workTime){
    await WorkTime.insertWorkTime(workTime);
  },

  /**
   * ----{更新任务工时}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async updateWorkTime(id, update){
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{条件查询}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async findOneWorkTimeByCondition(condition){
    return await WorkTime.findOneWorkTimeByCondition(condition);
  },

  /**
   * ----{hide workTime}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async hideWorkTimeById(id){
    const update = { isHidden: true };
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{unhide workTime}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unhideWorkTimeTaskById(id){
    const update = { isHidden: false };
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{归档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async archiveWorkTimeById(id){
    const update = { isArchived: true };
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{解档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unarchiveWorkTimeById(id){
    const update = { isArchived: false };
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{unhide worktimes bulk}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async unhideWorkTimesByCondition(condition){
    const update = { isHidden: false };
    const options = { multi: true };
    await WorkTime.updateWorkTimesByCondition(condition, update, options);
  },

  /**
   * ----{hide worktimes bulk}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async hideWorkTimesByCondition(condition){
    const update = { isHidden: true };
    const options = { multi: true };
    await WorkTime.updateWorkTimesByCondition(condition, update, options);
  },

  /**
   * ----{update worktimes by condition}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async updateWorkTimesByCondition(condition, update) {
    const options = { multi: true };
    await WorkTime.updateWorkTimesByCondition(condition, update, options);
  },

  /**
   * ----{delete worktimes by condition}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async removeByCondition(condition){
    await WorkTime.removeyCondition(condition);
  },

  async startTimingById(id) {
    const update = {
      tempStartDate: new Date(),
      status: 1
    }
    await WorkTime.updateWorkTime(id, update);
  },

  async pauseTiming(workTime) {
    const date = new Date();
    const add = (date.valueOf() - workTime.tempStartDate.valueOf())/1000
    const duration = workTime.duration + add;
    const update = {
      tempStartDate: date,
      duration: duration,
      status: 2
    }
    await WorkTime.updateWorkTime(workTime._id, update);
  },

  async continueTiming(workTime) {
    const date = new Date();
    const update = {
      tempStartDate: date,
      duration: duration,
      status: 1
    }
    await WorkTime.updateWorkTime(workTime._id, update);
  },

  async completeTiming(workTime) {
    const date = new Date();
    const add = (date.valueOf() - workTime.tempStartDate.valueOf())/1000
    const duration = workTime.duration + add;
    const update = {
      tempStartDate: date,
      duration: duration,
      status: 3
    }
    await WorkTime.updateWorkTime(workTime._id, update);
  },
}
