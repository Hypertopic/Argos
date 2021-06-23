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
      var i=0;
      var topic="";
      for (var t in row.doc.topics){
        topic+=t+", ";
      }
      send(''.concat(
      '<item>',
      '<title>' + row.doc.item_name + '</title>',
      '<description> Lieu : ' + row.doc.spatial + ' Créé le : ' + row.doc.created  + ' Catégorie(s) : ' + topic + '</description>',
      '<link>' + uri + '/item/' + row.doc.item_corpus + '/' + row.id + '</link>',
      '</item>'
    ));
  }
  send('</channel></rss>');
}
