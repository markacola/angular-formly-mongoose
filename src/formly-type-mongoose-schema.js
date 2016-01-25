import {processSchema} from './mongoose-processor';

export default ngModule => {
  'use strict';

  ngModule.config([ 'formlyConfigProvider', formlyConfigProvider => {

      formlyConfigProvider.setType({
        name: 'mongooseSchema',
        template: require('./mongoose-schema.html'),
        controller: [ '$scope', function($scope) {

          console.log($scope);
          $scope.formOptions = {formState: $scope.formState};

          $scope.fields = processSchema( $scope.formOptions );

          function getFields(fields) {
            fields = angular.copy(fields);
            return fields;
          }

        }]

      });

    }

  ]);

};
