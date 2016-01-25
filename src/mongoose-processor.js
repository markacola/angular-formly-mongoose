'use strict';

import {isObjectOrArrayLike, deepMerge, makeHumanReadable, capitalize} from './util';

export default ngModule => {

  ngModule.config([ 'formlyConfigProvider', formlyConfigProvider => {

    formlyConfigProvider.setType({
      name: 'mongooseSchema'
    });

  }]);

  ngModule.service('processSchema', function processSchema() {

    return function getOIMConfig(schema, options) {

      options = options || {};

      var fields = generateFieldsFromSchema( schema );

      return fields;

    };

  });

  function generateFieldsFromSchema( schema ) {

    let fields = [];

    angular.forEach(schema, function(value, key) {

      fields.push( getOptionsFromValue(value, key) );

    });

    return fields;

  }

  function getOptionsFromValue(value, key) {

      var commonOptions = {
        key: key,
        templateOptions: {
          label: makeHumanReadable(key)
        }
      };

      //if (propMetaData.hasOwnProperty('required')) {
      //  commonOptions.templateOptions.required = propMetaData.required;
      //}

      var typeOptions = {};
      switch (value.instance) {
        case ('Array'): {
          if (value.schema) {
            typeOptions = {
              type: 'repeatSection',
              templateOptions: {
                type: 'number',
                btnText: 'Add '+makeHumanReadable(value.path),
                fields: generateFieldsFromSchema( value.schema )
              }
            };
          } else {
            typeOptions = {
              type: 'repeatSection',
              templateOptions: {
                type: 'number',
                btnText: 'Add '+makeHumanReadable(value.path),
                //fields: [ getOptionsFromValue(value, key) ]
              }
            };
          }
          break;
        }
        case ('Boolean'): {
          typeOptions = {
            type: 'checkbox'
          };
          break;
        }
        case ('Number'): {
          typeOptions = {
            type: 'input',
            templateOptions: {type: 'number'}
          };
          break;
        }
        default:
        case ('String'): {
          if (value.enumValues && value.enumValues.length > 0) {

            var type = 'radio';
            if (value.enumValues.lenth > 5) {
              type = 'select';
            }
            typeOptions = {
              type: type,
              templateOptions: {
              }
            };

          } else {

            let type = (value && value.length) > 80 ? 'textarea' : 'input';
            typeOptions = {type: type};

          }
          break;
        }
      }
      return deepMerge(commonOptions, typeOptions);
    }

};
