@ExhibitionController = ExhibitionController = ($scope, $rootScope) !->

    noMoreKonograms = false

    $scope.konograms = []

    $scope.promotionDate = (promotionObj) ->
        if promotionObj is null then 'N/A'

    $scope.$on 'clear', (e) !->
        console.log 'receive clear event'
        $scope.konograms = []

    $scope.$on 'newKonograms', (e, newKonograms) !->
        noMoreKonograms := newKonograms.length is 0

        angular.forEach newKonograms, (konogram) ->
            $scope.konograms.push konogram

    $scope.loadMore = !->
        if noMoreKonograms then return

        console.log 'loadMore'
        numKonograms = $scope.konograms.length
        lastKonogramID = if numKonograms > 0 then $scope.konograms[numKonograms - 1].id else null
        $rootScope.$broadcast 'loadMore', lastKonogramID

ExhibitionController.$inject =
    '$scope'
    '$rootScope'