(function () {
  'use strict';

  angular
    .module('primeiraApp')
    .service('BillingCyclesService', billingCyclesService);

  billingCyclesService.$inject = ['$http', 'consts'];

  function billingCyclesService($http, consts) {
    //Constantes
    const sv = this;
    const url = consts.apiUrl;

    //Variáveis

    //Funções
    sv.create = function (data) {
      return $http.post(url + '/billingCycles',data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    sv.read = function (page) {
      return $http
        .get(`${url}/billingCycles?skip=${(page - 1) * 5}&limit=5`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    //Verificar funcionamento
    sv.update = function (data) {
      return $http.put(`${url}/billingCycles/${data._id}`,data)
      .then(function (response) {
          return response;
      }).catch(function (error) {
          return error;
      })
    };

    sv.delete = function (data) {
      return $http
        .delete(url + '/billingCycles/' + data._id, data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    sv.count = function() {
      return $http.get(url+'/billingCycles/count')
      .then(function (response){
        return response;
      })
      .catch(function (error) {
        return error;
      })
    }
  }
})();
