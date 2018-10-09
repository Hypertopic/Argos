function(o) {
  if (o.item_corpus && o.resource) {
          emit([o.resource], {item:{corpus:o.item_corpus, id:o._id}});
  }
}
