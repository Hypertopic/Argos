function(head, req) {
  send('<entity>\n');
  while (r = getRow()) {
    if (r.value.name) {
      send('<attribute name="name" value="' + r.value.name + '"/>\n'); 
    }
    if (r.value.item) {
      send('<relatedEntity relationType="partOf" href="');
      send(r.value.item.id);
      send('">');
      if (r.value.item.name) {
        send(r.value.item.name);
      }
      send('</relatedEntity>\n');
    }
  }
  send('</entity>\n');
}
