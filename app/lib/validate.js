exports.init = function(newDoc, oldDoc, userCtx, secObj) {
  var v = {};

  v.forbidden = function(message) {
    throw({forbidden : message});
  };

  v.unauthorized = function(message) {
    throw({unauthorized : message});
  };

  v.assert = function(should, message) {
    if (!should) v.forbidden(message);
  }

  return v;
};
