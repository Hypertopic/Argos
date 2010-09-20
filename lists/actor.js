function(head, req) {
  send('<actor name="'+req.query.user+'">\n');
  while (r = getRow()) {
    var v = r.value.viewpoint;
    if (v) {
      send('<viewpoint href="../viewpoint/'+v.id+'/">'+v.name+'</viewpoint>\n');
    }
  }
  send('</actor>\n');
}
