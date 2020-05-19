function (o) {
  if (o.viewpoint_name) {
    emit('viewpoints', 1);
    if (o.topics) {
      emit('viewpoints-with-topics', 1);
      emit('topics', Object.keys(o.topics).length);
    };
  } else if (o.corpus_name) {
    emit('corpora', 1);
  } else if (o.item_name !== undefined) {
    emit('items', 1);
    if (o.topics) {
      emit('items-with-topics', 1);
      emit('topics-on-items', Object.keys(o.topics).length);
    };
    if (o.highlights) {
      emit('items-with-highlights', 1);
      emit('topics-on-fragments', Object.keys(o.highlights).length);
    }
  }
}
