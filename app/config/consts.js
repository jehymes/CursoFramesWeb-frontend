angular.module('primeiraApp').constant('consts', {
  appName: 'MEAN - Primeira Aplicação',
  version: '1.0',
  owner: 'JG Desenvolvimentos',
  year: '2021',
  site: 'https://jgdesenvolvimentos.com.br',
  apiUrl: 'https://admin-money-backend.herokuapp.com/api',
  oapiUrl: 'https://admin-money-backend.herokuapp.com/oapi',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
