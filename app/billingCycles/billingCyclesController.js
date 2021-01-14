(function() {
    'use strict'
    angular.module('primeiraApp')
    .controller('BillingCyclesController', billingCyclesController);

    billingCyclesController.$inject = ['BillingCyclesService']

    function billingCyclesController(BillingCyclesService) {
        //Constantes
        const vm = this

        //Variáveis
        vm.billingCycle = {}

        //Escopo de Funções
        vm.cadastrarCredito = cadastrarCredito;
        vm.cadastrarDebito = cadastrarDebito;

        //Funções
        function cadastrarCredito() {

        }

        function cadastrarDebito() {
            
        }

    }
})(angular)