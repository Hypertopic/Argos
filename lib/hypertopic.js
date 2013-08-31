exports.Viewpoint = function(o) {
  this.data = o;
  this.data.upper = [];
  for (var t in o.topics) {
    var topic = this.data.topics[t];
    if (!topic.broader || topic.broader.length==0) {
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
  this.bind = function(id) {
    this.data.topics[id].bound = true;
  }
  this.sendHtmlNode = function(id) {
    var node = this.data.topics[id];
    send('<li class="topic'
      + ((node.bound)?' bound':'')
      + '">' + node.name + '<ul>');
    for each (var child in node.narrower) {
      this.sendHtmlNode(child);
    }
    send("</ul></li>");
  }
  this.sendHTML = function() {
    send("<h1>" + this.data.viewpoint_name +"</h1><ul>");
    for each (upper in this.data.upper) {
      this.sendHtmlNode(upper);
    }
    send("</ul>");
  }
  this.pushJsonRow = function(result, key, value) {
    result.rows.push({key:key, value:value});
  }
  this.sendJSON = function() {
    var result = {rows:[]};
    this.pushJsonRow(result, [this.data._id], {name:this.data.viewpoint_name});
    for each (var user in this.data.users) {
      this.pushJsonRow(result, [this.data._id], {user:user});
    }
    for each (var upper in this.data.upper) {
      this.pushJsonRow(result, [this.data._id], {upper:{
        id:upper, name:this.data.topics[upper].name
      }});
    }
    for (var topic_id in this.data.topics) {
      var topic = this.data.topics[topic_id];
      this.pushJsonRow(result, [this.data._id, topic_id], {name:topic.name});
      for each (var narrower in topic.narrower) {
        this.pushJsonRow(result, [this.data._id, topic_id], {narrower:{
          id:narrower, name:this.data.topics[narrower].name
        }});
      }
      for each (var broader in topic.broader) {
        this.pushJsonRow(result, [this.data._id, topic_id], {broader:{
          id:broader, name:this.data.topics[broader].name
        }});
      }
    }
    send(toJSON(result));
  }
}

exports.Item = function() {
  this.viewpoints = {};
  this.attributes = [];
  this.addTopic = function(viewpoint, t) {
    if (viewpoint) {
      var v = viewpoint._id;
      if (!this.viewpoints[v]) {
        this.viewpoints[v] = new exports.Viewpoint(viewpoint);
      }
      this.viewpoints[v].bind(t);
    }
  }
  this.addAttributes = function(object) {
    for (k in object) {
      this.attributes.push([k, object[k]]);
    }
  }
  this.sendHTML = function() {
    send('<table>');
    for each (var a in this.attributes) {
      send('<tr><th>' + a[0] + '</th><td>' + a[1] + '</td></tr>');
    }
    send('</table>');
    send('<style type="text/css">.bound {font-weight: bold}</style>');
    for each (var v in this.viewpoints) {
      v.sendHTML();
    }
  }
}
