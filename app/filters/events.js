function(doc, req) {
  return ((doc.item_corpus && (doc.item_corpus === req.query.corpus)) || (doc.viewpoint_name && req.query.viewpoint && (req.query.viewpoint.indexOf(doc._id) > -1)));
}
