function (head, req) {
  start({
    'headers': {
      'Content-Type': 'text/xml'
    }
  });
  uri = req.query.app;
  send('<rss><channel><title>' + req.query.startkey + '</title><link>');
  send(uri);
  send('</link><description>Created or updated items.</description>');
  while(row = getRow()){
    send(''.concat(
      '<item>',
      '<title>' + row.doc.item_name + '</title>',
      '<description>Lieu : ' + row.doc.spatial + ' créé le ' + row.doc.created + '</description>',
      '<link>' + uri + '/item/' + row.doc.item_corpus + '/' + row.id + '</link>',
      '</item>'
    ));
  }
  send('</channel></rss>');
}
