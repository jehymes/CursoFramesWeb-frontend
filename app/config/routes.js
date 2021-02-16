(function () {
  'use strict';

  angular.module('primeiraApp').config([
    '$stateProvider',
    '$httpProvider',
    function ($stateProvider, $httpProvider) {
      $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html"
      }).state('billingCycles', {
        url: "/billingCycles?page",
        templateUrl: "billingCycles/tabs.html"
      })
    
      $httpProvider.interceptors.push('handleResponseError')
    }
  ])
  .run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'AuthFactory',
    function ($rootScope, $http, $location, $window, auth) {
      validateUser()
      $rootScope.$on('$locationChangeStart', () => validateUser())
  
      function validateUser() {
        const user = auth.getUser()
        const authPage = '/auth.html'
        const isAuthPage = $window.location.href.endsWith(authPage)
        
        if (!user && !isAuthPage) {
          $window.location.href = authPage
        } else if (user && !user.isValid) {
          auth.validateToken(user.token, (err, valid) => {
            if (!valid) {
              $window.location.href = authPage
            } else {
              user.isValid = true
              $http.defaults.headers.common.Authorization = user.token
              isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
            }
          })
        }
      }
    }
  ])
})(angular);
