function(o) {
  for each (u in o.users) {
    if (o.viewpoint_name) {
      emit([u], {viewpoint:{id:o._id, name:o.viewpoint_name}, _id:o._id});
    } else if (o.corpus_name) {
      emit([u], {corpus:{id:o._id, name:o.corpus_name}});
    }
  }
}
