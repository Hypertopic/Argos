exports.topologicalSort = function(topics) {
  var sorted = [];
  do{
    var foundVertex = false,
        count = 0;
    for(var topicID in topics)
    {
      if(topics[topicID].broader && topics[topicID].broader.length == 0)
      {
        //print(topicID);
        foundVertex = true;
        sorted.push(topicID);
        //remove the vertex from graph
        delete topics[topicID];
        //remove the edge from graph
        for(var t in topics)
          if(topics[t].broader && topics[t].broader.indexOf(topicID) >= 0)
            topics[t].broader.splice(
                          topics[t].broader.indexOf(topicID), 1);
        //print(JSON.stringify(topics));
      }
      count++;
    }
  }while(count > 0 && foundVertex)
  
  return (count > 0) ? false : sorted;
}