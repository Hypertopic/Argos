function(o) {
  for (let u of o.users) {
    if (o.viewpoint_name) {
      emit([u], {viewpoint:{id:o._id, name:o.viewpoint_name}});
    } else if (o.corpus_name) {
      emit([u], {corpus:{id:o._id, name:o.corpus_name}});
    }
  }
}
