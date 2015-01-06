exports.Viewpoint = function(o) {

  if (!o) {
    this.data = {
      topics: {},
      upper: [],
      users: []
    };
  } else {
    this.data = o;
    this.data.upper = [];
    for (var t in o.topics) {
      var topic = this.data.topics[t];
      if (!topic.broader || topic.broader.length==0) {
        this.data.upper.push({id:t});
      }
      for each (var b in topic.broader) {
        var broader = this.data.topics[b];
        if (!broader.narrower) {
          broader.narrower = [];
        }
        broader.narrower.push({id:t});
      }
    }
  }

  var util = require("lib/util");

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

  this.sendHtmlNode = function(id) {
    var node = this.data.topics[id];
    send('<li class="topic'
      + ((node.bound)?' bound':'')
      + '" id="' + id + '">' + node.name + '<ul>');
    for each (var child in node.narrower) {
      this.sendHtmlNode(child.id);
    }
    send("</ul></li>");
  }

  this.sendHTML = function() {
    send('<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>');
    send('<script src="/argos/_design/argos/_rewrite/included/jquery-agorae/jquery.agorae.js"></script>');
    send('<section class="viewpoint" id="' + this.data._id + '">');
    send("<h1>" + this.data.viewpoint_name +"</h1><ul>");
    for each (var upper in this.data.upper) {
      this.sendHtmlNode(upper.id);
    }
    send("</ul>");
    send("</section>");
  }

  this.sendFreemindNode = function(id) {
    var node = this.data.topics[id];
    send('<node TEXT="' + util.xmlencode(node.name)
      + '" ID="' + id + '">');
    for each (var child in node.narrower) {
      this.sendFreemindNode(child.id);
    }
    send('</node>');
  }

  this.sendFreemind = function() {
    start({headers:{
      "Content-Type": "application/x-freemind",
      "Content-Disposition": "attachment; filename="
        + this.data.viewpoint_name.replace(/[ ,]/g, "_") + ".mm;"
    }});
    send('<map version="1.0.0">');
    send('<!-- To be opened with http://freemind.sourceforge.net/ -->');
    send('<node TEXT="' + util.xmlencode(this.data.viewpoint_name)
      + '" ID="' + this.data._id + '">');
    for each (var upper in this.data.upper) {
      this.sendFreemindNode(upper.id);
    }
    send('</node>');
    send('</map>');
  }
}

exports.Item = function(corpus, item) {
  this.id = item;
  this.corpus = corpus;
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
    send('<section class="item" id="' + this.id +'" data-corpus="'
      + this.corpus + '">');
    send('<table>');
    for each (var a in this.attributes) {
      send('<tr><th>' + a[0] + '</th><td>' + a[1] + '</td></tr>');
    }
    send('</table>');
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
    send('<section class="user" id="' + this.login + '">');
    send('<h1>' + this.login + '</h1>');
    for each (var v in this.viewpoints) {
      v.sendHTML();
    }
    send('</section>');
  }
}
