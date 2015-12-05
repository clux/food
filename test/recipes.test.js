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
      else {
        t.instance(args, Array, 'ingredient arguments for ' + name + ' is array');
        t.equal(args.length, 2, 'two ingredient arguments for ' + name);
        t.type(args[0], 'number', '1st ingredient arg for ' + name + ' is quantity');
        t.type(args[1], 'object', '2nd ingredient arg for ' + name + ' is params');
        // TODO: verify the names passed into args[1]
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
