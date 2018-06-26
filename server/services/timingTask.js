import { TimingTask } from '../proxy';
export default {

  /**
   * ----{根据条件查看任务工时数量}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async countTimingTasksByCondition(condition){
    return await TimingTask.countTimingTasksByCondition(condition);
  },

  /**
   * ----{根据条件查看任务工时列表}----
   * @param {Object} condition condition
   * @param {String} pageSize pageSize
   * @param {String} current current
   * @returns {Promise} Promise
   */
  async findTimingTasksByCondition(condition, pageSize, current){
    const timingTasks = await TimingTask.
      findTimingTasksByCondition(condition, pageSize, current);
    const total = await TimingTask.countTimingTasksByCondition(condition);
    return await { timingTasks, total }
  },

  /**
   * ----{获取任务工时}----
   * @param {ObjectId} id id
   * @returns {Promise} Promise
   */
  async findTimingTaskById(id){
    return await TimingTask.findById(id);
  },

  /**
   * ----{新增任务工时}----
   * @param {Object} timingTask timingTask
   * @returns {Promise} Promise
   */
  async insertTimingTask(timingTask){
    await TimingTask.insertTimingTask(timingTask);
  },

  /**
   * ----{更新任务工时}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async updateTimingTask(id, update){
    await TimingTask.updateTimingTask(id, update);
  },

  /**
   * ----{条件查询}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async findOneTimingTaskByCondition(condition){
    return await TimingTask.findOneTimingTaskByCondition(condition);
  },

  /**
   * ----{hide timingTask}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async hideTimingTaskById(id){
    const update = { isHidden: true };
    await TimingTask.updateTimingTask(id, update);
  },

  /**
   * ----{unhide timingTask}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unhideTimingTaskTaskById(id){
    const update = { isHidden: false };
    await TimingTask.updateTimingTask(id, update);
  },

  /**
   * ----{归档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async archiveTimingTaskById(id){
    const update = { isArchived: true };
    await TimingTask.updateTimingTask(id, update);
  },

  /**
   * ----{解档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unarchiveTimingTaskById(id){
    const update = { isArchived: false };
    await TimingTask.updateTimingTask(id, update);
  },

  /**
   * ----{unhide timingTasks bulk}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async unhideTimingTasksByCondition(condition){
    const update = { isHidden: false };
    const options = { multi: true };
    await TimingTask.updateTimingTasksByCondition(condition, update, options);
  },

  /**
   * ----{hide timingTasks bulk}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async hideTimingTasksByCondition(condition){
    const update = { isHidden: true };
    const options = { multi: true };
    await TimingTask.updateTimingTasksByCondition(condition, update, options);
  },

  /**
   * ----{update timingTasks by condition}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async updateTimingTaskesByCondition(condition, update) {
    const options = { multi: true };
    await TimingTask.updateTimingTasksByCondition(condition, update, options);
  },

  /**
   * ----{delete timingTasks by condition}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async removeByCondition(condition){
    await TimingTask.removeByCondition(condition);
  },

  async startTimingById(id, type) {
    const update = {
      tempStartDate: new Date(),
      status: 1,
      type: type
    }
    await TimingTask.updateTimingTask(id, update);
  },

  async pauseTiming(timingTask) {
    const date = new Date();
    const plus = (date.valueOf() - timingTask.tempStartDate.valueOf())/1000;
    const duration = timingTask.duration + plus;
    const update = {
      tempDueDate: date,
      duration: duration,
      status: 2
    }
    await TimingTask.updateTimingTask(timingTask._id, update);
  },

  async continueTiming(timingTask) {
    const date = new Date();
    const update = {
      tempStartDate: date,
      status: 1
    }
    await TimingTask.updateTimingTask(timingTask._id, update);
  },

  async completeTiming(timingTask) {
    const date = new Date();
    let update = {
      tempDueDate: date, 
      status: 3
    }
    if(timingTask.status === 1) {
      const plus = (date.valueOf() - timingTask.tempStartDate.valueOf())/1000;
      const duration = timingTask.duration + plus;
      update.duration = duration;
    }
    console.log('update', update);
    await TimingTask.updateTimingTask(timingTask._id, update);
  },
}
