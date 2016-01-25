(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongooseProcessor = require('./mongoose-processor');

exports.default = function (ngModule) {
  'use strict';

  ngModule.config(['formlyConfigProvider', function (formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'mongooseSchema',
      template: require('./mongoose-schema.html'),
      controller: ['$scope', function ($scope) {

        console.log($scope);
        $scope.formOptions = { formState: $scope.formState };

        $scope.fields = (0, _mongooseProcessor.processSchema)($scope.formOptions);

        function getFields(fields) {
          fields = angular.copy(fields);
          return fields;
        }
      }]

    });
  }]);
};

},{"./mongoose-processor":3,"./mongoose-schema.html":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formlyTypeMongooseSchema = require('./formly-type-mongoose-schema');

var _formlyTypeMongooseSchema2 = _interopRequireDefault(_formlyTypeMongooseSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngModuleName = 'formlyMongoose';
var angular = window.angular;
var ngModule = angular.module(ngModuleName, ['formly', 'formlyRepeatingSection']);

(0, _formlyTypeMongooseSchema2.default)(ngModule);

exports.default = ngModuleName;

},{"./formly-type-mongoose-schema":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFieldsFromSchema = generateFieldsFromSchema;
exports.getOptionsFromValue = getOptionsFromValue;
exports.processSchema = processSchema;

var _util = require('./util');

function generateFieldsFromSchema(schema) {

  var fields = [];

  angular.forEach(schema, function (value, key) {

    fields.push(getOptionsFromValue(value, key));
  });

  return fields;
}

function getOptionsFromValue(value, key) {

  var commonOptions = {
    key: key,
    templateOptions: {
      label: (0, _util.makeHumanReadable)(key)
    }
  };

  //if (propMetaData.hasOwnProperty('required')) {
  //  commonOptions.templateOptions.required = propMetaData.required;
  //}

  var typeOptions = {};
  switch (value.instance) {
    case 'Array':
      {
        if (value.schema) {
          typeOptions = {
            type: 'repeatSection',
            templateOptions: {
              type: 'number',
              btnText: 'Add ' + (0, _util.makeHumanReadable)(value.path),
              fields: generateFieldsFromSchema(value.schema)
            }
          };
        } else {
          typeOptions = {
            type: 'repeatSection',
            templateOptions: {
              type: 'number',
              btnText: 'Add ' + (0, _util.makeHumanReadable)(value.path)
            }
          };
        }
        //fields: [ getOptionsFromValue(value, key) ]
        break;
      }
    case 'Boolean':
      {
        typeOptions = {
          type: 'checkbox'
        };
        break;
      }
    case 'Number':
      {
        typeOptions = {
          type: 'input',
          templateOptions: { type: 'number' }
        };
        break;
      }
    default:
    case 'String':
      {
        if (value.enumValues && value.enumValues.length > 0) {

          var type = 'radio';
          if (value.enumValues.lenth > 5) {
            type = 'select';
          }
          typeOptions = {
            type: type,
            templateOptions: {}
          };
        } else {

          var _type = (value && value.length) > 80 ? 'textarea' : 'input';
          typeOptions = { type: _type };
        }
        break;
      }
  }
  return (0, _util.deepMerge)(commonOptions, typeOptions);
}

function processSchema() {

  return function getOIMConfig(schema, options) {

    options = options || {};

    var fields = generateFieldsFromSchema(schema);

    return fields;
  };
}

},{"./util":5}],4:[function(require,module,exports){
module.exports = "<div class=mongoose-schema-form ng-init=\"fields = getFields(to.schema)\"><formly-form fields=fields model=element form=form></formly-form></div>";

},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.makeHumanReadable = makeHumanReadable;
exports.isObjectOrArrayLike = isObjectOrArrayLike;
exports.deepMerge = deepMerge;
var objectPrototype = Object.getPrototypeOf({});
var arrayPrototype = Object.getPrototypeOf([]);

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

function makeHumanReadable(key) {
  var words = key.match(/[A-Za-z][a-z]*/g);
  return words.map(capitalize).join(' ');
}

function isObjectOrArrayLike(val) {
  var proto = Object.getPrototypeOf(val);
  return proto === objectPrototype || proto === arrayPrototype;
}

function deepMerge() {
  var res = arguments[0];
  angular.forEach(arguments, function (src, index) {
    if (src && (index > 0 || false)) {
      angular.forEach(src, function (val, prop) {
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null && isObjectOrArrayLike(val)) {
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGZvcm1seS10eXBlLW1vbmdvb3NlLXNjaGVtYS5qcyIsInNyY1xcaW5kZXguanMiLCJzcmNcXG1vbmdvb3NlLXByb2Nlc3Nvci5qcyIsInNyYy9tb25nb29zZS1zY2hlbWEuaHRtbCIsInNyY1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O2tCQ0VlLG9CQUFZO0FBQ3pCLGVBRHlCOztBQUd6QixXQUFTLE1BQVQsQ0FBZ0IsQ0FBRSxzQkFBRixFQUEwQixnQ0FBd0I7O0FBRTlELHlCQUFxQixPQUFyQixDQUE2QjtBQUMzQixZQUFNLGdCQUFOO0FBQ0EsZ0JBQVUsUUFBUSx3QkFBUixDQUFWO0FBQ0Esa0JBQVksQ0FBRSxRQUFGLEVBQVksVUFBUyxNQUFULEVBQWlCOztBQUV2QyxnQkFBUSxHQUFSLENBQVksTUFBWixFQUZ1QztBQUd2QyxlQUFPLFdBQVAsR0FBcUIsRUFBQyxXQUFXLE9BQU8sU0FBUCxFQUFqQyxDQUh1Qzs7QUFLdkMsZUFBTyxNQUFQLEdBQWdCLHNDQUFlLE9BQU8sV0FBUCxDQUEvQixDQUx1Qzs7QUFPdkMsaUJBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN6QixtQkFBUyxRQUFRLElBQVIsQ0FBYSxNQUFiLENBQVQsQ0FEeUI7QUFFekIsaUJBQU8sTUFBUCxDQUZ5QjtTQUEzQjtPQVBzQixDQUF4Qjs7S0FIRixFQUY4RDtHQUF4QixDQUExQyxFQUh5QjtDQUFaOzs7Ozs7Ozs7Ozs7Ozs7QUNGZixJQUFNLGVBQWUsZ0JBQWY7QUFDTixJQUFNLFVBQVUsT0FBTyxPQUFQO0FBQ2hCLElBQU0sV0FBVyxRQUFRLE1BQVIsQ0FBZSxZQUFmLEVBQTZCLENBQUUsUUFBRixFQUFZLHdCQUFaLENBQTdCLENBQVg7O0FBR04sd0NBQWUsUUFBZjs7a0JBRWU7OztBQ1BmOzs7OztRQUlnQjtRQWNBO1FBNEVBOzs7O0FBMUZULFNB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LEdBQVosQ0FESztTQVJQO09BRG1CLENBQXJCLENBRCtCO0tBQWpDO0dBRHlCLENBQTNCLENBRjBCO0FBbUIxQixTQUFPLEdBQVAsQ0FuQjBCO0NBQXJCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7cHJvY2Vzc1NjaGVtYX0gZnJvbSAnLi9tb25nb29zZS1wcm9jZXNzb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGUgPT4ge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgbmdNb2R1bGUuY29uZmlnKFsgJ2Zvcm1seUNvbmZpZ1Byb3ZpZGVyJywgZm9ybWx5Q29uZmlnUHJvdmlkZXIgPT4ge1xyXG5cclxuICAgICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ21vbmdvb3NlU2NoZW1hJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tb25nb29zZS1zY2hlbWEuaHRtbCcpLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFsgJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZSk7XHJcbiAgICAgICAgICAkc2NvcGUuZm9ybU9wdGlvbnMgPSB7Zm9ybVN0YXRlOiAkc2NvcGUuZm9ybVN0YXRlfTtcclxuXHJcbiAgICAgICAgICAkc2NvcGUuZmllbGRzID0gcHJvY2Vzc1NjaGVtYSggJHNjb3BlLmZvcm1PcHRpb25zICk7XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0RmllbGRzKGZpZWxkcykge1xyXG4gICAgICAgICAgICBmaWVsZHMgPSBhbmd1bGFyLmNvcHkoZmllbGRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkcztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgXSk7XHJcblxyXG59O1xyXG4iLCJjb25zdCBuZ01vZHVsZU5hbWUgPSAnZm9ybWx5TW9uZ29vc2UnO1xyXG5jb25zdCBhbmd1bGFyID0gd2luZG93LmFuZ3VsYXI7XHJcbmNvbnN0IG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbICdmb3JtbHknLCAnZm9ybWx5UmVwZWF0aW5nU2VjdGlvbicgXSk7XHJcblxyXG5pbXBvcnQgbW9uZ29vc2VTY2hlbWEgZnJvbSAnLi9mb3JtbHktdHlwZS1tb25nb29zZS1zY2hlbWEnO1xyXG5tb25nb29zZVNjaGVtYShuZ01vZHVsZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZ01vZHVsZU5hbWU7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7aXNPYmplY3RPckFycmF5TGlrZSwgZGVlcE1lcmdlLCBtYWtlSHVtYW5SZWFkYWJsZSwgY2FwaXRhbGl6ZX0gZnJvbSAnLi91dGlsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUZpZWxkc0Zyb21TY2hlbWEoIHNjaGVtYSApIHtcclxuXHJcbiAgbGV0IGZpZWxkcyA9IFtdO1xyXG5cclxuICBhbmd1bGFyLmZvckVhY2goc2NoZW1hLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgZmllbGRzLnB1c2goIGdldE9wdGlvbnNGcm9tVmFsdWUodmFsdWUsIGtleSkgKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBmaWVsZHM7XHJcbiAgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25zRnJvbVZhbHVlKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgdmFyIGNvbW1vbk9wdGlvbnMgPSB7XHJcbiAgICBrZXk6IGtleSxcclxuICAgIHRlbXBsYXRlT3B0aW9uczoge1xyXG4gICAgICBsYWJlbDogbWFrZUh1bWFuUmVhZGFibGUoa2V5KVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vaWYgKHByb3BNZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVxdWlyZWQnKSkge1xyXG4gIC8vICBjb21tb25PcHRpb25zLnRlbXBsYXRlT3B0aW9ucy5yZXF1aXJlZCA9IHByb3BNZXRhRGF0YS5yZXF1aXJlZDtcclxuICAvL31cclxuXHJcbiAgdmFyIHR5cGVPcHRpb25zID0ge307XHJcbiAgc3dpdGNoICh2YWx1ZS5pbnN0YW5jZSkge1xyXG4gICAgY2FzZSAoJ0FycmF5Jyk6IHtcclxuICAgICAgaWYgKHZhbHVlLnNjaGVtYSkge1xyXG4gICAgICAgIHR5cGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgdHlwZTogJ3JlcGVhdFNlY3Rpb24nLFxyXG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgICBidG5UZXh0OiAnQWRkICcrbWFrZUh1bWFuUmVhZGFibGUodmFsdWUucGF0aCksXHJcbiAgICAgICAgICAgIGZpZWxkczogZ2VuZXJhdGVGaWVsZHNGcm9tU2NoZW1hKCB2YWx1ZS5zY2hlbWEgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHlwZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0eXBlOiAncmVwZWF0U2VjdGlvbicsXHJcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICAgIGJ0blRleHQ6ICdBZGQgJyttYWtlSHVtYW5SZWFkYWJsZSh2YWx1ZS5wYXRoKSxcclxuICAgICAgICAgICAgLy9maWVsZHM6IFsgZ2V0T3B0aW9uc0Zyb21WYWx1ZSh2YWx1ZSwga2V5KSBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgKCdCb29sZWFuJyk6IHtcclxuICAgICAgdHlwZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgdHlwZTogJ2NoZWNrYm94J1xyXG4gICAgICB9O1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgKCdOdW1iZXInKToge1xyXG4gICAgICB0eXBlT3B0aW9ucyA9IHtcclxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxyXG4gICAgICAgIHRlbXBsYXRlT3B0aW9uczoge3R5cGU6ICdudW1iZXInfVxyXG4gICAgICB9O1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGRlZmF1bHQ6XHJcbiAgICBjYXNlICgnU3RyaW5nJyk6IHtcclxuICAgICAgaWYgKHZhbHVlLmVudW1WYWx1ZXMgJiYgdmFsdWUuZW51bVZhbHVlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgIHZhciB0eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBpZiAodmFsdWUuZW51bVZhbHVlcy5sZW50aCA+IDUpIHtcclxuICAgICAgICAgIHR5cGUgPSAnc2VsZWN0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHlwZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGxldCB0eXBlID0gKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkgPiA4MCA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnO1xyXG4gICAgICAgIHR5cGVPcHRpb25zID0ge3R5cGU6IHR5cGV9O1xyXG5cclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGRlZXBNZXJnZShjb21tb25PcHRpb25zLCB0eXBlT3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzU2NoZW1hKCkge1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gZ2V0T0lNQ29uZmlnKHNjaGVtYSwgb3B0aW9ucykge1xyXG5cclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIHZhciBmaWVsZHMgPSBnZW5lcmF0ZUZpZWxkc0Zyb21TY2hlbWEoIHNjaGVtYSApO1xyXG5cclxuICAgIHJldHVybiBmaWVsZHM7XHJcblxyXG4gIH07XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPW1vbmdvb3NlLXNjaGVtYS1mb3JtIG5nLWluaXQ9XFxcImZpZWxkcyA9IGdldEZpZWxkcyh0by5zY2hlbWEpXFxcIj48Zm9ybWx5LWZvcm0gZmllbGRzPWZpZWxkcyBtb2RlbD1lbGVtZW50IGZvcm09Zm9ybT48L2Zvcm1seS1mb3JtPjwvZGl2PlwiO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSk7XHJcbnZhciBhcnJheVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihbXSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSh3b3JkKSB7XHJcbiAgcmV0dXJuIHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnN1YnN0cmluZygxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VIdW1hblJlYWRhYmxlKGtleSkge1xyXG4gIHZhciB3b3JkcyA9IGtleS5tYXRjaCgvW0EtWmEtel1bYS16XSovZyk7XHJcbiAgcmV0dXJuIHdvcmRzLm1hcChjYXBpdGFsaXplKS5qb2luKCcgJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdE9yQXJyYXlMaWtlKHZhbCkge1xyXG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xyXG4gIHJldHVybiBwcm90byA9PT0gb2JqZWN0UHJvdG90eXBlIHx8IHByb3RvID09PSBhcnJheVByb3RvdHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNZXJnZSgpIHtcclxuICB2YXIgcmVzID0gYXJndW1lbnRzWzBdO1xyXG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChzcmMsIGluZGV4KSB7XHJcbiAgICBpZiAoc3JjICYmIChpbmRleCA+IDAgfHwgZmFsc2UpKSB7XHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzcmMsIGZ1bmN0aW9uICh2YWwsIHByb3ApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIGlzT2JqZWN0T3JBcnJheUxpa2UodmFsKSkge1xyXG4gICAgICAgICAgdmFyIGRlZXBSZXMgPSByZXNbcHJvcF07XHJcbiAgICAgICAgICBpZiAoIWRlZXBSZXMgJiYgQXJyYXkuaXNBcnJheSh2YWwpKSB7XHJcbiAgICAgICAgICAgIGRlZXBSZXMgPSBbXTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoIWRlZXBSZXMpIHtcclxuICAgICAgICAgICAgZGVlcFJlcyA9IHt9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVzW3Byb3BdID0gZGVlcE1lcmdlKGRlZXBSZXMsIHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc1twcm9wXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiByZXM7XHJcbn1cclxuIl19
