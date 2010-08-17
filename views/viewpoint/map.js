function(o) {
  if (o.viewpoint_name) {
    //viewpoint name
    emit([o._id], {name:o.viewpoint_name});
    //viewpoint users
    for each (var u in o.users) {
      emit([o._id], {user:u});
    }
    //topics
    const topics = o.topics;
    for (var t in topics) {
      //topic name
      emit([o._id, t], {name:topics[t].name});
      //topic links
      var broader = topics[t].broader;
      if (broader==null || broader.length==0) {
        emit([o._id], {upper:{id:t, name:topics[t].name}});
      } else for each(b in broader) {
	emit([o._id, t], {broader: {id:b, name:topics[b].name}});
	emit([o._id, b], {narrower: {id:t, name:topics[t].name}});
      }
    }
  } else if (o.item_corpus) {
    //topic items
    for (var t in o.topics) {
      emit([
        o.topics[t].viewpoint, 
        t
      ], {item:{
        corpus:o.item_corpus, 
        id:o._id, 
        thumbnail:o.thumbnail,
        name:o.item_name
      }});
    }
    //topic highlights
    for (var h in o.highlights) {
      var highlight = o.highlights[h];
      emit([
        highlight.viewpoint,
        highlight.topic
      ], {highlight:{
        id: h,
        corpus: o.item_corpus,
        item: o._id,
        coordinates: highlight.coordinates,
        thumbnail: highlight.thumbnail,
        text: highlight.text
      }});
    }
  }
}
