(function () {
  "use strict";

  angular
    .module("primeiraApp")
    .service("BillingCyclesService", billingCyclesService);

  billingCyclesService.$inject = ["$http", "$httpParamSerializer"];

  function billingCyclesService($http, $httpParamSerializer) {
    //Constantes
    const sv = this;
    const url = "http://localhost:3003/api";

    //Variáveis

    //Funções
    sv.create = function (data) {
      return $http({
        method: "POST",
        url: url + "/billingCycles",
        data: $httpParamSerializer(data),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    sv.read = function () {
      return $http
        .get(url + "/billingCycles")
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    //Verificar funcionamento
    sv.update = function (data) {
      return $http
        .put(`${url}/billingCycles/${data._id}`, data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };

    sv.delete = function (data) {
      return $http
        .delete(url + "/billingCycles/" + data._id, data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    };
  }
})();
