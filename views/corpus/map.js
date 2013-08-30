function(o) {

  function isReserved(key) {
    switch (key) {
      case "_id":
      case "_rev": 
      case "item_corpus":
      case "item_name":
      case "thumbnail":
      case "resource":
      case "topics":
      case "highlights": return true;
    }
    return false;
  }

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
      var viewpoint_id = o.topics[t].viewpoint;
      emit([o.item_corpus, o._id], {topic:{
        viewpoint: viewpoint_id,
        id: t
      }, _id: viewpoint_id});
    }
    //item highlights
    for (var h in o.highlights) {
      var highlight = o.highlights[h];
      emit(
        [o.item_corpus, o._id, h], {
          coordinates: highlight.coordinates,
          topic: {
            viewpoint: highlight.viewpoint,
            id: highlight.topic
          },
          thumbnail: highlight.thumbnail,
          text: highlight.text
        }
      );
    }
    //item attributes
    for (var key in o) {
      if (!isReserved(key)) {
        var entry = {};
        entry[key] = o[key];
        emit([o.item_corpus, o._id], entry);
      }
    }
  }
}
