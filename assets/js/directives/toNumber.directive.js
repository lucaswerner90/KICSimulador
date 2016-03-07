app.directive('toNumber', function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      scope.$watch(function(){
        console.log(attrs);
      });
    }
  };
});
