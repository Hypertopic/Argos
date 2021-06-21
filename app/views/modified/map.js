function (doc) {
	if(doc.item_corpus && doc.record.modified){
		emit([doc.item_corpus, doc.record.modified]);
	}
}
