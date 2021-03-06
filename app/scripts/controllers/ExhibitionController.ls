@ExhibitionController = ExhibitionController = ($scope, $rootScope, $filter) !->

    KONOGRAM_SINGLE_PAGE_URL =
        development: 'http://yteam.thekono.com/wolverine/feeds/konograms/'
        production: 'http://www.thekono.com/feeds/konograms/'

    $scope.noMoreKonograms = false
    $scope.konograms = []
    $scope.env = 'production'

    $scope.promotionDate = (promotionObj) ->
        dateFilter = $filter 'date'
        dateFormat = 'yyyy-MM-dd HH:mm:ss'

        if promotionObj is null
            'N/A'
        else if promotionObj.from is 0 and promotionObj.to is 2147483647
            '???? ~ ????'
        else if promotionObj.from is 0 and promotionObj.to isnt 2147483647
            '???? ~ ' + dateFilter(promotionObj.to * 1000, dateFormat)
        else if promotionObj.from isnt 0 and promotionObj.to is 2147483647
            dateFilter(promotionObj.from * 1000, dateFormat) + ' ~ ????'
        else
            dateFilter(promotionObj.from * 1000, dateFormat) + ' ~ ' +
            dateFilter(promotionObj.to * 1000, dateFormat)

    $scope.$on 'clear', (e) !->
        $scope.konograms = []
        $scope.noMoreKonograms = false

    $scope.$on 'newKonograms', (e, newKonograms) !->
        $scope.noMoreKonograms = newKonograms.length < 10

        angular.forEach newKonograms, (konogram) ->
            $scope.konograms.push konogram

    $scope.$on 'envChanged', (e, env) !->
        $scope.env = env

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

    $scope.copyArticleId = (articleId) ->
        $rootScope.$broadcast 'articleId', articleId

    $scope.getKonogramPageURL = (konogramId) ->
        KONOGRAM_SINGLE_PAGE_URL[$scope.env] + konogramId

ExhibitionController.$inject =
    '$scope'
    '$rootScope',
    '$filter'
