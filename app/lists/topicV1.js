function(head, req) {
  var util = require("lib/util");

  start({
      "headers": {
        "Content-Type": "text/xml"
       }
    });
  function format(array) {
    var result = array[0];
    for (var i=1; i<array.length; i++) {
      result += "+";
      result += array[i];
    }
    return result;
  }

  var name;
  var broader = [];
  var narrower = [];
  var items = [];
  var highlights = [];
  while (r = getRow()) {
    var currentName = r.value.name;
    if (!name && currentName) {
      name = currentName;
    }
    if (r.value.broader) {
      broader.push(r.value.broader);
    }
    if (r.value.narrower) {
      narrower.push(r.value.narrower);
    }
    if (r.value.item) {
      items.push(r.value.item);
    }
    if (r.value.highlight) {
      highlights.push(r.value.highlight);
    }
  }
  send('<topic name="'+util.xmlencode(name)+'">\n');
  for (let b of broader) {
    send('<relatedTopic href="'+b.id+'" relationType="includedIn">');
    send(b.name);
    send('</relatedTopic>\n');
  }
  for (let n of narrower) {
    send('<relatedTopic href="'+n.id+'" relationType="includes">');
    send(n.name);
    send('</relatedTopic>\n');
  }
  for (let i of items) {
    send('<entity href="../../../entity/'+util.urlencode(i.corpus)+"/"+i.id+'"/>\n');
  }
  for (let h of Object.values(highlights)) {
    send('<entity href="../../../entity/'+util.urlencode(h.corpus)+"/"+h.item+"/");
    send(format(h.coordinates)+'">');
    send(util.xmlencode(h.text));
    send('</entity>\n');
  }
  send('</topic>\n');
}
