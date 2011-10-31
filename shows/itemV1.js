function(o, req) {

  function xmlencode(string) {
    return string.replace(/\&/g,'&'+'amp;').replace(/</g,'&'+'lt;');
  }

  send('<entity>\n');
  for (var key in o) {
    if (key[0]!='_') {
      switch (key) {
        case 'item_corpus':
          break;
        case 'highlights':
          // Argos v1 didn't implement item relations to fragments
          break;
        case 'item_name':
          send('<attribute name="name" value="');
          send(o.item_name);
          send('"/>\n');
          break;
        case 'resource':
          send('<resource name="source" href="');
          send(xmlencode(o.resource));
          send('"/>\n');
          if (o.resource.indexOf('picture')>=0) {
            send('<resource name="thumbnail" href="');
            send(o.resource.replace("picture", "thumbnail"));
            send('"/>\n');
          }
          break;
        case 'topics':
          var topics = o.topics;
          for (var t in topics) {
            send('<topic href="../../viewpoint/');
            send(topics[t].viewpoint);
            send('/topic/');
            send(t);
            send('"/>\n');
          }
          break;
        default:
          send('<attribute name="');
          send(key);
          send('" value="');
          send(o[key]);
          send('"/>\n');
      }
    }
  }
  send('</entity>\n');
}
