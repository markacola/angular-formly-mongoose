'use strict';

import {processSchema} from './mongoose-processor';

export default (ngModule) => {

  ngModule.config([
    'formlyConfigProvider',
    formlyConfigProvider => {

      formlyConfigProvider.setType({
        name: 'mongooseSchema',
        template: require('./mongoose-schema.html'),
        controller: [ '$scope', function($scope) {

          $scope.formOptions = {formState: $scope.formState};

          $scope.fields = processSchema( $scope.formOptions );

        }]

      });

    }

  ]);

};
