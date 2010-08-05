function(o) {
  if (o.item_corpus) {
    for (key in o) {
      if (key.indexOf("_")==-1) {
        value = o[key];
        if (
          typeof value=="string" 
          && value.length>0 
          && value.indexOf("http://")!=0
        ){
          emit(
            [o.item_corpus, key, value], 
            {item:{id:o._id, name: o.item_name}}
          );
        }
      }
    }
  }
}
