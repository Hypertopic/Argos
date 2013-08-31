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
    var user = new hypertopic.User(req.query.user);
    while (r = getRow()) {
      if (r.value.viewpoint) {
        if (r.doc) {
          user.addViewpoint(r.doc);
        }
      }
    }
    user.sendHTML();
  });
}
