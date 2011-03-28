function(head, req) {
  start({
      "headers": {
        "Content-Type": "text/xml"
       }
    });
  send('<actors>\n');
  while (r = getRow()) {
    if (r.key) {
      send('<actor href="'+r.key+'/">'+r.key+'</actor>\n');
    }
  }
  send('</actors>\n');
}
