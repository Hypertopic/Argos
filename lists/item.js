function (head, req) {
  var hypertopic = require("lib/hypertopic");

  provides("json", function() {
    var result = {rows:[]};
    while (r = getRow()) {
      delete r.value._id;
      result.rows.push({key: r.key, value: r.value});
    }
    send(toJSON(result));
  });

  provides("html", function() {
    var viewpoints = {};
    function push(viewpoint, t) {
      if (viewpoint) {
        var v = viewpoint._id;
        if (!viewpoints[v]) {
          viewpoints[v] = new hypertopic.Viewpoint(viewpoint);
        }
        viewpoints[v].bind(t);
      }
    }
    while (r = getRow()) {
      var v = r.value;
      if (v.topic && r.doc) {
        if (!v.coordinates) {
          push(r.doc, v.topic.id);
        }
      }
    }
    send('<style type="text/css">.bound {font-weight: bold}</style>');
    for each (var v in viewpoints) {
      v.sendHTML();
    }
  });
}
