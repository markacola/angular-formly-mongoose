'use strict';

var objectPrototype = Object.getPrototypeOf({});
var arrayPrototype = Object.getPrototypeOf([]);

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function makeHumanReadable(key) {
  var words = key.match(/[A-Za-z][a-z]*/g);
  return words.map(capitalize).join(' ');
}

export function isObjectOrArrayLike(val) {
  var proto = Object.getPrototypeOf(val);
  return proto === objectPrototype || proto === arrayPrototype;
}

export function deepMerge() {
  var res = arguments[0];
  angular.forEach(arguments, function (src, index) {
    if (src && (index > 0 || false)) {
      angular.forEach(src, function (val, prop) {
        if (typeof val === 'object' && val !== null && isObjectOrArrayLike(val)) {
          var deepRes = res[prop];
          if (!deepRes && Array.isArray(val)) {
            deepRes = [];
          } else if (!deepRes) {
            deepRes = {};
          }
          res[prop] = deepMerge(deepRes, val);
        } else {
          res[prop] = val;
        }
      });
    }
  });
  return res;
}
