(function(){
    'use strict'

    angular.module('primeiraApp')
    .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['$scope', 'DashboardService'];

    function dashboardController($scope, DashboardService) {
        var vm = this;

        vm.getSummary = getSummary;

        vm.credit = '';
        vm.debt = '';
        vm.total = '';

        function getSummary() {
            DashboardService.getSummary().then(function({credit = 0, debt = 0}){
                vm.credit = credit;
                vm.debt = debt;
                vm.total = credit - debt;
            });            
        }

    }
})()