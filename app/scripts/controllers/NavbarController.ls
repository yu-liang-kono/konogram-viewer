@NavbarController = NavbarController = ($scope, $rootScope) !->

    env = null

    $scope.setEnv = (e) !->
        env := e
        $rootScope.$broadcast 'clear'
        $rootScope.$broadcast 'envChanged', e

    $scope.getEnv = -> env

    # default environment
    $scope.setEnv 'development'

NavbarController.$inject =
    '$scope'
    '$rootScope'
