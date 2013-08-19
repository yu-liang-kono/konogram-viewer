(function(){
  var ExhibitionController;
  this.ExhibitionController = ExhibitionController = function($scope, $rootScope, $filter){
    $scope.noMoreKonograms = false;
    $scope.konograms = [];
    $scope.promotionDate = function(promotionObj){
      var dateFilter, dateFormat;
      dateFilter = $filter('date');
      dateFormat = 'yyyy-MM-dd HH:mm:ss';
      if (promotionObj === null) {
        return 'N/A';
      } else if (promotionObj.from === 0 && promotionObj.to === 2147483647) {
        return '???? ~ ????';
      } else if (promotionObj.from === 0 && promotionObj.to !== 2147483647) {
        return '???? ~ ' + dateFilter(promotionObj.to * 1000, dateFormat);
      } else if (promotionObj.from !== 0 && promotionObj.to === 2147483647) {
        return dateFilter(promotionObj.from * 1000, dateFormat) + ' ~ ????';
      } else {
        return dateFilter(promotionObj.from * 1000, dateFormat) + ' ~ ' + dateFilter(promotionObj.to * 1000, dateFormat);
      }
    };
    $scope.$on('clear', function(e){
      $scope.konograms = [];
      $scope.noMoreKonograms = false;
    });
    $scope.$on('newKonograms', function(e, newKonograms){
      $scope.noMoreKonograms = newKonograms.length < 10;
      angular.forEach(newKonograms, function(konogram){
        return $scope.konograms.push(konogram);
      });
    });
    $scope.loadMore = function(){
      var numKonograms, lastKonogramID;
      if ($scope.noMoreKonograms) {
        return;
      }
      numKonograms = $scope.konograms.length;
      lastKonogramID = numKonograms > 0 ? $scope.konograms[numKonograms - 1].id : null;
      $rootScope.$broadcast('loadMore', lastKonogramID);
    };
    $scope.isPromoting = function(promotionObj){
      var t;
      if (promotionObj === null) {
        return false;
      } else {
        t = new Date().getTime() / 1000;
        return promotionObj.from <= t && t <= promotionObj.to;
      }
    };
  };
  ExhibitionController.$inject = ['$scope', '$rootScope', '$filter'];
}).call(this);

(function(){
  var NavbarController;
  this.NavbarController = NavbarController = function($scope, $rootScope){
    var env;
    env = null;
    $scope.setEnv = function(e){
      env = e;
      $rootScope.$broadcast('clear');
      $rootScope.$broadcast('envChanged', e);
    };
    $scope.getEnv = function(){
      return env;
    };
    $scope.setEnv('development');
  };
  NavbarController.$inject = ['$scope', '$rootScope'];
}).call(this);

(function(){
  var SearchController;
  this.SearchController = SearchController = function($scope, $rootScope, $http){
    var API, endpoint, onEnvChanged, beforeQuery, afterQuery, success, error;
    API = {
      development: 'http://yteam.thekono.com/KPI2/konograms',
      production: 'http://www.thekono.com/KPI2/konograms'
    };
    endpoint = API['development'];
    $scope.kid = '';
    $scope.dateSince = null;
    $scope.dateUntil = null;
    $scope.chronological = false;
    $scope.waitingResponse = false;
    onEnvChanged = function(e, env){
      endpoint = API[env];
      return $scope.queryKonograms();
    };
    $scope.clear = function(){
      return $rootScope.$broadcast('clear');
    };
    $scope.queryKonograms = function(konogramID){
      var data, t;
      konogramID == null && (konogramID = null);
      if ($scope.waitingResponse) {
        return;
      }
      data = {
        callback: 'JSON_CALLBACK',
        promotion: 1
      };
      if ($scope.kid !== '') {
        data.owner = $scope.kid;
      }
      t = new Date($scope.dateSince).getTime() / 1000;
      if (!isNaN(t) && t > 0) {
        data.from = t;
      }
      t = new Date($scope.dateUntil).getTime() / 1000;
      if (!isNaN(t) && t > 0) {
        data.to = t;
      }
      if (!$scope.chronological) {
        data.reverse = 1;
      }
      if (konogramID !== null) {
        data[$scope.chronological ? 'after' : 'before'] = konogramID;
      }
      beforeQuery();
      return $http.jsonp(endpoint, {
        params: data
      }).success(success).error(error);
    };
    beforeQuery = function(){
      return $scope.waitingResponse = true;
    };
    afterQuery = function(){
      return $scope.waitingResponse = false;
    };
    success = function(data){
      afterQuery();
      return $rootScope.$broadcast('newKonograms', data);
    };
    error = function(data){
      return afterQuery();
    };
    $scope.$on('envChanged', onEnvChanged);
    $scope.$on('loadMore', function(e, konogramID){
      $scope.queryKonograms(konogramID);
    });
  };
  SearchController.$inject = ['$scope', '$rootScope', '$http'];
}).call(this);
