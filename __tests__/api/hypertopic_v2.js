const Hypertopic = require('hypertopic');
const Joi = require('@hapi/joi');

const db = new Hypertopic([
  'http://localhost'
]);

expect.extend({
  toMatchSchema: (data, schema, options) => {
    let error = schema.validate(data, options).error;
    let pass = !error;
    return {
      message: () => (pass) ? 'Success' : JSON.stringify(error.details),
      pass
    };
  }
});

const named_schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().allow('').required()
});

const user_schema = Joi.object({
  corpus: Joi.array().min(1).items(named_schema).required(),
  viewpoint: Joi.array().min(2).items(named_schema).required()
});

const values_schema = Joi.array().min(1).items(Joi.string());

const item_schema = Joi.object({
  name: values_schema,
  resource: values_schema,
  topic: Joi.array().items(Joi.object({
    viewpoint: Joi.string(),
    id: Joi.string()
  }))
}).unknown();

const corpus_schema = Joi.object({
  name: values_schema.required(),
  user: values_schema.required()
}).pattern(Joi.string(), item_schema);

const resource_schema = Joi.object({
  item: Joi.array().min(1).items(Joi.object({
    corpus: Joi.string().required(),
    id: Joi.string().required()
  }))
});

const topic_schema = Joi.object({
  name: values_schema.required(),
  broader: Joi.array().min(1).items(named_schema),
  narrower: Joi.array().min(1).items(named_schema)
});

const viewpoint_schema = Joi.object().keys({
  name: values_schema.required(),
  user: values_schema.required(),
  upper: Joi.array().min(1).items(named_schema),
}).pattern(Joi.string(), topic_schema);

const attributes_schema = Joi.object()
  .pattern(Joi.string(), Joi.array().min(1).items(Joi.number()));

const attribute_values_schema = Joi.object({
  item: Joi.array().min(1).items(named_schema).required()
});

it('Get a portfolio to get an agregate of related corpora and viewpoints', function () {
  let user = 'vitraux';
  return db.getView(`/user/${user}`).then((x) => {
    expect(x[user]).toBeDefined();
    expect(x[user]).toMatchSchema(user_schema);
  });
});

it('Get a corpus to get contained items and highlights with their attributes and topics', function () {
  let corpus = 'Vitraux - Bénel';
  return db.getView(`/corpus/${corpus}`).then((x) => {
    expect(x[corpus]).toBeDefined();
    expect(x[corpus]).toMatchSchema(corpus_schema);
  });
});

it('Get an item to get its highlights, attributes and topics', function () {
  let corpus = 'Vitraux - Bénel';
  let item = '8a1750b17b11944108efaac593f4448e4e9f966b';
  return db.getView(`/item/${corpus}/${item}`).then((x) => {
    expect(x[corpus]).toBeDefined();
    expect(x[corpus][item]).toMatchSchema(item_schema);
  });
});

it('Get a resource to find the corresponding item (and corpus)', function() {
  let resource = 'https://steatite.utt.fr/optimized/8a1750b17b11944108efaac593f4448e4e9f966b';
  return db.getView(`/item/?resource=${resource}`).then((x) => {
    expect(x[resource]).toBeDefined();
    expect(x[resource]).toMatchSchema(resource_schema);
  });
});

it('Get a viewpoint to get contained topics with their relations to other topics', function () {
  let viewpoint = '56e092d8a6179a788c74b618b29801c0';
  return db.getView(`/viewpoint/${viewpoint}`).then((x) => {
    expect(x[viewpoint]).toBeDefined();
    expect(x[viewpoint]).toMatchSchema(viewpoint_schema);
  });
});

it('Get a topic to get its relations to other topics', function () {
  let viewpoint = '56e092d8a6179a788c74b618b29801c0';
  let topic = 'c556d31576c0bc40953ca5e04ab3fc72';
  return db.getView(`/topic/${viewpoint}/${topic}`).then((x) => {
    expect(x[viewpoint]).toBeDefined();
    expect(x[viewpoint][topic]).toMatchSchema(topic_schema);
  });
});

it('Get corpus attributes to get used attribute keys', function () {
  let corpus = 'Vitraux - Bénel';
  return db.getView(`/attribute/${corpus}/`).then((x) => {
    expect(x[corpus]).toBeDefined();
    expect(x[corpus]).toMatchSchema(attributes_schema);
  });
});

it('Get an attribute to get used corresponding values', function () {
  let corpus = 'Vitraux - Bénel';
  let attribute = 'spatial';
  return db.getView(`/attribute/${corpus}/${attribute}/`).then((x) => {
    expect(x[corpus]).toBeDefined();
    expect(x[corpus][attribute]).toMatchSchema(attributes_schema);
  });
});

it('Get an attribute value to get matching items', function () {
  let corpus = 'Vitraux - Bénel';
  let attribute = 'spatial';
  let value = 'Église Saint-Nizier, Troyes';
  return db.getView(`/attribute/${corpus}/${attribute}/${value}`).then((x) => {
    expect(x[corpus]).toBeDefined();
    expect(x[corpus][attribute][value]).toMatchSchema(attribute_values_schema);
  });
});
