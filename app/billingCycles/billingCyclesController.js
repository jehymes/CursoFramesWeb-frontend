(function () {
  'use strict';
  angular
    .module('primeiraApp')
    .controller('BillingCyclesController', billingCyclesController);

  billingCyclesController.$inject = [
    'BillingCyclesService',
    'MsgsFactory',
    'TabsFactory',
  ];

  function billingCyclesController(BillingCyclesService, msgs, tabs) {
    //Constantes
    const vm = this;

    //Variáveis
    vm.billingCycles = {};
    vm.billingCycle = {};

    //Escopo de Funções
    vm.initController = initController;
    vm.insert = insert;
    vm.refresh = refresh;
    vm.update = update;
    vm.deleteRegister = deleteRegister;
    vm.showTabUpdate = showTabUpdate;
    vm.showTabDelete = showTabDelete;

    //Funções
    function initController() {
      refresh();
    }

    function insert(data) {
      BillingCyclesService.create(data)
        .then(function () {
          msgs.addSuccess('Operação realizada com sucesso!');
          refresh();
        })
        .catch(function (error) {
          msgs.addError(error);
        });
    }

    function refresh() {
      BillingCyclesService.read().then(function (response) {
        vm.billingCycle = {};
        vm.billingCycles = response;
        tabs.show(vm, { tabList: true, tabCreate: true });
      });
    }

    function update() {
      BillingCyclesService.update(vm.billingCycle)
      .then(function() {
          refresh();
          msgs.addSuccess('Operação realizada com sucesso!');
      }).catch(function(err) {
          msgs.addError(err.errors);
      });
    }

    function deleteRegister() {
      BillingCyclesService.delete(vm.billingCycle)
        .then(function () {
          refresh();
          msgs.addSuccess('Operação realizada com sucesso!');
        })
        .catch(function (error) {
          msgs.addError(error);
        });
    }

    function showTabUpdate(billingCycle) {
      vm.billingCycle = billingCycle;
      tabs.show(vm, { tabUpdate: true });
    }

    function showTabDelete(billingCycle) {
      vm.billingCycle = billingCycle;
      tabs.show(vm, { tabDelete: true });
    }
  }
})(angular);
