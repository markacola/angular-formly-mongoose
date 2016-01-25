const ngModuleName = 'formlyRepeatingSection';
const angular = window.angular;
const ngModule = angular.module(ngModuleName, [ 'formly', 'formlyRepeatingSection' ]);

import mongooseProcessor from './mongoose-processor';
mongooseProcessor(ngModule);

export default ngModuleName;
