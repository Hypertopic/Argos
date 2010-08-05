function(o) {

  function toArray(coord) {
    result = [];
    for each (c in coord.split("-")) {
      result.push(parseInt(c));
    }
    return result;
  }

  if (o.corpus_name) { //corpus
    //corpus name
    emit([o._id], {name:o.corpus_name});
    //corpus users
    for each (u in o.users) {
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
    topics = o.topics;
    for (v in topics) {
      for each (t in topics[v]) {
        emit([o.item_corpus, o._id], {viewpoint:v, topic:t});
      }
    }
    //item fragments
    fragments = o.fragments;
    for (coord in fragments) {
      f = fragments[coord];
      topics = f.topics;
      for (v in topics) {
        for each (t in topics[v]) {
          emit(
            [o.item_corpus,o._id].concat(toArray(coord)), 
            {highlight:{
              viewpoint:v,
              topic:t,
              thumbnail:f.thumbnail,
              text:f.text
            }}
          );
        }
      }
    }
  }
}
