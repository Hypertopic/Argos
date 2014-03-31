exports.Viewpoint = function(o) {

  this.data = {
    topics: {},
    upper: [],
    users: []
  };

  this.addRow = function(key, value) {
    var subject = key[key.length-1];
    var predicate = Object.keys(value)[0];
    if (!predicate) {
      this.data.topics[subject] = {};
    } else {
      var object = value[predicate];
      if (key.length==2) {
        if (!this.data.topics[subject]) {
          this.data.topics[subject] = {};
        }
        if (!this.data.topics[subject][predicate]) {
          this.data.topics[subject][predicate] = [];
        }
        this.data.topics[subject][predicate].push(object);
      } else {
        switch (predicate) {
          case "name":
            this.data._id = subject;
            this.data.viewpoint_name = object;
            break;
          case "upper":
            this.data.upper.push(object);
            break;
          case "user":
            this.data.users.push(object);
        }
      }
    }
  }

  this.bind = function(id) {
    this.data.topics[id].bound = true;
  }

  this.sendHtmlNode = function(node) {
    var node = this.data.topics[node.id];
    send('<li class="topic'
      + ((node.bound)?' bound':'')
      + '">' + node.name + '<ul>');
    for each (var child in node.narrower) {
      this.sendHtmlNode(child);
    }
    send("</ul></li>");
  }

  this.sendHTML = function() {
    send("<section>");
    send("<h1>" + this.data.viewpoint_name +"</h1><ul>");
    for each (var upper in this.data.upper) {
      this.sendHtmlNode(upper);
    }
    send("</ul>");
    send("</section>");
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
    send("<section>");
    send('<table>');
    for each (var a in this.attributes) {
      send('<tr><th>' + a[0] + '</th><td>' + a[1] + '</td></tr>');
    }
    send('</table>');
    send('<style type="text/css">.bound {font-weight: bold}</style>');
    for each (var v in this.viewpoints) {
      v.sendHTML();
    }
    send("</section>");
  }
}

exports.User = function(login) {
  this.login = login;
  this.viewpoints = [];
  this.addViewpoint = function(v) {
    this.viewpoints.push(new exports.Viewpoint(v));
  }
  this.sendHTML = function() {
    send('<section><h1>' + this.login + '</h1>');
    for each (var v in this.viewpoints) {
      v.sendHTML();
    }
    send('</section>');
  }
}
