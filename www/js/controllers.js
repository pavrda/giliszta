/*
readerApp.controller('emptyController', [ '$scope', '$routeParams', 'dbService', '$q', '$timeout', '$rootScope', '$location', '$route', 
                                        	function($scope, $routeParams, dbService, $q, $timeout, $rootScope, $location, $route) {

}]);
*/

readerApp.controller('emptyController', [ '$scope', '$routeParams', 'dbService', '$q', '$timeout', '$rootScope', '$location', '$route', 
                                        	function($scope, $routeParams, dbService, $q, $timeout, $rootScope, $location, $route) {
	
	$rootScope.actualCategoryTitle = "ZOO Praha";
	$rootScope.actualCategoryLink = "#/";

}]);

readerApp.controller('CategoryCtrl', ['$scope', '$routeParams', 'dbService', '$rootScope',
                                      function($scope, $routeParams, dbService, $rootScope) {
	$scope.init = function() {
		dbService.transaction(function(tx) {
			tx.executeSql(
					'SELECT id,title,image FROM article WHERE category_id=?',
					[ $routeParams.catId ], querySuccess,
					dbService.errorDB);
		}, dbService.errorDB);

		dbService.transaction(function(tx) {
			tx.executeSql(
					'SELECT id, title FROM category WHERE id=?',
					[ $routeParams.catId ], querySuccess2,
					dbService.errorDB);
		}, dbService.errorDB);
		
		
	};

	// Query the success callback
	function querySuccess(tx, results) {
		var len = results.rows.length;
		var ta = [];
		for (var i = 0; i < len; i++)
			ta[i] = results.rows.item(i);
		$scope.categories = ta;
		$scope.catId = $routeParams.catId;			
		$scope.$apply(); // trigger digest
	}

	function querySuccess2(tx, results) {
		var len = results.rows.length;
		if (len == 0) return;
		$rootScope.actualCategoryTitle = results.rows.item(0).title;
		$rootScope.actualCategoryLink = "#/" + results.rows.item(0).id;
		$rootScope.$apply();
	}		
	$scope.init();
	  			
  }]);

readerApp.controller('ArticleCtrl', [ '$scope', '$routeParams', 'dbService', '$rootScope',
                                     	function($scope, $routeParams, dbService, $rootScope) {
                                     		
	$scope.init = function() {
		dbService.transaction(function(tx) {
			tx.executeSql(
					'SELECT txt FROM article WHERE id=?',
					[ $routeParams.artId ], querySuccess,
					dbService.errorDB);
		}, dbService.errorDB);
		
		dbService.transaction(function(tx) {
			tx.executeSql(
					'SELECT id, title FROM category WHERE id=?',
					[ $routeParams.catId ], querySuccess2,
					dbService.errorDB);
		}, dbService.errorDB);
	};
	
	// Query the success callback
	function querySuccess(tx, results) {
		var len = results.rows.length;
		if (len == 0) {
			$scope.htmlContent = '&nbsp;';
		
		} else {
			$scope.htmlContent = results.rows.item(0).txt;
		}
		$scope.$apply(); // trigger digest
	}

	function querySuccess2(tx, results) {
		var len = results.rows.length;
		if (len == 0) return;
		$rootScope.actualCategoryTitle = results.rows.item(0).title;
		$rootScope.actualCategoryLink = "#/" + results.rows.item(0).id;
		$rootScope.$apply();
	}		
	
	
	$scope.init();
	 		
}]);

