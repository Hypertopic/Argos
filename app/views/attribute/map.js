function(o) {

  function isReserved(key) {
    switch (key) {
      case "_id":
      case "_rev":
      case "_attachments":
      case "_deleted_conflicts":
      case "_conflicts":
      case "couchapp":
      case "item_corpus":
      case "item_name":
      case "thumbnail":
      case "resource":
      case "items":
      case "topics":
      case "record":
      case "highlights": return true;
    }
    return false;
  }

  if (o.item_corpus) { //item
    for (key in o) {
      if (!isReserved(key)) {
        value = o[key];
        if (typeof value=="string") {
          emit(
            [o.item_corpus, key, value], 
            {item:{id:o._id, name: o.item_name}}
          );
        } else {
          for each (v in value) {
            emit(
              [o.item_corpus, key, v], 
              {item:{id:o._id, name: o.item_name}}
            );
          }
        }
      }
    }
  }
}
