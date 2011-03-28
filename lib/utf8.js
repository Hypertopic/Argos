//Ported from json2.js
exports.utf8Encode = function (string) {
  var escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g,
  meta = {    // table of character substitutions
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"' : '\\"',
      '\\': '\\\\'
  };
	escapable.lastIndex = 0;
          return escapable.test(string) 
            ? string.replace(escapable, 
              function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                      //TODO escape &?
                      '[[[__AND___]]]#x' + 
                      ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                      + ';';
              }) 
            : string ;
}