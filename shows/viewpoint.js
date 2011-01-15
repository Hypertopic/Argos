function(doc, req) {
  var utf8 = require("lib/utf8");
  function enc(str)
  {
    return utf8.utf8Encode(str);
  }
  function dec(str)
  {
    return str.replace(/\[\[\[__AND___\]\]\]/ig, "&");
  }
  var xmlDoc = new XML('<map></map>');
  xmlDoc.@version = "0.9.0";
  xmlDoc.appendChild(<attribute_registry SHOW_ATTRIBUTES="hide"/>);
  var root 
    = <node ID={doc._id} text={enc(doc.viewpoint_name)}/>;
  root.appendChild(<attribute NAME="REVISION" VALUE={doc._rev}/>);
  if(doc.users)
    for(var i=0, user; user = doc.users[i]; i++)
      root.appendChild(
        <attribute NAME="USER" VALUE={enc(user)}/>);
  xmlDoc.appendChild(root);

  var uppers = [];
  for(var id in doc.topics){
    if(!doc.topics[id].broader || doc.topics[id].broader.length == 0)
      uppers.push(id);
    if(doc.topics[id].broader)
      for(var i=0, parentId; parentId = doc.topics[id].broader[i]; i++)
        (doc.topics[parentId].narrower) 
          ? doc.topics[parentId].narrower.push(id)
          : doc.topics[parentId].narrower = [id];
    if(!doc.topics[id].narrower) 
      doc.topics[id].narrower = [];
    
    doc.topics[id].xmlNode 
      = <node ID={id} TEXT={enc(doc.topics[id].name)} />;
  }
  
  //log(uppers);
  function appendSubTopics(id){
    for(var i=0, tid; tid = doc.topics[id].narrower[i]; i++)
    {
      if(doc.topics[tid].xmlNode)
      {
        appendSubTopics(tid);
        doc.topics[id].xmlNode.appendChild(doc.topics[tid].xmlNode);
        delete doc.topics[tid].xmlNode;
      }
      else
        doc.topics[id].xmlNode.appendChild(<arrowlink DESTINATION={tid} />);
    }
  }
  
  for(var i=0, id; id = uppers[i]; i++)
  {
    appendSubTopics(id);
    root.appendChild(doc.topics[id].xmlNode);
  }
  var xmlStr = dec(xmlDoc.toXMLString());
  if(req.query.download)
  {
    filename = encodeURIComponent(doc.viewpoint_name) + ".mm";
    return {
        body : xmlStr,
        headers : { 
          "Content-Type" : "application/xml",
          "Content-Disposition" : "attachment; filename=" + filename + ";" 
        }
    }
  }
  else
    return {
        body : xmlStr,
        headers : { "Content-Type" : "application/xml" }
    }
};