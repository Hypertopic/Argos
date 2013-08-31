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
