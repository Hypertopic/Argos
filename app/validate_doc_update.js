function (newDoc, oldDoc, userCtx, secObj) {

  if (userCtx.roles.indexOf('_admin') !== -1) {
    return true; // user is a server admin (or in "anonymous party" mode)
  }

  if (!userCtx.name) {
    throw({unauthorized: 'Please log in first.'});
  }

  //Validation for viewpoint, topics in viewpoint should be a DAG
  if(newDoc.viewpoint_name){
    if(!newDoc.topics) return true;
    var viewpoint = require("lib/viewpoint");
    if (!viewpoint.topologicalSort(newDoc.topics)) {
      throw({
        forbidden: 'There is a cycle in the viewpoint between topics!'
      });
    }
  }
}
