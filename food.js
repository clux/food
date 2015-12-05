var async = require('async');
var fs = require('fs');
var path = require('path');
var ingredients = require('./ingredients.json');

// Cascades the json variables down the tree when not present below
var cascade = (data) => {
  var extendables = ['container', 'size', 'unit'];
  Object.keys(data).forEach(name => {
    var el = data[name];
    // Can be generalized here when traversing more than `types`
    if (typeof el.types === 'object') {
      Object.keys(el.types).forEach(typeName => {
        var type = el.types[typeName];
        extendables.forEach(ext => {
          // override if undefined, and defined above
          // it is ok to set the inner one to null to override an outer value
          if (type[ext] === undefined && el[ext] !== undefined) {
            type[ext] = el[ext];
          }
        });
      });
    }
  });
  return data;
};

var getJson = function (name, cb) {
  var key = path.basename(name, '.json');
  fs.readFile(name, function (err, res) {
    if (err) { return cb(err); }
    var data;
    try { data = JSON.parse(res); }
    catch (e) { return cb(e); }
    data.name = key;
    cb(null, data);
  });
};

var convert = (ary) => {
  return ary.reduce((acc, el) => {
    acc[el.name] = el;
    return acc;
  }, {});
};

var getJsons = function (dir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, data) {
      if (err) { return reject(err); }
      var jsons = data.filter(el => path.extname(el) === '.json')
                      .map(el => path.join(dir, el));

      async.map(jsons, getJson, function (e, res) {
        e ? reject(e) : resolve(convert(res));
      });
    });
  });
};

module.exports = function *() {
  var recipes = yield getJsons('./recipes');
  return {
    ingredients: cascade(ingredients),
    recipes: recipes
  };
};
