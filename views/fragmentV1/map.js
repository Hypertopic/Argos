function(o) {

  function format(array) {
    var result = array[0];
    for (var i=1; i<array.length; i++) {
      result += " ";
      result += array[i];
    }
    return result;
  }

  for each (h in o.highlights) {
    emit([o._id, format(h.coordinates)],  {
      text: h.text,
      viewpoint: h.viewpoint,
      topic: h.topic,
      resource: o.resource,
      coordinates: h.coordinates
    });
  }
}
