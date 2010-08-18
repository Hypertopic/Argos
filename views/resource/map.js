function(o) {
  if (o.item_corpus) {
          emit([o.resource], {item:{corpus:o.item_corpus, id:o._id}});
  }
}
