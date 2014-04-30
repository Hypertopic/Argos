function (head, req) {
  var hypertopic = require("lib/hypertopic");
  var viewpoint = new hypertopic.Viewpoint();

  provides("json", function() {
    send('{"rows":[');
    var row = getRow();
    while (row) {
      send(JSON.stringify(row));
      row = getRow();
      if (row) send(",");
    }
    send(']}');
  });

  provides("html", function() {
    while (row = getRow()) {
      viewpoint.addRow(row.key, row.value);
    }
    viewpoint.sendHTML();
  });
}
