var test = require('bandage');
var food = require('..');

var verifyIngredient = function (t, i, name, corr) {
  t.type(i, 'object', 'ingredient arguments for ' + name + ' is object');
  t.type(i.amount, 'number', 'ingredient object has amount of ' + name);
  // verify type is in the allowed types in ingredients
  if (i.type) {
    t.type(corr.types, 'object', 'types set for ingredient ' + name);
    t.in(i.type, Object.keys(corr.types), 'type ' + i.type + ' in ingredients of ' + name);
  }
  // TODO: verify conversions
};

var verifyIngredients = function (t, ingredients, totalIngredients) {
  Object.keys(ingredients).forEach(name => {
    var args = ingredients[name];
    // verify that the ingredient is listed in global file
    t.in(name, Object.keys(totalIngredients), 'ingredient ' + name + ' exists');
    var corr = totalIngredients[name];

    // verify format of ingredient arguments - which can be of three forms:
    t.ok(args, 'arguments for ' + name + ' set');
    if (Array.isArray(args)) { // multiple types of same ingredient
      args.forEach(i => verifyIngredient(t, i, name, corr));
    }
    else if (typeof args === 'object') { // explicit ingredient object
      verifyIngredient(t, args, name, corr);
    }
    else {
      t.type(args, 'number', 'ingredient argument amount only for ' + name);
    }
  });
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
