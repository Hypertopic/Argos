function() {
  provides('json', function() {
    var docs = [];
    while (r = getRow()) {
      docs.push({
        _id: r.doc._id,
        _rev: r.doc._rev,
        _deleted: true
      });
    }
    send(JSON.stringify({docs: docs}));
  });
}
