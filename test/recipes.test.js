var test = require('bandage');
var food = require('..');

var verifyIngredient = function (t, i, name) {
  t.type(i, 'object', 'ingredient arguments for ' + name + ' is object');
  t.type(i.amount, 'number', 'ingredient object has amount of ' + name);
  // loop over keys and verify they are the allowed subset of correct types
  // TODO: verify conversions
}

var verifyIngredients = function (t, ingredients, totalIngredients) {
  for (var name of Object.keys(ingredients)) {
    var args = ingredients[name];
    // verify that the ingredient is listed in global file
    t.in(name, Object.keys(totalIngredients), 'ingredient ' + name + ' exists');
    var corr = totalIngredients[name];

    // verify format of ingredient arguments - which can be of three forms:
    t.ok(args, 'arguments for ' + name + ' set');
    if (typeof args === 'number') {
      t.pass('ingredient arguments for ' + name + ' is simple quantity');
    }
    else if (Array.isArray(args)) {
      args.forEach(i => verifyIngredient(t, i, name));
    }
    else {
      verifyIngredient(t, args, name);
    }
  }
};

verifyRecipe = function (t, name, r) {
  t.type(r.ingredients, 'object', 'object of ingredients for ' + name);
  t.type(r.time, 'object', 'object of time properties for ' + name);
  for (var type of Object.keys(r.time)) {
    t.type(r.time[type], 'number', 'numeric time ' + type + ' for ' + name);
  }
  if (r.baking) {
    t.type(r.baking.temperature, 'number', 'baking recipe has temperature');
  }
  t.instance(r.instructions, Array, 'instructions set for ' + name);
};

test('recipes', function *(t) {
  var fg = yield food();
  t.ok(fg.recipes, 'have recipes');
  t.ok(fg.ingredients, 'have ingredients');
  for (var name of Object.keys(fg.recipes)) {
    t.ok(name, 'name of ' + name);
    var r = fg.recipes[name];
    yield t.test(name, function *(st) {
      verifyRecipe(st, name, r);
      verifyIngredients(st, r.ingredients, fg.ingredients);

    });
  }
});
