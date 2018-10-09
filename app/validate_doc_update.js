function (newDoc, oldDoc, userCtx, secObj) {
  var v = require("lib/validate").init(newDoc, oldDoc, userCtx, secObj);

  if (!userCtx.name) {
    v.unauthorized("Please log in first.");
  }

  //Validation for viewpoint, topics in viewpoint should be a DAG
  if(newDoc.viewpoint_name){
    if(!newDoc.topics) return true;
    var viewpoint = require("lib/viewpoint");
    var sorted = viewpoint.topologicalSort(newDoc.topics);
    v.assert(sorted, "There is a cycle in the viewpoint between topics!");
    return true;
  }
}
