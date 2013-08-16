// Generated by LiveScript 1.2.0
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
      } else if (promotionObj.from === 0 && promotionObj.to !== 2147483647) {
        return '???? - ' + dateFilter(promotionObj.to * 1000, dateFormat);
      } else if (promotionObj.from !== 0 && promotionObj.to === 2147483647) {
        return dateFilter(promotionObj.from * 1000, dateFormat) + ' - ????';
      } else {
        return dateFilter(promotionObj.from * 1000, dateFormat) + ' - ' + dateFilter(promotionObj.to * 1000, dateFormat);
      }
    };
    $scope.$on('clear', function(e){
      $scope.konograms = [];
      $scope.noMoreKonograms = false;
    });
    $scope.$on('newKonograms', function(e, newKonograms){
      $scope.noMoreKonograms = newKonograms.length === 0;
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
