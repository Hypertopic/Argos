function (o, req) {
  var hypertopic = require("lib/hypertopic");
  var viewpoint = new hypertopic.Viewpoint(o);

  provides("json", function() {
    viewpoint.sendJSON();
  });

  provides("html", function() {
    viewpoint.sendHTML();
  });
}
