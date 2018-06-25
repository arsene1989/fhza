import { WorkTime } from '../models';
export default {
  /**
   * ----{根据id返回结果}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async findById(id) {
    return await WorkTime.findById(id);
  },

  /**
   * ----{条件统计}----
   * @param {Object} condition condition
   * @param {String} pageSize pageSize
   * @param {String} current current
   * @returns {Promise} promise
   */
  async findWorkTimesByCondition(condition, pageSize, current) {
    const skip = (current-1) * pageSize;
    return await WorkTime.find(condition)
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
  async countWorkTimesByCondition(condition) {
    return await WorkTime.count(condition);
  },

  /**
   * ----{查看单个}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async findOneWorkTimeByCondition(condition) {
    return await WorkTime.findOne(condition);
  },

  /**
   * ----{插入数据}----
   * @param {Object} object task
   * @returns {Promise} promise
   */
  async insertWorkTime(object) {
    const workTime = new WorkTime(object);
    await workTime.save();
  },
  /**
   * ----{删除数据}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async removeById(id) {
    await WorkTime.findByIdAndRemove(id);
  },
  /**
   * ----{更新数据}----
   * @param {String} id id
   * @param {Object} update update
   * @returns {Promise} promise
   */
  async updateWorkTime(id, update) {
    await WorkTime.findByIdAndUpdate(id, update);
  },

  /**
   * ----{删除数据}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async removeByCondition(condition) {
    await WorkTime.remove(condition);
  },

  /**
   * ----{更新数据}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} promise
   */
  async updateWorkTimesByCondition(condition, update, options) {
    await WorkTime.update(condition, update, options);
  },
};
