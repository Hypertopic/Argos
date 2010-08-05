function(o) {
  if (o.item_corpus) {
          emit([o.resource], {corpus:o.item_corpus, item:o._id});
  }
}
