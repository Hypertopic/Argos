function(head, req) {

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
  send('<topic name="'+name+'">\n');
  for each (b in broader) {
    send('<relatedTopic href="'+b.id+'" relationType="includedIn">');
    send(b.name);
    send('</relatedTopic>\n');
  }
  for each (n in narrower) {
    send('<relatedTopic href="'+n.id+'" relationType="includes">');
    send(n.name);
    send('</relatedTopic>\n');
  }
  for each (i in items) {
    send('<entity href="../../../entity/'+i.corpus+"/"+i.id+'">');
    send(i.name);
    send('</entity>\n');
  }
  for each (h in highlights) {
    send('<entity href="../../../entity/'+h.corpus+"/"+h.item+"/");
    send(format(h.coordinates)+'">');
    send(h.text);
    send('</entity>\n');
  }
  send('</topic>\n');
}
