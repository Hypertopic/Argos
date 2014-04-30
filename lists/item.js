function (head, req) {
  var hypertopic = require("lib/hypertopic");

  provides("json", require("lib/util").sendView);

  provides("html", function() {
    var item = new hypertopic.Item();
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
