function(o) {
  if (o.viewpoint_name) {
    var entry = {};
    //viewpoint name
    entry["name"] = o.viewpoint_name;
    //viewpoint users
    entry["user"] = o.users;
    //topics
    const topics = o.topics;
    entry["upper"] = [];
    for (var t in topics) {
      var entry_t = {};
      var broaderArray = [];
      //topic name
      entry_t["name"] = topics[t].name;
      //topic links
      var broader = topics[t].broader;
      if (broader==null || broader.length==0) {
        entry["upper"].push({
          id:t,
          name:topics[t].name
        });
      } else for each(b in broader) {
        broaderArray.push({
          id:b,
          name:topics[b].name
        });
        emit([o._id, b], {narrower: {id:t, name:topics[t].name}});
      }
      if (broaderArray.length > 0)
        entry_t["broader"] = broaderArray;
      emit([o._id, t], entry_t)
    }
    emit([o._id], entry);
  }
}
