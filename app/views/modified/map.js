function (doc) {
  if (doc.item_corpus && doc.record.modified) {
    emit([doc.item_corpus, doc.record.modified]);
    if(doc.topics && doc.record.modified){
      for (var t in doc.topics){
        emit([t, doc.record.modified]);
      }
    }
  }
}