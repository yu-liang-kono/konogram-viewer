@ExhibitionController = ExhibitionController = ($scope, $rootScope, $filter) !->

    $scope.noMoreKonograms = false
    $scope.konograms = []

    $scope.promotionDate = (promotionObj) ->
        dateFilter = $filter 'date'
        dateFormat = 'yyyy-MM-dd HH:mm:ss'

        if promotionObj is null
            'N/A'
        else if promotionObj.from is 0 and promotionObj.to isnt 2147483647
            '???? - ' + dateFilter(promotionObj.to * 1000, dateFormat)
        else if promotionObj.from isnt 0 and promotionObj.to is 2147483647
            dateFilter(promotionObj.from * 1000, dateFormat) + ' - ????'
        else
            dateFilter(promotionObj.from * 1000, dateFormat) + ' - ' +
            dateFilter(promotionObj.to * 1000, dateFormat)

    $scope.$on 'clear', (e) !->
        $scope.konograms = []
        $scope.noMoreKonograms = false

    $scope.$on 'newKonograms', (e, newKonograms) !->
        $scope.noMoreKonograms = newKonograms.length < 10

        angular.forEach newKonograms, (konogram) ->
            $scope.konograms.push konogram

    $scope.loadMore = !->
        if $scope.noMoreKonograms then return

        numKonograms = $scope.konograms.length
        lastKonogramID = if numKonograms > 0 then $scope.konograms[numKonograms - 1].id else null
        $rootScope.$broadcast 'loadMore', lastKonogramID

    $scope.isPromoting = (promotionObj) ->
        if promotionObj is null
            false
        else
            t = new Date().getTime() / 1000
            promotionObj.from <= t <= promotionObj.to

ExhibitionController.$inject =
    '$scope'
    '$rootScope',
    '$filter'