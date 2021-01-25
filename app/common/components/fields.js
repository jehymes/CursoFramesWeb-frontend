(function () {
  'use strict';
  angular.module('primeiraApp').component('fields', {
    bindings: {
      id: '@',
      grid: '@',
      label: '@',
      placeholder: '@',
      type: '@',
      model: '=',
      readonly: '<',
    },
    controller: [
      'gridSystem',
      function (gridSystem) {
        this.$onInit = () =>
          (this.gridClasses = gridSystem.toCssClasses(this.grid));
      },
    ],
    template: `
        <div class="{{ $ctrl.gridClasses }}">
            <div class="form-group">
            <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
            <input 
              ng-model="$ctrl.model" 
              id="{{ $ctrl.id }}" 
              class="form-control" 
              placeholder="{{ $ctrl.placeholder }}" 
              type="{{ $ctrl.type }}"
              ng-readonly="$ctrl.readonly"
              />
            </div>
        </div>
        `,
  });
})(angular);
