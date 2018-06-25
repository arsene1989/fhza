import { Task } from '../proxy';
export default {

  /**
   * ----{根据条件查看任务数量}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async countTasksByCondition(condition){
    return await Task.countTasksByCondition(condition);
  },

  /**
   * ----{根据条件查看任务}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async findTasksByCondition(condition){
    return await Task.findTasksByCondition(condition);
  },

  /**
   * ----{获取微信账号}----
   * @param {ObjectId} id id
   * @returns {Promise} Promise
   */
  async findTaskById(id){
    return await Task.findById(id);
  },

  /**
   * ----{新增任务}----
   * @param {Object} task task
   * @returns {Promise} Promise
   */
  async insertTask(task){
    await Task.insertTask(task);
  },

  /**
   * ----{更新任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async updateTask(id, update){
    await Task.updateTask(id, update);
  },

  /**
   * ----{条件查询}----
   * @param {Object} condition condition
   * @returns {Promise} Promise
   */
  async findOneTaskByCondition(condition){
    return await Task.findOneTaskByCondition(condition);
  },

  /**
   * ----{更新任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async hideTaskById(id){
    const update = { isHidden: true };
    await Task.updateTask(id, update);
  },

  /**
   * ----{更新任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unhideTaskById(id){
    const update = { isHidden: false };
    await Task.updateTask(id, update);
  },

  /**
   * ----{归档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async archiveTaskById(id){
    const update = { isArchived: true };
    await Task.updateTask(id, update);
  },

  /**
   * ----{解档任务}----
   * @param {ObjectId} id id
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async unarchiveTaskById(id){
    const update = { isArchived: false };
    await Task.updateTask(id, update);
  },

  /**
   * ----{批量隐藏任务}----
   * @param {Object} condition condition
   * @param {Object} update update
   * @returns {Promise} Promise
   */
  async hideTasksByCondition(condition){
    const update = { isHidden: true };
    const options = { multi: true };
    await Task.updateTasksByCondition(condition, update, options);
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

  /**
   * ----{批量设置任务projectId}----
   * @param {Object} condition condition
   * @param {String} projectId projectId
   * @param {Object} options options
   * @returns {Promise} Promise
   */
  async setProjectIdByCondition(condition, projectId){
    const update = { projectId: projectId };
    const options = { multi: true };
    await Task.updateTasksByCondition(condition, update, options);
  },

}
