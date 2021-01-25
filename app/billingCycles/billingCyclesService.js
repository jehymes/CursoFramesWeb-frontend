(function () {
  'use strict';

  angular
    .module('primeiraApp')
    .service('BillingCyclesService', billingCyclesService);

  billingCyclesService.$inject = ['$http', '$q', '$httpParamSerializer'];

  function billingCyclesService($http, $q, $httpParamSerializer) {
    //Constantes
    const sv = this;
    const url = 'http://localhost:3003/api';

    //Variáveis

    //Funções
    sv.create = function (data) {
      var deffered = $q.defer();

      $http({
        method: 'POST',
        url: url + '/billingCycles',
        data: $httpParamSerializer(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // Necessário para especificar o tipo de conteúdo
      }).then(
        function (response) {
          deffered.resolve(response.data);
        },
        function (error) {
          deffered.resolve(error.errors);
        }
      );

      return deffered.promise;
    };

    sv.read = function () {
      var deffered = $q.defer();
      $http.get(url + '/billingCycles').then(
        function (response) {
          deffered.resolve(response.data);
        },
        function (error) {
          deffered.resolve(error.errors);
        }
      );

      return deffered.promise;
    };

    sv.update = function (data) {
      const updateUrl = `${url + '/billingCycles'}/${data._id}`;
      var deffered = $q.defer();
      $http.put(updateUrl, data)
      .then(function (response) {
          deffered.resolve(response.data);
      }).catch(function (error) {
        deffered.reject(error.errors);
      });
      return deffered.promise;
    };

    sv.delete = function (data) {
      const deleteUrl = `${url + '/billingCycles'}/${data._id}`;
      var deffered = $q.defer();
      $http.delete(deleteUrl, data).then(
        function (response) {
          deffered.resolve(response.data);
        },
        function (error) {
          deffered.resolve(error.errors._id.message);
        }
      );

      return deffered.promise;
    };
  }
})();
