function (head, req) {
  var hypertopic = require("lib/hypertopic");
  var viewpoint = new hypertopic.Viewpoint();

  provides("json", require("lib/util").sendView);

  provides("html", function() {
    while (row = getRow()) {
      viewpoint.addRow(row.key, row.value);
    }
    if (req.query.download) {
      viewpoint.sendFreemind();
    } else {
      viewpoint.sendHTML();
    }
  });

  registerType("freemind", "application/x-freemind");
  provides("freemind", function() {
    while (row = getRow()) {
      viewpoint.addRow(row.key, row.value);
    }
    viewpoint.sendFreemind();
  });
}
