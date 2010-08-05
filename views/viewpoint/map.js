function(o) {

  function toArray(coord) {
    result = [];
    for each (c in coord.split("-")) {
      result.push(parseInt(c));
    }
    return result;
  }

  if (o.viewpoint_name) {
    //viewpoint name
    emit([o._id], {name:o.viewpoint_name});
    //viewpoint users
    for each (u in o.users) {
      emit([o._id], {user:u});
    }
    //topics
    topics = o.topics;
    for (t in topics) {
      //topic name
      emit([o._id, t], {name:topics[t].name});
      //topic links
      broader = topics[t].broader;
      if (broader==null || broader.length==0) {
        emit([o._id], {upper:t});
      } else for each(b in broader) {
	emit([o._id, t], {broader: {id:b, name:topics[b].name}});
	emit([o._id, b], {narrower: {id:t, name:topics[t].name}});
      }
    }
  } else if (o.item_corpus) {
    //topic items
    topics = o.topics;
    for (v in topics) {
      for each (t in topics[v]) {
        emit([v,t], {item:{
          corpus:o.item_corpus, 
          id:o._id, 
          thumbnail:o.thumbnail,
          name:o.item_name
        }});
      }
    }
    //topic fragments
    fragments = o.fragments;
    for (coord in fragments) {
      f = fragments[coord];
      topics = f.topics;
      for (v in topics) {
        for each (t in topics[v]) {
          emit([v,t], {fragment:{
            corpus:o.item_corpus,
            item:o._id,
            coordinates:toArray(coord),
            thumbnail:f.thumbnail,
            text:f.text
          }});
        }
      }
    }
  }
}
