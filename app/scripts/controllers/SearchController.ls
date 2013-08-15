SearchController = ($scope, $rootScope, $http) !->

    API =
        development: 'http://127.0.0.1/KonoServer/konograms'
        production: 'http://yteam.thekono.com/KPI2/konograms'

    endpoint = null
    $scope.kid = ''
    $scope.dateSince = null
    $scope.dateUntil = null

    onEnvChanged = (e, env) ->
        endpoint := API[env]
        queryKonograms()

    queryKonograms = ->

        data = {}

        if $scope.kid isnt '' then data.kid = $scope.kid

        t = new Date($scope.dateSince).getTime() / 1000
        if not isNaN(t) then data.from = t

        t = new Date($scope.dateUntil).getTime() / 1000
        if not isNaN(t) then data.to = t

        $http.get(endpoint, params: data)

    $scope.$on 'envChanged', onEnvChanged


SearchController.$inject =
    '$scope'
    '$rootScope'
    '$http'


@SearchController = SearchController