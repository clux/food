#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
require('co')(require('.')).then(res => {
  var rec = res.recipes[argv._[0]];
  if (argv.j) {
    rec = JSON.stringify(rec);
  }
  console.log(rec);
});
