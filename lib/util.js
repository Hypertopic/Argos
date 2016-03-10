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

exports.sendCSS = function() {
  send('<link rel="stylesheet" href="../included/jquery.contextmenu.css" />');
  send('<link rel="stylesheet" href="../included/stylesheet.css" />');
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

exports.urlencode = function(data) {
  return data.replace(/ /g, '%20');
}
