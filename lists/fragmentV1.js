function(head, req) {
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

  send('<entity>\n');
  while (r = getRow()) {
    send('<attribute name="name" value="');
    send(r.value.text.replace(/"/g, "&quot;"));
    send('"/>\n'); 
    send('<topic href="');
    send('../../../viewpoint/');
    send(r.value.viewpoint);
    send('/topic/');
    send(r.value.topic);
    send('"/>\n');
    send('<resource name="highlight" href="');
    send(r.value.resource);
    send('#');
    send(format(r.value.coordinates));
    send('"/>\n');
  }
  send('</entity>\n');
}
