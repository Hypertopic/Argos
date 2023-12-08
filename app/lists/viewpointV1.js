function(head, req) {
  start({
      "headers": {
        "Content-Type": "text/xml"
       }
    });
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
  for (let t of Object.values(topics)) {
    send('<topic href="topic/'+t.id+'">'+t.name+'</topic>\n');
  }
  send('</viewpoint>\n');
}
