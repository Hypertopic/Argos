function (head, req) {
  var hypertopic = require("lib/hypertopic");
  var util = require("lib/util");

  provides("json", require("lib/util").sendView);

  provides("html", function() {
    util.sendCSS(1);
    util.sendJS(1);
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
