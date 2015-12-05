var test = require('bandage');
var food = require('..');

test('recipes', function *(t) {
  var f = yield food();
  t.ok(f.recipes, 'have recipes');
  t.ok(f.ingredients, 'have ingredients');
  for (var name of Object.keys(f.recipes)) {
    t.ok(name, 'name of ' + name);
    var i = f.recipes[name];
    t.type(i.ingredients, 'object', 'object of ingredients for ' + i.name);
    for (var name of Object.keys(i.ingredients)) {
      var args = i.ingredients[name];
      // verify format of ingredient arguments
      t.ok(args, 'arguments for ' + name + ' set');
      if (typeof args === 'number') {
        t.pass('ingredient arguments for ' + name + ' is simple quantity');
      }
      else if (Array.isArray(args)) {
        // verify each element as below
      }
      else {
        t.type(args, 'object', 'ingredient arguments for ' + name + ' is array');
        t.type(args.amount, 'number', '1st ingredient arg for ' + name + ' is quantity');
        // loop over keys and verify they are the allowed subset of correct types
      }
      // verify that the ingredient exists
      var ing = f.ingredients[name];
      t.ok(ing, 'ingredient ' + name + ' exists in inredients');
    }
    t.type(i.time, 'object', 'object of time properties for ' + i.name);
    for (var type of Object.keys(i.time)) {
      t.type(i.time[type], 'number', 'numeric time ' + type + ' for ' + i.name);
    }
    if (i.baking) {
      t.type(i.baking.temperature, 'number', 'baking recipe has temperature');
    }
    t.instance(i.instructions, Array, 'instructions set for ' + i.name);
  }
});
