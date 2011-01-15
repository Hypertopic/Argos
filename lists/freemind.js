function(head, req) {
  provides("xml", function() {
    var xml = new XML('<map></map>');
    xml.@version = "0.9.0";
    var doc = {"rows": []};
    while (r = getRow())
      doc.rows.push(r);
    var viewpoint = require("lib/util").normalize(doc);
    var viewpointID;
    for(viewpointID in viewpoint)
      break;
    viewpoint = viewpoint[viewpointID];
    var root = <node ID={viewpointID} text={viewpoint.name} />;
    xml.appendChild(root);
    
    delete viewpoint.name;
    delete viewpoint.user;
    var uppers = [];
    for(var i=0, upper; upper = viewpoint.upper[i]; i++){
      uppers.push(upper.id);
      root.appendChild(<node ID={upper.id} text={upper.name} />);
    }
    
    send(xml);
  });
  provides("html", function() {
    send("<h3>Export viewpoint to Freemind</h3>");
    send("<p>You can dump a viewpoint to a freemind.</p>");
    send("<p>" + JSON.stringify(head) + "</p>");
  });
  provides("json", function() {
    var doc = {"rows": []};
    while (r = getRow())
      doc.rows.push(r);
    var docFormated = require("lib/util").normalize(doc);
    send(JSON.stringify(docFormated));
  });
};