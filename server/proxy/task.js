import { Task } from '../models';
export default {
  /**
   * ----{根据id返回结果}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async findById(id) {
    return await Task.findById(id);
  },

  /**
   * ----{条件统计}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async findTasksByCondition(condition) {
    return await Task.find(condition);
  },

  /**
   * ----{条件统计}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async countTasksByCondition(condition) {
    return await Task.count(condition);
  },

  /**
   * ----{查看单个}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async findOneTaskByCondition(condition) {
    return await Task.findOne(condition);
  },

  /**
   * ----{插入数据}----
   * @param {Object} object task
   * @returns {Promise} promise
   */
  async insertTask(object) {
    const task = new Task(object);
    await task.save();
  },
  /**
   * ----{删除数据}----
   * @param {String} id id
   * @returns {Promise} promise
   */
  async removeById(id) {
    await Task.findByIdAndRemove(id);
  },
  /**
   * ----{更新数据}----
   * @param {String} id id
   * @param {Object} update update
   * @returns {Promise} promise
   */
  async updateTask(id, update) {
    await Task.findByIdAndUpdate(id, update);
  },

  /**
   * ----{删除数据}----
   * @param {Object} condition condition
   * @returns {Promise} promise
   */
  async removeByCondition(condition) {
    await Task.remove(condition);
  },

  /**
   * ----{更新数据}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} promise
   */
  async updateTasksByCondition(condition, update, options) {
    await Task.update(condition, update, options);
  },
};
