angular.module('primeiraApp')
.component('valueBox', {
    bindings:{
        grid: '@',
        colorClass: '@',
        value: '@',
        text: '@',
        iconClass: '@'
    },
    controller: [
        'gridSystem',
        function(gridSystem) {
            this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
        }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
        <div class="small-box {{ $ctrl.colorClass }}">
            <div class="inner" style="padding: 20px !important">
                <b><h4>{{ $ctrl.value }}</h4></b>
                <p>{{ $ctrl.text }}</p>
            </div>
            <div class="icon">
                <i class="fa {{ $ctrl.iconClass }}"></i>
            </div>
        </div>
    </div>
    `
})