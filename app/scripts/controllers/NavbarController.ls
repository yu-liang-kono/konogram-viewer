NavbarController = ($scope, $rootScope) !->

    env = null

    $scope.setEnv = (e) !->
        env := e
        $rootScope.$broadcast 'envChanged', e
        console.log 'emit envChanged event'

    $scope.getEnv = -> env

    # default environment
    $scope.setEnv 'development'

NavbarController.$inject =
    '$scope'
    '$rootScope'

@NavbarController = NavbarController