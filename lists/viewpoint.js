function(head, req) {
  var name;
  var topics =[];
  while (r = getRow()) {
    var currentName = r.value.name;
    if (!name && currentName) {
      name = currentName;
    }
    var upper = r.value.upper;
    if (upper) {
      topics.push(upper);
    }
  }
  send('<viewpoint name="'+name+'">\n');
  for each (t in topics) {
    send('<topic href="topic/'+t.id+'">'+t.name+'</topic>\n');
  }
  send('</viewpoint>\n');
}
