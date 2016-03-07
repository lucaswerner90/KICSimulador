app.directive('convertPercentage',function(){

  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      var formato=function(){

      }
      var soloNumeros=function(val){
        return parseFloat(val || '');
      }

      ngModel.$parsers.unshift(soloNumeros);


    }
  };
});
