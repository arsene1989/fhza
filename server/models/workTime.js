import mongoose from 'mongoose';
// 任务
const Schema = mongoose.Schema;
const scheme = new Schema({
  // 任务名称
  name: { type: String },
  // 父任务
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
  // 开始时间
  startDate: { type: Date },
  // 截止时间
  endDate: { type: Date },
  // 工时统计
  workTime: { type: Number },
  // 
  executorId: { type: Schema.Types.ObjectId },
});

export default mongoose.model('workTime', scheme);
