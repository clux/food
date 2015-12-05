var test = require('bandage');
var food = require('..');

test('ingredients', function *(t) {
  var f = yield food();
  t.ok(f.ingredients, 'have ingredients');
  for (var name of Object.keys(f.ingredients)) {
    t.ok(name, 'name of ' + name);
    var i = f.ingredients[name];
    t.type(i.size, 'number', 'numeric size for ' + i.name);
    // ingredient can vary - these are customizations:
    if (i.type || i.types) {
      t.ok(i.type, 'type set of ' + i.name);
      t.instance(i.types, Array, 'types set for ' + i.name);
      t.in(i.type, i.types, 'type in types for ' + i.name);
    }
  }
});
