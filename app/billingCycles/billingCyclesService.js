(function () {
  'use strict';

  angular
    .module('primeiraApp')
    .service('BillingCyclesService', billingCyclesService);

  billingCyclesService.$inject = ['$http', '$q'];

  function billingCyclesService($http, $q) {
    //Constantes
    const sv = this;
    const url = 'http://localhost:3003/api';

    //Variáveis

    //Funções
    sv.create = function () {
      var deffered = $q.defer();
      $http.post(url + '/billingCycles', data).then(function (response) {
        deffered.resolve(response.data);
      });

      return deffered.promise;
    };
  }
})();
