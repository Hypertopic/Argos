function(head, req) {
  var util = require("lib/util");

  start({
      "headers": {
        "Content-Type": "text/xml"
       }
    });
  send('<entity>\n');
  while (r = getRow()) {
    if (r.value.name) {
      send('<attribute name="name" value="' + util.xmlencode(r.value.name) + '"/>\n');
    }
    if (r.value.item) {
      send('<relatedEntity relationType="partOf" href="');
      send(r.value.item.id);
      send('">');
      if (r.value.item.name) {
        send(util.xmlencode(r.value.item.name));
      }
      send('</relatedEntity>\n');
    }
  }
  send('</entity>\n');
}
