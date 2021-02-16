(function () {
    'use strict';

    angular.module('primeiraApp')
    .service('DashboardService', dashboardService);

    dashboardService.$inject = ['$http'];

    function dashboardService($http) {
        //Constantes
        const sv = this;
        const url = 'http://localhost:3003/api';
        
        //Variáveis

        //Funções
        sv.getSummary = function() {
            return $http.get(url+'/billingSummary')
            .then(function(response) {
                return response.data
            })
        }
    }
})()