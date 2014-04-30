function (head, req) {
  var hypertopic = require("lib/hypertopic");

  provides("json", require("lib/util").sendView);

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
