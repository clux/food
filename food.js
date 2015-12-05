var async = require('async');
var fs = require('fs');
var path = require('path');

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
  // TODO: really want data.name to be a key so we return a nested dict
  var ingredients = yield getJsons('./ingredients');
  var recipes = yield getJsons('./recipes');
  return { ingredients, recipes };
};
