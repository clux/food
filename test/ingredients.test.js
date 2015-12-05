var test = require('bandage');
var food = require('..');

test('ingredients', function *(t) {
  var f = yield food();
  t.ok(f.ingredients, 'have ingredients');
  for (var name of Object.keys(f.ingredients)) {
    t.ok(name, 'name of ' + name);
    var i = f.ingredients[name];
    // ingredient can vary - these are customizations:
    if (i.types) {
      if (Array.isArray(i.types)) {
        t.type(i.size, 'number', 'global numeric size for ' + name);
        t.ok(i.default, 'default type set for ' + name);
        t.in(i.default, i.types, 'type in types for ' + name);
      }
      else {
        if (!i.size) {
          // all keys must have size
        }
        // all i.types[x].size keys must be int
        // all i.types[x].container keys must be string if set
      }
    }
  }
});
