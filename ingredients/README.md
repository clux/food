# Ingredients
Elements used in recipes.

## Format
All data is pure JSON, but illustrated here in javascript with comments:

```js
{
  "size": 100, // size of normal, purchasable unit
  "type": "plain", // default type
  "types": ["plain", "bread", "corn"], // complete list of valid types
  "unit": "g", // metric unit used in size, null if size is a plain count
}
```
