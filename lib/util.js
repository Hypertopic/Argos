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

exports.sendCSS = function(levels) {
  send('<link rel="stylesheet" href="'
    + '../'.repeat(levels)
    + 'included/stylesheet.css" />');
}

exports.sendJS = function(levels) {
  send('<script src="https://code.jquery.com/jquery-2.2.1.min.js"'
    + ' integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="'
    + ' crossorigin="anonymous"></script>'
    + '<script src="'
    + '../'.repeat(levels)
    + 'included/hypertopicMap.js"></script>'
    + '<script src="'
    + '../'.repeat(levels)
    + 'included/interaction.js"></script>');
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

// ECMAScript 6 emulation (code snippet from Mozilla Developer Network)
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    return rpt;
  }
}
