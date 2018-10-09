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
