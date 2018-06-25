export default {
  getTasksLevel(nodes){
    if(!nodes.length) {
      return 0;
    }
    let max = nodes[0].level;
    for(let i = 1; i < nodes.length; i++){
      if( max <= nodes[i].level){
        max = nodes[i].level;
      }
    }
    return max;
  },

  contains(arr, obj) {
    // TB 父节点 id  为子节点ancestorIds 第一个
    if (arr[0] === obj) {
      return true;
    }
    return false;
  },

  getTaskTree(root, nodes){
    const level = this.getTasksLevel(nodes);
    console.log('level', level);
    const group = new Array();
    for(let i = 0; i <= level - 1; i ++) {
      let object = {};
      object.children = [];
      group.push(object);
    }

    for(let node of nodes) {
      let level = node.level;
      group[level-1].children.push(node);
    }
    for(let i = level - 1; i >= 1; i --) {
      let subTasks = group[i].children;
      let parentTasks = group[i-1].children;
      for(let subTask of subTasks) {
        for(let parentTask of parentTasks) {
          if(this.contains(subTask.ancestorIds, parentTask.id)){
            parentTask.children.push(subTask);
          }
        }
      }
    }
    const tasksLevelOne = group[0].children;
    for(let node of tasksLevelOne) {
      root.children.push(node);
    }
    return root;
  }
}
