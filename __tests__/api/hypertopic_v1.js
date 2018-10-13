const test = require('frisby');
const convert = require('xml-js');

let xml = function(response) {
  return convert.xml2js(response._body, {compact:true});
};


it('Get actors to get a list of portfolios', function() {
  return test.get('http://argos.local:5984/v1/actor/')
    .then(function(response) {
      let actors = xml(response).actors.actor;
      expect(actors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({_attributes: {href: 'vitraux'}}),
          expect.objectContaining({_attributes: {href: 'aurelien.benel'}})
        ])
      );
    });
});

it('Get a portfolio to get an agregate of related corpora and viewpoints', function () {
  return test.get('http://argos.local:5984/v1/actor/vitraux')
    .then(function(response) {
      let viewpoints = xml(response).actor.viewpoint;
      expect(viewpoints).toEqual(
        expect.arrayContaining([
          expect.objectContaining({_text: "Histoire de l'art"}),
          expect.objectContaining({_text: "Histoire des religions"})
        ])
      );
    });
});

it('Get a corpus to get contained items and highlights with their attributes and topics', function () {
  return test.get('http://argos.local:5984/v1/entity/Vitraux - Bénel')
    .then(function(response) {
      let viewpoints = xml(response).entity.relatedEntity;
      expect(viewpoints).toEqual(
        expect.arrayContaining([
          expect.objectContaining({_text: 'SNZ 006'}),
          expect.objectContaining({_text: 'SM 001'})
        ])
      );
    });
});

it('Get an item to get its attributes and topics', function () {
  return test.get('http://argos.local:5984/v1/entity/Vitraux - Bénel/8a1750b17b11944108efaac593f4448e4e9f966b')
    .then(function(response) {
      let item = xml(response).entity;
      expect(item.attribute).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _attributes:{
              name: 'spatial',
              value: 'Église Saint-Nizier, Troyes'
            }
          })
        ])
      );
      expect(item.topic).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _attributes: {
              href: '../../viewpoint/a76306e4f17ed4f79e7e481eb9a1bd06/topic/44744143fea88349a681530d5f16ad24'
            }
          })
        ])
      );
    });
});
 
it('Get a viewpoint to get upper topics', function () {
  return test.get('http://argos.local:5984/v1/viewpoint/56e092d8a6179a788c74b618b29801c0')
    .then(function(response) {
      let topics = xml(response).viewpoint.topic;
      expect(topics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({_text: 'Récits'}),
          expect.objectContaining({_text: 'Personnages'})
        ])
      );
    });
});


it('Get a topic to get its children and parents', function () {
  return test.get('http://argos.local:5984/v1/viewpoint/56e092d8a6179a788c74b618b29801c0/topic/437d2f65c8397f47825ab97ff5281482')
    .then(function(response) {
      let topics = xml(response).topic.relatedTopic;
      expect(topics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _text: 'Personnages'
          }),
          expect.objectContaining({
            _text: 'Abram/Abraham'
          }),
        ])
      );
    });
});

