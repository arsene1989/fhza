import mongoose from 'mongoose';
// 任务
const Schema = mongoose.Schema;
const scheme = new Schema({
  // 任务名称
  name: { type: String },
  // 父节点
  parent: { type: String, default: null },
  // 是否显示
  isHidden: { type: Boolean, default: false },
  // 是否归档
  isArchived: { type: Boolean, default: false },
  // 项目Id
  projectId: { type: String, index: true },
  // 任务ID
  taskId: { type: String, index: true },
  // 层级
  level: { type: Number },
  // 是否完成
  isDone: { type: Boolean, default: false },
  // 0 normal 1 high 2 urgent
  priority: { type: Number },
  // 进度
  progress: { type: Number }
});

export default mongoose.model('task', scheme);
