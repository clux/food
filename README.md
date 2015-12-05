# food
[![build status](https://secure.travis-ci.org/clux/food.svg)](http://travis-ci.org/clux/food)
[![dependency status](https://david-dm.org/clux/food.svg)](https://david-dm.org/clux/food)
[![coverage status](http://img.shields.io/coveralls/clux/food.svg)](https://coveralls.io/r/clux/food)

A modelling experiment that may or may not be useful. This repository contains common ingredients, recipes, a way to map them together, and meta data for preparation.

## Potential Uses
Once common recipes are mapped, can potentially:

- generate a shopping list from a quick selection
- warn about expiration date clashes in shopping list
- hook list into grocery delivery APIs
- run time optimization algorithms for multiple recipes

## Ingredients
Currently locked in this repo.

### Format
All data is pure JSON, but illustrated here in javascript with comments:

```js
{
  "basil": {
    "unit": "g", // measurement unit used in amounts
    "types": { // complete list of types and associated values
      "fresh": {
        "size": 31, // amount of units found in container
        "container": "pack" // can be used as shorthand unit e.g. "unit": "pack"
      },
      "dried": {
        "size": 10,
        "container": "jar"
      }
    },
    "default": "dried" // default type in types object
  }
}
```

- `size` + `container` can be lifted if they are equal for all `types`, e.g. sugar
- `types` can be an array of keys if everything can be lifted
- `unit` + `container` can be left blank or set to `null` if `container === name`, e.g. bananas.
