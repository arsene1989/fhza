import mongoose from 'mongoose';
// 任务工时
const Schema = mongoose.Schema;
const scheme = new Schema({
  // 任务名称
  name: { type: String },
  // 是否显示
  isHidden: { type: Boolean, default: false },
  // 是否归档
  isArchived: { type: Boolean, default: false },
  // 部门组织
  organizationId: { type: String, index: true },
  // 部门组织
  organizationName: { type: String, index: true },
  // 项目Id
  projectId: { type: String, index: true },
  // 项目名称
  projectName: { type: String, index: true },
  // 任务ID
  taskId: { type: String, index: true },
  // 任务类型
  type: { type: String, index: true },
  // 层级
  level: { type: Number },
  // 开始时间
  startDate: { type: Date },
  // 截止时间
  dueDate: { type: Date },
  // 开始时间(计时操作中使用)
  tempStartDate: { type: Date },
  // 截止时间(计时操作中使用)
  tempDueDate: { type: Date },
  // 工时统计,单位秒
  duration: { type: Number },
  // 执行者Id
  executorId: { type: String, index: true },
  // 执行者姓名
  executorName: { type: String, index: true },
  // 状态 0 未开始 1 进行中 2 已暂停 3 已结束
  status: { type: Number },
  // 分段记录
  // records: [{ startDate: Date, : Date, duration: Number }]
});

export default mongoose.model('workTime', scheme);
