(function () {
  "use strict";
  angular
    .module("primeiraApp")
    .controller("BillingCyclesController", billingCyclesController);

  billingCyclesController.$inject = [
    "BillingCyclesService",
    "MsgsFactory",
    "TabsFactory",
    "$location"
  ];

  function billingCyclesController(BillingCyclesService, msgs, tabs, $location) {
    //Constantes
    const vm = this;
    vm.statusDebts = ['PAGO', 'PENDENTE', 'AGENDADO'];

    //Variáveis
    vm.billingCycles = {};
    vm.billingCycle = {};
    vm.credit = 0;
    vm.debt = 0;
    vm.total = 0;
    vm.pages;

    //Escopo de Funções
    vm.initController = initController;
    vm.insert = insert;
    vm.cloneBilling = cloneBilling;
    vm.refresh = refresh;
    vm.update = update;
    vm.deleteRegister = deleteRegister;
    vm.showTabUpdate = showTabUpdate;
    vm.showTabDelete = showTabDelete;
    vm.addCredito = addCredito;
    vm.copyCredito = copyCredito;
    vm.removeCredito = removeCredito;
    vm.addDebito = addDebito;
    vm.copyDebito = copyDebito;
    vm.removeDebito = removeDebito;
    vm.calculateValues = calculateValues;

    //Funções
    function initController() {
      refresh();
    }

    function insert() {
      BillingCyclesService.create(vm.billingCycle).then(function (response) {
        verifyResponse(response);
      });
    }

    function cloneBilling(clone) {
      var data = {
        name: clone.name,
        month: clone.month,
        year: clone.year,
        credits: clone.credits,
        debts: clone.debts
      };

      BillingCyclesService.create(data).then(function (response) {
        verifyResponse(response);
      });
    }

    function refresh() {
      const page = parseInt($location.search().page) || 1;

      BillingCyclesService.read(page).then(function (response) {
        vm.billingCycle = { credits: [{}], debts: [{}] };
        vm.billingCycles = response.data;
        calculateValues();
        
        BillingCyclesService.count()
        .then(function (response) {
          vm.pages = Math.ceil(response.data.value / 5)
          tabs.show(vm, { tabList: true, tabCreate: true });
        })
      });      
    }

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
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        msgs.addSuccess("Operação realizada com sucesso!");
        refresh();
      } else if (response.status === 500 || response.status === 400) {
        Object.keys(response.data.errors).forEach((element) => {
          msgs.addError(response.data.errors[element].message);
        })        
      } else {
        msgs.addError("Ops! Parece que encontramos um problema...");
      }

      if (callback && typeof callback === "function") {
        callback();
      }
    }

    function addCredito(index) {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    function copyCredito(index, {name, value}) {
      vm.billingCycle.credits.splice(index + 1, 0, {name, value})
      calculateValues();
    }

    function removeCredito(index) {
      if(vm.billingCycle.credits.length > 1){
        vm.billingCycle.credits.splice(index, 1)
      } else if (vm.billingCycle.credits.length === 1) {
        vm.billingCycle.credits = [{}];
      }

      calculateValues();
    }

    function addDebito(index) {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    function copyDebito(index, {name, value, status}) {
      vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
      calculateValues();
    }

    function removeDebito(index) {
      if(vm.billingCycle.debts.length > 1){
        vm.billingCycle.debts.splice(index, 1)
      } else if (vm.billingCycle.debts.length === 1) {
        vm.billingCycle.debts = [{}];
      }

      calculateValues();
    }

    function calculateValues() {
      vm.credit = 0;
      vm.debt = 0;

      if(vm.billingCycle){
        vm.billingCycle.credits.forEach(function({value}){
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
        })
      }

      if(vm.billingCycle){
        vm.billingCycle.debts.forEach(function({value}){
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
        })
      }

      vm.total = vm.credit - vm.debt;
    }
  }
})(angular);
