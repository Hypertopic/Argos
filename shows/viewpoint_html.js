function (o, req) {
  function Tree() {
    this.data = o;
    this.data.upper = [];
    for (var t in o.topics) {
      var topic = this.data.topics[t];
      if (!topic.broader || topic.boader==[]) {
        this.data.upper.push(t);
      }
      for each (var b in topic.broader) {
        var broader = this.data.topics[b];
        if (!broader.narrower) {
          broader.narrower = [];
        }
        broader.narrower.push(t);
      }
    }
    this.sendHtmlNode = function(id) {
      var node = this.data.topics[id];
      send("<li>" + node.name + "<ul>");
      for each (var child in node.narrower) {
        this.sendHtmlNode(child);
      }
      send("</ul></li>");
    }
    this.sendHtml = function() {
      send("<h1>" + this.data.viewpoint_name +"</h1><ul>");
      for each (upper in this.data.upper) {
        this.sendHtmlNode(upper);
      }
      send("</ul>");
    }
  }

  var tree = new Tree();
  tree.sendHtml();
}
