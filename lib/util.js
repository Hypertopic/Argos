exports.normalize = function(obj)
{
  if(!obj.rows) return obj;
  var rows = obj.rows;
  var result = {};
  for(var i=0; i < rows.length; i++)
  {
    var r = rows[i];
    var keys = r.key;
    var current = result;
    for(var k=0; k < keys.length; k++)
    {
      if(!current[keys[k]])
        current[keys[k]] = {};
      current = current[keys[k]];
    }
    var value = r.value;
    for(var attribute in value)
    {
      if(!current[attribute])
        current[attribute] = [];
      current[attribute].push(value[attribute]);
    }
  }
  return result;
}

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
