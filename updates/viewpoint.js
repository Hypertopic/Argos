function(doc, req) {
  // !code helpers/md5.js
  
  function serializeId(id){
      return (id.indexOf("ID_") == 0) ? hex_md5(id) : id;
  }
  function appendSubTopics(node){
    var id = serializeId(node.@ID.toString());
    log(node.@TEXT.toString());
    if(!(id in viewpoint.topics)) 
      viewpoint.topics[id] = { 
        "name": node.@TEXT.toString(), "broader": []
      };
    else
      if(!viewpoint.topics[id].name)
        viewpoint.topics[id].name = node.@TEXT.toString();
    for each(var childNode in node.node)
    {
      var childId = serializeId(childNode.@ID.toString());

      if(!(childId in viewpoint.topics))
        viewpoint.topics[childId] = { 
          "name": childNode.@TEXT.toString(), "broader": []
        };
      else
        if(!viewpoint.topics[childId].name)
          viewpoint.topics[childId].name = childNode.@TEXT.toString();
      viewpoint.topics[childId].broader.push(id);
    }

    for each(var linkNode in node.arrowlink)
    {
      var linkId = serializeId(linkNode.@DESTINATION.toString());
      if(linkId in viewpoint.topics)
        viewpoint.topics[linkId].broader.push(id);
      else
        viewpoint.topics[linkId] = { "broader": [id]};
    }
  }
  var freemind = new XML(req.body);
  var viewpoint={};
  viewpoint.viewpoint_name = freemind.node.@TEXT.toString();
  viewpoint._rev 
    = freemind.node.attribute.(@NAME == 'REVISION').@VALUE.toString();
  if(!viewpoint._rev) delete viewpoint._rev;

  for each(var attr in freemind.node.attribute.(@NAME == 'USER'))
    if(viewpoint.users) 
      viewpoint.users.push(attr.@VALUE.toString());
    else
      viewpoint.users = [attr.@VALUE.toString()]; 
  if(freemind.node.node.length() > 0){ 
    viewpoint.topics = {};
    for each(var node in freemind.node.node)
      appendSubTopics(node);
  }
  //Create new viewpoint
  if (!doc) {
    delete viewpoint._rev;
    viewpoint._id = req.uuid;
    var resp = JSON.stringify({"ok": true, "id": req.uuid});
    return [viewpoint, resp];
  }
  //Update viewpoint
  if(viewpoint._rev && doc._rev != viewpoint._rev) {
    var resp = JSON.stringify({
      "error":"conflict","reason":"Document update conflict."
    });
    return [null, resp];
  }
  var resp = JSON.stringify({"ok": true, "id": doc._id});
  viewpoint._id = doc._id;
  viewpoint._rev = doc._rev;
  return [viewpoint, resp];
}