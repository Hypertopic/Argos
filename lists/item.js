function (head, req) {
  var hypertopic = require("lib/hypertopic");
  var util = require("lib/util");

  provides("json", util.sendView);

  provides("html", function() {
    util.sendCSS();
    var item = new hypertopic.Item(req.query.corpus, req.query.item);
    while (r = getRow()) {
      var key = r.key;
      var value = r.value;
      if (key.length==2) { // Whole item
        if (value.topic) {
          item.addTopic(r.doc, value.topic.id);
        } else {
          item.addAttributes(value);
        }
      }
    }
    item.sendHTML();
  });
}
