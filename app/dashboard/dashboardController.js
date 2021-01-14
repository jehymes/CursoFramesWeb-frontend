(function(){
    'use strict'

    angular.module('primeiraApp')
    .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['DashboardService'];

    function dashboardController(DashboardService) {
        //Constantes
        const vm = this;

        //Variáveis
        vm.credit = '';
        vm.debt = '';
        vm.total = '';

        //Escopo de Funções
        vm.getSummary = getSummary;

        //Funções
        function getSummary() {
            DashboardService.getSummary().then(function({credit = 0, debt = 0}){
                vm.credit = credit;
                vm.debt = debt;
                vm.total = credit - debt;
            });            
        }

    }
})()