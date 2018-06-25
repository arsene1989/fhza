import { WorkTime } from '../proxy';
export default {

  /**
   * ----{根据条件查看任务数量}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async countWorkTimesByCondition(condition){
    return await WorkTime.countWorkTimesByCondition(condition);
  },

  /**
   * ----{根据条件查看任务}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async findWorkTimesByCondition(condition){
    return await WorkTime.findWorkTimesByCondition(condition);
  },

  /**
   * ----{获取微信账号}----
   * @param {ObjectId} id id
   * @returns {Promise} Promise
   */
  async findWorkTimeById(id){
    return await WorkTime.findById(id);
  },

  /**
   * ----{新增任务}----
   * @param {Object} workTime workTime
   * @returns {Promise} Promise
   */
  async insertWorkTime(workTime){
    await WorkTime.insertWorkTime(workTime);
  },

  /**
   * ----{更新任务}----
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
   * ----{更新任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async hideWorkTimeById(id){
    const update = { isHidden: true };
    await WorkTime.updateWorkTime(id, update);
  },

  /**
   * ----{更新任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unhideWorkTimeTaskById(id){
    const update = { isHidden: false };
    await WorkTime.updateWorkTime(id, update);
  },


  /**
   * ----{批量任务可见}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async unhideTasksByCondition(condition){
    const update = { isHidden: false };
    const options = { multi: true };
    await Task.updateTasksByCondition(condition, update, options);
  },

  /**
   * ----{批量删除}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async removeByCondition(condition){
    await Task.removeByCondition(condition);
  },
}
