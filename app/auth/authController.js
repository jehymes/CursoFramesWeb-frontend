(function () {
  'use strict';

  angular.module('primeiraApp').controller('AuthController', authController);

  authController.$inject = ['$location', 'MsgsFactory', 'AuthFactory'];

  function authController($location, msgs, auth) {
    //Constantes
    const vm = this;

    //Variáveis
    vm.loginMode = true
    
    //Funções
    vm.changeMode = () => vm.loginMode = !vm.loginMode
    
    vm.login = () => {
      auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
    }

    vm.signup = () => {
      auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
    }
    vm.getUser = () => auth.getUser()

    vm.logout = () => {
      auth.logout(() => $location.path('/'))
    }
      
  }
})(angular);
