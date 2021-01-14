(function () {
    'use strict';

    angular.module('primeiraApp')
    .service('DashboardService', dashboardService);

    dashboardService.$inject = ['$http', '$q'];

    function dashboardService($http, $q) {
        //Constantes
        const sv = this;
        const url = 'http://localhost:3003/api';
        
        //Variáveis

        //Funções
        sv.getSummary = function() {
            var deffered = $q.defer();
            $http.get(url+'/billingSummary')
            .then(function(response) {
                deffered.resolve(response.data)
            })

            return deffered.promise;
        }
    }
})()