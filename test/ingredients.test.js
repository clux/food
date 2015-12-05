var test = require('bandage');
var food = require('..');

var verifyType = function (t, ing, name) {
  for (var type of Object.keys(ing.types)) {
    var n = ing.types[type];
    t.ok(n, name + ' of type ' + type);
    // verify all properties have been cascaded to the types
    t.type(n.size, 'number', 'specific size for ' + name);
    // if it has a container, it needs a unit
    if (n.container) {
      t.type(n.container, 'string', 'container type for ' + name);
      t.type(n.unit, 'string', 'unit for ' + name);
    }
    if (n.unit == null) {
      t.ok(n.container == null, 'no container for countable ' + name);
    }
  }
};


test('ingredients', function *(t) {
  var f = yield food();
  t.ok(f.ingredients, 'have ingredients');
  // console.log(JSON.stringify(f.ingredients, null, 2));
  for (var name of Object.keys(f.ingredients)) {
    t.ok(name, 'name of ' + name);
    var i = f.ingredients[name];
    // if it has types, it must have a default and vice versa
    if (i.types || i.default) { // has one of them
      t.ok(i.default, 'default type set for ' + name);
      t.type(i.types, 'object', 'default type set for ' + name);
      t.in(i.default, Object.keys(i.types), 'type in types for ' + name);
      verifyType(t, i, name);
    }
  }
});
