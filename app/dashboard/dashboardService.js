(function () {
    'use strict';

    angular.module('primeiraApp')
    .service('DashboardService', dashboardService);

    dashboardService.$inject = ['$http', 'consts'];

    function dashboardService($http, consts) {
        //Constantes
        const sv = this;
        const url = consts.apiUrl;
        
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