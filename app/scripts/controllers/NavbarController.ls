@NavbarController = NavbarController = ($scope, $rootScope) !->

    env = null

    $scope.setEnv = (e) !->
        env := e
        console.log 'emit clear event'
        $rootScope.$broadcast 'clear'
        console.log 'emit envChanged event'
        $rootScope.$broadcast 'envChanged', e

    $scope.getEnv = -> env

    # default environment
    $scope.setEnv 'development'

NavbarController.$inject =
    '$scope'
    '$rootScope'