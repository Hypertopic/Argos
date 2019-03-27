function (newDoc, oldDoc, userCtx, secObj) {

  var includes = function(list, element) {
    return list.indexOf(element) !== -1;
  }

  if (includes(userCtx.roles, '_admin')) {
    return true; // user is a server admin (or in "anonymous party" mode)
  }

  if (!userCtx.name) {
    throw({unauthorized: 'Please log in first.'});
  }

  if (oldDoc && oldDoc.contributors && !includes(oldDoc.contributors, userCtx.name)) {
    throw({
      unauthorized: userCtx.name + ' is not authorized to edit this document!'
    });
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
