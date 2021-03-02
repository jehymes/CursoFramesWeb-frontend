angular.module('primeiraApp').constant('consts', {
  appName: 'MEAN - Primeira Aplicação',
  version: '1.0',
  owner: 'JG Desenvolvimentos',
  year: '2021',
  site: 'https://jgdesenvolvimentos.com.br',
  apiUrl: 'https://primeirapp-api.herokuapp.com/api' /*'http://localhost:3003/api'*/,
  oapiUrl: 'https://primeirapp-api.herokuapp.com/oapi' /*'http://localhost:3003/oapi'*/,
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
