const en = require('../en/mock.json');
const fr = require('./mock.json');

function getKeys(obj, prefix) {
  prefix = prefix || '';
  var keys = [];
  for (var k of Object.keys(obj)) {
    var path = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(getKeys(obj[k], path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

var enKeys = getKeys(en).sort();
var frKeys = getKeys(fr).sort();
var missingInFr = enKeys.filter(function(k) { return frKeys.indexOf(k) === -1; });
var extraInFr = frKeys.filter(function(k) { return enKeys.indexOf(k) === -1; });

console.log('EN keys: ' + enKeys.length);
console.log('FR keys: ' + frKeys.length);
if (missingInFr.length) console.log('Missing in FR: ' + JSON.stringify(missingInFr));
if (extraInFr.length) console.log('Extra in FR: ' + JSON.stringify(extraInFr));
if (missingInFr.length === 0 && extraInFr.length === 0) console.log('All keys match perfectly.');
