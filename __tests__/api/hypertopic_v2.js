const test = require('frisby');

test.globalSetup({
  request: {
    headers: {
      'Accept': 'application/json',
    }
  }
});

it('Get a portfolio to get an agregate of related corpora and viewpoints', function () {
  return test.get('http://localhost/user/vitraux')
    .expect('header', 'Content-Type', 'application/json')
    .expect('json', 'rows', [
      {id:'Vitraux - Bénel', key:['vitraux'], value:{corpus:{id:'Vitraux - Bénel', name:'Vitraux - Bénel'}}},
      {id:'a76306e4f17ed4f79e7e481eb9a1bd06', key:['vitraux'], value:{viewpoint:{id:'a76306e4f17ed4f79e7e481eb9a1bd06', name:"Histoire de l'art"}}},
      {id:'56e092d8a6179a788c74b618b29801c0', key:['vitraux'], value:{viewpoint:{id:'56e092d8a6179a788c74b618b29801c0', name:'Histoire des religions'}}},
    ]);
});

it('Get a corpus to get contained items and highlights with their attributes and topics', function () {
  return test.get('http://localhost/corpus/Vitraux - Bénel')
    .expect('json', 'rows', [
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"creator":"Aurélien Bénel"}},
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"name":"SNZ 006","resource":"http://steatite.hypertopic.org/picture/8a1750b17b11944108efaac593f4448e4e9f966b"}},
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"topic":{"viewpoint":"56e092d8a6179a788c74b618b29801c0","id":"2c7175571d9d354cb57d328503004d85"}}},
      {"id":"dd7dbd7500767c049e75c85b6fb51c4a36c099dc","key":["Vitraux - Bénel","dd7dbd7500767c049e75c85b6fb51c4a36c099dc"],"value":{"name":"SM 001","resource":"http://steatite.hypertopic.org/picture/dd7dbd7500767c049e75c85b6fb51c4a36c099dc"}},
    ]);
});

it('Get an item to get its highlights, attributes and topics', function () {
  return test.get('http://localhost/item/Vitraux - Bénel/8a1750b17b11944108efaac593f4448e4e9f966b')
    .expect('json', 'rows', [
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"creator":"Aurélien Bénel"}},
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"name":"SNZ 006","resource":"http://steatite.hypertopic.org/picture/8a1750b17b11944108efaac593f4448e4e9f966b"}},
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"topic":{"viewpoint":"56e092d8a6179a788c74b618b29801c0","id":"2c7175571d9d354cb57d328503004d85"}}},
    ]);
});

it('Get a resource to find the corresponding item (and corpus)', function() {
  return test.get('http://localhost/item/?resource=http://steatite.hypertopic.org/picture/8a1750b17b11944108efaac593f4448e4e9f966b')
    .expect('json', 'rows', [
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["http://steatite.hypertopic.org/picture/8a1750b17b11944108efaac593f4448e4e9f966b"],"value":{"item":{"corpus":"Vitraux - Bénel","id":"8a1750b17b11944108efaac593f4448e4e9f966b"}}}
    ]);
});

it('Get a viewpoint to get contained topics with their relations to other topics', function () {
  return test.get('http://localhost/viewpoint/56e092d8a6179a788c74b618b29801c0')
    .expect('json', 'rows', [
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0"],"value":{"upper":{"id":"76d8912cd913cf48bb394fba1f72db39","name":"Récits"}}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0"],"value":{"upper":{"id":"c556d31576c0bc40953ca5e04ab3fc72","name":"Personnages"}}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","c556d31576c0bc40953ca5e04ab3fc72"],"value":{"name":"Personnages"}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","c556d31576c0bc40953ca5e04ab3fc72"],"value":{"narrower":{"id":"437d2f65c8397f47825ab97ff5281482","name":"AT"}}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","f1520229979b11428f94a004f880c022"],"value":{"broader":{"id":"437d2f65c8397f47825ab97ff5281482","name":"AT"}}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","f1520229979b11428f94a004f880c022"],"value":{"name":"Abram/Abraham"}},
    ]);
});

it('Get a topic to get its relations to other topics', function () {
  return test.get('http://localhost/topic/56e092d8a6179a788c74b618b29801c0/c556d31576c0bc40953ca5e04ab3fc72')
    .expect('json', 'rows', [
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","c556d31576c0bc40953ca5e04ab3fc72"],"value":{"name":"Personnages"}},
      {"id":"56e092d8a6179a788c74b618b29801c0","key":["56e092d8a6179a788c74b618b29801c0","c556d31576c0bc40953ca5e04ab3fc72"],"value":{"narrower":{"id":"437d2f65c8397f47825ab97ff5281482","name":"AT"}}},
    ]);
});

it('Get corpus attributes to get used attribute keys', function () {
  return test.get('http://localhost/attribute/Vitraux - Bénel/')
    .expect('json', 'rows', [
      {"key":["Vitraux - Bénel","creator"],"value":2},
      {"key":["Vitraux - Bénel","spatial"],"value":2}
    ]);
});

it('Get an attribute to get used corresponding values', function () {
  return test.get('http://localhost/attribute/Vitraux - Bénel/spatial/')
    .expect('json', 'rows', [
      {"key":["Vitraux - Bénel","spatial","Église Saint-Nizier, Troyes"],"value":1},
      {"key":["Vitraux - Bénel","spatial","Église Sainte-Madeleine, Troyes"],"value":1}
    ]);
});

it('Get an attribute value to get matching items', function () {
  return test.get('http://localhost/attribute/Vitraux - Bénel/spatial/Église Saint-Nizier, Troyes')
    .expect('json', 'rows', [
      {"id":"8a1750b17b11944108efaac593f4448e4e9f966b","key":["Vitraux - Bénel","spatial","Église Saint-Nizier, Troyes"],"value":{"item":{"id":"8a1750b17b11944108efaac593f4448e4e9f966b","name":"SNZ 006"}}}
    ]);
});
