function(o) {
  if (o.item_corpus) {
    emit([o.item_corpus], {item:{id:o._id, name:o.item_name}});
  } else if (o.corpus_name) {
    emit([o._id], {name:o.corpus_name});
  }
}
