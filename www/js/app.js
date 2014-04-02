var readerApp = angular.module('readerApp', [
  'ngRoute', 'ngSanitize', 'angular-carousel'
]);

readerApp.config(['$routeProvider',
                  function($routeProvider) {
                    $routeProvider.
                      when('/', {
                        templateUrl: 'tplIndex.html',
                        controller: 'emptyController'
                      }).
                      when('/:catId', {
                          templateUrl: 'tplCategory.html',
                          controller: 'CategoryCtrl'
                        }).
                        when('/:catId/:artId', {
                          templateUrl: 'tplArticle.html',
                          controller: 'ArticleCtrl'
                        }).
                      otherwise({
                          templateUrl: 'tplIndex.html',
                          controller: 'emptyController'
                      });
                  }]);

readerApp.config( [
          '$compileProvider',
          function( $compileProvider )
          {   
//              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|filesystem:http):/);
              $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|filesystem:http):/);	//kvuli obrazkum z filesystemu
              // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
          }
      ]);

readerApp.run(['$rootScope', 'dbService', 
    function($rootScope, dbService) {
	
    document.addEventListener('deviceready', function() {
        $rootScope.$apply(function() {
        	dbService.init();
        });
    });
}]);
