exports.sendView = function() {
  send('{"rows":[');
  var row = getRow();
  while (row) {
    send(JSON.stringify({key:row.key, value:row.value}));
    row = getRow();
    if (row) send(",");
  }
  send(']}');
}

exports.xmlencode = function(data) {
  switch (typeof data) {
    case "object":
      data = data[0];
    case "string":
      data = data.replace(/\&/g,'&'+'amp;')
        .replace(/</g,'&'+'lt;')
        .replace(/\"/g,'&'+'quot;');
  }
  return data;
}

