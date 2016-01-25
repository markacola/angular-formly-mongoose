(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongooseProcessor = require('./mongoose-processor');

exports.default = function (ngModule) {

  ngModule.config(['formlyConfigProvider', function (formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'mongooseSchema',
      template: require('./mongoose-schema.html'),
      controller: ['$scope', function ($scope) {

        $scope.formOptions = { formState: $scope.formState };

        $scope.fields = (0, _mongooseProcessor.processSchema)($scope.formOptions);
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
module.exports = "<div class={{hideRepeat}}><formly-form fields=fields model=element form=form></formly-form></div>";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGZvcm1seS10eXBlLW1vbmdvb3NlLXNjaGVtYS5qcyIsInNyY1xcaW5kZXguanMiLCJzcmNcXG1vbmdvb3NlLXByb2Nlc3Nvci5qcyIsInNyYy9tb25nb29zZS1zY2hlbWEuaHRtbCIsInNyY1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7OztrQkFJZSxVQUFDLFFBQUQsRUFBYzs7QUFFM0IsV0FBUyxNQUFULENBQWdCLENBQ2Qsc0JBRGMsRUFFZCxnQ0FBd0I7O0FBRXRCLHlCQUFxQixPQUFyQixDQUE2QjtBQUMzQixZQUFNLGdCQUFOO0FBQ0EsZ0JBQVUsUUFBUSx3QkFBUixDQUFWO0FBQ0Esa0JBQVksQ0FBRSxRQUFGLEVBQVksVUFBUyxNQUFULEVBQWlCOztBQUV2QyxlQUFPLFdBQVAsR0FBcUIsRUFBQyxXQUFXLE9BQU8sU0FBUCxFQUFqQyxDQUZ1Qzs7QUFJdkMsZUFBTyxNQUFQLEdBQWdCLHNDQUFlLE9BQU8sV0FBUCxDQUEvQixDQUp1QztPQUFqQixDQUF4Qjs7S0FIRixFQUZzQjtHQUF4QixDQUZGLEVBRjJCO0NBQWQ7Ozs7Ozs7Ozs7Ozs7OztBQ0pmLElBQU0sZUFBZSxnQkFBZjtBQUNOLElBQU0sVUFBVSxPQUFPLE9BQVA7QUFDaEIsSUFBTSxXQUFXLFFBQVEsTUFBUixDQUFlLFlBQWYsRUFBNkIsQ0FBRSxRQUFGLEVBQVksd0JBQVosQ0FBN0IsQ0FBWDs7QUFHTix3Q0FBZSxRQUFmOztrQkFFZTs7O0FDUGY7Ozs7O1FBSWdCO1FBY0E7UUE0RUE7Ozs7QUExRlQsU0FBUyx3QkFBVCxDQUFtQyxNQUFuQyxFQUE0Qzs7QUFFakQsTUFBSSxTQUFTLEVBQVQsQ0FGNkM7O0FBSWpELFVBQVEsT0FBUixDQUFnQixNQUFoQixFQUF3QixVQUFTLEtBQVQsRUFBZ0IsR0FBaEIsRUFBcUI7O0FBRTNDLFdBQU8sSUFBUCxDQUFhLG9C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IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtwcm9jZXNzU2NoZW1hfSBmcm9tICcuL21vbmdvb3NlLXByb2Nlc3Nvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAobmdNb2R1bGUpID0+IHtcclxuXHJcbiAgbmdNb2R1bGUuY29uZmlnKFtcclxuICAgICdmb3JtbHlDb25maWdQcm92aWRlcicsXHJcbiAgICBmb3JtbHlDb25maWdQcm92aWRlciA9PiB7XHJcblxyXG4gICAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcclxuICAgICAgICBuYW1lOiAnbW9uZ29vc2VTY2hlbWEnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vbmdvb3NlLXNjaGVtYS5odG1sJyksXHJcbiAgICAgICAgY29udHJvbGxlcjogWyAnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgICAgICAgJHNjb3BlLmZvcm1PcHRpb25zID0ge2Zvcm1TdGF0ZTogJHNjb3BlLmZvcm1TdGF0ZX07XHJcblxyXG4gICAgICAgICAgJHNjb3BlLmZpZWxkcyA9IHByb2Nlc3NTY2hlbWEoICRzY29wZS5mb3JtT3B0aW9ucyApO1xyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICBdKTtcclxuXHJcbn07XHJcbiIsImNvbnN0IG5nTW9kdWxlTmFtZSA9ICdmb3JtbHlNb25nb29zZSc7XHJcbmNvbnN0IGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcclxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFsgJ2Zvcm1seScsICdmb3JtbHlSZXBlYXRpbmdTZWN0aW9uJyBdKTtcclxuXHJcbmltcG9ydCBtb25nb29zZVNjaGVtYSBmcm9tICcuL2Zvcm1seS10eXBlLW1vbmdvb3NlLXNjaGVtYSc7XHJcbm1vbmdvb3NlU2NoZW1hKG5nTW9kdWxlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlTmFtZTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtpc09iamVjdE9yQXJyYXlMaWtlLCBkZWVwTWVyZ2UsIG1ha2VIdW1hblJlYWRhYmxlLCBjYXBpdGFsaXplfSBmcm9tICcuL3V0aWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRmllbGRzRnJvbVNjaGVtYSggc2NoZW1hICkge1xyXG5cclxuICBsZXQgZmllbGRzID0gW107XHJcblxyXG4gIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWEsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICBmaWVsZHMucHVzaCggZ2V0T3B0aW9uc0Zyb21WYWx1ZSh2YWx1ZSwga2V5KSApO1xyXG5cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZpZWxkcztcclxuICBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbnNGcm9tVmFsdWUodmFsdWUsIGtleSkge1xyXG5cclxuICB2YXIgY29tbW9uT3B0aW9ucyA9IHtcclxuICAgIGtleToga2V5LFxyXG4gICAgdGVtcGxhdGVPcHRpb25zOiB7XHJcbiAgICAgIGxhYmVsOiBtYWtlSHVtYW5SZWFkYWJsZShrZXkpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy9pZiAocHJvcE1ldGFEYXRhLmhhc093blByb3BlcnR5KCdyZXF1aXJlZCcpKSB7XHJcbiAgLy8gIGNvbW1vbk9wdGlvbnMudGVtcGxhdGVPcHRpb25zLnJlcXVpcmVkID0gcHJvcE1ldGFEYXRhLnJlcXVpcmVkO1xyXG4gIC8vfVxyXG5cclxuICB2YXIgdHlwZU9wdGlvbnMgPSB7fTtcclxuICBzd2l0Y2ggKHZhbHVlLmluc3RhbmNlKSB7XHJcbiAgICBjYXNlICgnQXJyYXknKToge1xyXG4gICAgICBpZiAodmFsdWUuc2NoZW1hKSB7XHJcbiAgICAgICAgdHlwZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0eXBlOiAncmVwZWF0U2VjdGlvbicsXHJcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICAgIGJ0blRleHQ6ICdBZGQgJyttYWtlSHVtYW5SZWFkYWJsZSh2YWx1ZS5wYXRoKSxcclxuICAgICAgICAgICAgZmllbGRzOiBnZW5lcmF0ZUZpZWxkc0Zyb21TY2hlbWEoIHZhbHVlLnNjaGVtYSApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlT3B0aW9ucyA9IHtcclxuICAgICAgICAgIHR5cGU6ICdyZXBlYXRTZWN0aW9uJyxcclxuICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge1xyXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgICAgYnRuVGV4dDogJ0FkZCAnK21ha2VIdW1hblJlYWRhYmxlKHZhbHVlLnBhdGgpLFxyXG4gICAgICAgICAgICAvL2ZpZWxkczogWyBnZXRPcHRpb25zRnJvbVZhbHVlKHZhbHVlLCBrZXkpIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY2FzZSAoJ0Jvb2xlYW4nKToge1xyXG4gICAgICB0eXBlT3B0aW9ucyA9IHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnXHJcbiAgICAgIH07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY2FzZSAoJ051bWJlcicpOiB7XHJcbiAgICAgIHR5cGVPcHRpb25zID0ge1xyXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXHJcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7dHlwZTogJ251bWJlcid9XHJcbiAgICAgIH07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgIGNhc2UgKCdTdHJpbmcnKToge1xyXG4gICAgICBpZiAodmFsdWUuZW51bVZhbHVlcyAmJiB2YWx1ZS5lbnVtVmFsdWVzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgdmFyIHR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGlmICh2YWx1ZS5lbnVtVmFsdWVzLmxlbnRoID4gNSkge1xyXG4gICAgICAgICAgdHlwZSA9ICdzZWxlY3QnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlT3B0aW9ucyA9IHtcclxuICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgbGV0IHR5cGUgPSAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSA+IDgwID8gJ3RleHRhcmVhJyA6ICdpbnB1dCc7XHJcbiAgICAgICAgdHlwZU9wdGlvbnMgPSB7dHlwZTogdHlwZX07XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZGVlcE1lcmdlKGNvbW1vbk9wdGlvbnMsIHR5cGVPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NTY2hlbWEoKSB7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBnZXRPSU1Db25maWcoc2NoZW1hLCBvcHRpb25zKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgdmFyIGZpZWxkcyA9IGdlbmVyYXRlRmllbGRzRnJvbVNjaGVtYSggc2NoZW1hICk7XHJcblxyXG4gICAgcmV0dXJuIGZpZWxkcztcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9e3toaWRlUmVwZWF0fX0+PGZvcm1seS1mb3JtIGZpZWxkcz1maWVsZHMgbW9kZWw9ZWxlbWVudCBmb3JtPWZvcm0+PC9mb3JtbHktZm9ybT48L2Rpdj5cIjtcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pO1xyXG52YXIgYXJyYXlQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoW10pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUod29yZCkge1xyXG4gIHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zdWJzdHJpbmcoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlSHVtYW5SZWFkYWJsZShrZXkpIHtcclxuICB2YXIgd29yZHMgPSBrZXkubWF0Y2goL1tBLVphLXpdW2Etel0qL2cpO1xyXG4gIHJldHVybiB3b3Jkcy5tYXAoY2FwaXRhbGl6ZSkuam9pbignICcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3RPckFycmF5TGlrZSh2YWwpIHtcclxuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcclxuICByZXR1cm4gcHJvdG8gPT09IG9iamVjdFByb3RvdHlwZSB8fCBwcm90byA9PT0gYXJyYXlQcm90b3R5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2UoKSB7XHJcbiAgdmFyIHJlcyA9IGFyZ3VtZW50c1swXTtcclxuICBhbmd1bGFyLmZvckVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAoc3JjLCBpbmRleCkge1xyXG4gICAgaWYgKHNyYyAmJiAoaW5kZXggPiAwIHx8IGZhbHNlKSkge1xyXG4gICAgICBhbmd1bGFyLmZvckVhY2goc3JjLCBmdW5jdGlvbiAodmFsLCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiBpc09iamVjdE9yQXJyYXlMaWtlKHZhbCkpIHtcclxuICAgICAgICAgIHZhciBkZWVwUmVzID0gcmVzW3Byb3BdO1xyXG4gICAgICAgICAgaWYgKCFkZWVwUmVzICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xyXG4gICAgICAgICAgICBkZWVwUmVzID0gW107XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFkZWVwUmVzKSB7XHJcbiAgICAgICAgICAgIGRlZXBSZXMgPSB7fTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlc1twcm9wXSA9IGRlZXBNZXJnZShkZWVwUmVzLCB2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNbcHJvcF0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gcmVzO1xyXG59XHJcbiJdfQ==
