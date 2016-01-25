const ngModuleName = 'formlyMongoose';
const angular = window.angular;
const ngModule = angular.module(ngModuleName, [ 'formly', 'formlyRepeatingSection' ]);

import mongooseSchema from './formly-type-mongoose-schema';
mongooseSchema(ngModule);

export default ngModuleName;
