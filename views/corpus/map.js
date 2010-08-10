function(o) {
  if (o.corpus_name) { //corpus
    //corpus name
    emit([o._id], {name:o.corpus_name});
    //corpus users
    for each (var u in o.users) {
      emit([o._id], {user:u});
    }
  } else if (o.item_corpus) { //item
    //item name, thumbnail and resource
    emit([o.item_corpus, o._id], {
      name:o.item_name,
      thumbnail:o.thumbnail,
      resource:o.resource
    });
    //item topics
    for (var t in o.topics) {
      emit([o.item_corpus, o._id], {
        viewpoint: o.topics[t].viewpoint, 
        topic: t
      });
    }
    //item highlights
    for (var h in o.highlights) {
      var highlight = o.highlights[h];
      emit(
        [o.item_corpus,o._id].concat(highlight.coordinates),
        {highlight:{
          id: h,
          viewpoint: highlight.viewpoint,
          topic: highlight.topic,
          thumbnail: highlight.thumbnail,
          text: highlight.text
        }}
      );
    }
  }
}
