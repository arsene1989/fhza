class TaskNode {
  constructor(id, name, level, ancestorIds) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.ancestorIds = ancestorIds;
    this.children = [];
  }
}

class Node {
  constructor(object) {
    this.taskId = object.taskId;
    this.name = object.name;
    this.level = object.level;
    this.projectId = object.projectId;
    this.parent = object.parent;
    this.isDone = object.isDone;
    this.priority = object.priority;
    this.progress = object.progress;
    this.children = [];
  }
}

export { TaskNode, Node }
