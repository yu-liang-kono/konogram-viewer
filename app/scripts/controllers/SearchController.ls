@SearchController = SearchController = ($scope, $rootScope, $http) !->

    API =
        development: 'http://yteam.thekono.com/KPI2/konograms'
        production: 'http://www.thekono.com/KPI2/konograms'

    endpoint = API['production']

    $scope.kid = ''
    $scope.dateSince = null
    $scope.dateUntil = null
    $scope.articleId = ''
    $scope.chronological = false
    $scope.waitingResponse = off

    onEnvChanged = (e, env) ->
        endpoint := API[env]
        $scope.articleId = ''
        do $scope.queryKonograms

    $scope.clear = ->
        $rootScope.$broadcast 'clear'

    $scope.queryKonograms = (konogramID = null) ->
        if $scope.waitingResponse then return

        data = callback: 'JSON_CALLBACK', promotion: 1

        if $scope.kid isnt '' then data.owner = $scope.kid

        t = new Date($scope.dateSince).getTime() / 1000
        if not isNaN(t) and t > 0 then data.from = t

        t = new Date($scope.dateUntil).getTime() / 1000
        if not isNaN(t) and t > 0 then data.to = t

        if $scope.articleId isnt '' then data.article_id = $scope.articleId

        if not $scope.chronological then data.reverse = 1

        if konogramID isnt null
            data[if $scope.chronological then 'after' else 'before'] = konogramID

        do beforeQuery

        $http.jsonp(endpoint, params: data).success(success).error(error)

    beforeQuery = ->
        $scope.waitingResponse = on

    afterQuery = ->
        $scope.waitingResponse = off

    success = (data) ->
        do afterQuery
        $rootScope.$broadcast 'newKonograms', data

    error = (data) ->
        do afterQuery

    $scope.$on 'envChanged', onEnvChanged

    $scope.$on 'loadMore', (e, konogramID) !-> $scope.queryKonograms(konogramID)

    $scope.$on 'articleId', (e, articleId) !->
        $scope.articleId = articleId
        do $scope.clear
        do $scope.queryKonograms

SearchController.$inject =
    '$scope'
    '$rootScope'
    '$http'
