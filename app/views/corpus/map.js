function(o) {

  function isReserved(key) {
    switch (key) {
      case "_id":
      case "_rev": 
      case "_deleted_conflicts":
      case "_conflicts":
      case "couchapp":
      case "item_corpus":
      case "item_name":
      case "items":
      case "topics":
      case "highlights": return true;
    }
    return false;
  }

  if (o.corpus_name) { //corpus
    var entry = {};
    //corpus name
    entry["name"] = o.corpus_name;
    //corpus users
    entry["user"] = o.users;

    emit([o._id], entry);
  } else if (o.item_corpus) { //item
    //item name, thumbnail and resource
    var entry = {
      name:o.item_name
    };
    //item topics
    entry["topic"] = [];
    for (var t in o.topics) {
      var viewpoint_id = o.topics[t].viewpoint;
      entry["topic"].push({
        viewpoint: viewpoint_id,
        id: t
      });
    }
    //item-bound items
    entry["item"] = o.items;
    for (var i in o.items) {
      var item = o.items[i];
      emit([item.corpus, item.id], {
        item: {
          corpus:o.item_corpus,
          id: o._id,
          relation: item.relation,
          reverse: true
        }
      });
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
        entry[key] = o[key];
      }
    }
    emit([o.item_corpus, o._id], entry);
  }
}
