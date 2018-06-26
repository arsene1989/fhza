import { TimingTask } from '../models';
export default {
  /**
   * ----{根据id返回结果}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async findById(id) {
    return await TimingTask.findById(id);
  },

  /**
   * ----{条件统计}----
   * @param {Object} condition condition
   * @param {String} pageSize pageSize
   * @param {String} current current
   * @returns {Promise} promise
   */
  async findTimingTasksByCondition(condition, pageSize, current) {
    const skip = (current-1) * pageSize;
    return await TimingTask.find(condition)
      .skip(Number(skip))
      .sort({ status: 1, updatedAt: -1 })
      .limit(Number(pageSize))
      .exec();
  },

  /**
   * ----{条件统计}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async countTimingTasksByCondition(condition) {
    return await TimingTask.count(condition);
  },

  /**
   * ----{查看单个}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async findOneTimingTaskByCondition(condition) {
    return await TimingTask.findOne(condition);
  },

  /**
   * ----{插入数据}----
   * @param {Object} object task
   * @returns {Promise} promise
   */
  async insertTimingTask(object) {
    const timingTask = new TimingTask(object);
    await timingTask.save();
  },
  /**
   * ----{删除数据}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async removeById(id) {
    await TimingTask.findByIdAndRemove(id);
  },
  /**
   * ----{更新数据}----
   * @param {String} id id
   * @param {Object} update update
   * @returns {Promise} promise
   */
  async updateTimingTask(id, update) {
    await TimingTask.findByIdAndUpdate(id, update);
  },

  /**
   * ----{删除数据}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async removeByCondition(condition) {
    await TimingTask.remove(condition);
  },

  /**
   * ----{更新数据}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} promise
   */
  async updateTimingTasksByCondition(condition, update, options) {
    await TimingTask.update(condition, update, options);
  },
};
