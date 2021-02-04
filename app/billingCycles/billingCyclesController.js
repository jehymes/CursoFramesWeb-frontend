(function () {
  "use strict";
  angular
    .module("primeiraApp")
    .controller("BillingCyclesController", billingCyclesController);

  billingCyclesController.$inject = [
    "BillingCyclesService",
    "MsgsFactory",
    "TabsFactory"
  ];

  function billingCyclesController(
    BillingCyclesService,
    msgs,
    tabs
  ) {
    //Constantes
    const vm = this;

    //Variáveis
    vm.billingCycles = {};
    vm.billingCycle = {};

    //Escopo de Funções
    vm.initController = initController;
    vm.insert = insert;
    vm.refresh = refresh;
    vm.update = update; //Verificar Funcionamento
    vm.deleteRegister = deleteRegister;
    vm.showTabUpdate = showTabUpdate;
    vm.showTabDelete = showTabDelete;

    //Funções
    function initController() {
      refresh();
    }

    function insert(data) {
      BillingCyclesService.create(data).then(function (response) {
        verifyResponse(response);
      });
    }

    function refresh() {
      BillingCyclesService.read().then(function (response) {
        vm.billingCycle = {};
        vm.billingCycles = response.data;
        tabs.show(vm, { tabList: true, tabCreate: true });
      });
    }

    //Verificar Funcionamento
    function update() {
      BillingCyclesService.update(vm.billingCycle).then(function (response) {
        verifyResponse(response);
      });
    }

    function deleteRegister() {
      BillingCyclesService.delete(vm.billingCycle).then(function (response) {
        verifyResponse(response);
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

    function verifyResponse(response, callback) {
      console.log(response);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        msgs.addSuccess("Operação realizada com sucesso!");
        refresh();
      } else if (response.status === 500) {
        msgs.addError(response.data.errors);
      } else {
        msgs.addError("Ops! Parece que encontramos um problema...");
      }

      if (callback && typeof callback === "function") {
        callback();
      }
    }
  }
})(angular);
