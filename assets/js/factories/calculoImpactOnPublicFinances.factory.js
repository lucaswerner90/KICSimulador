app.factory('calculoImpactOnPublicFinancesFactory',['$rootScope','calculosGenericosFactory',
function($rootScope,calculosGenericosFactory){


  var calculoImpactOnPublicFinancesFactory={
    calculos:{
    },
    init:function(){

        // Referencia a la fila 41 de hacienda_particular
        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p1=$rootScope.calculos.usuario_particular.conDH.p1.electricidadConsumida;

        // Referencia a la fila 42 de hacienda_particular
        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p2=$rootScope.calculos.usuario_particular.conDH.p2.electricidadConsumida;

        // Referencia a la fila 43 de hacienda_particular
        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p3=$rootScope.calculos.usuario_particular.conDH.p3.electricidadConsumida;

        // Referencia a la fila 16 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p1,$rootScope.datosTarifa.terminoEnergiaConDhP1);

        // Referencia a la fila 18 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p2,$rootScope.datosTarifa.terminoEnergiaConDhP2);

        // Referencia a la fila 20 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p3,$rootScope.datosTarifa.terminoEnergiaConDhP3);

        // Referencia a la fila 39 de hacienda_particular
        calculosGenericosFactory.calculos.calculoSumaProductosArray($rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.valor,$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p1,$rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p1,
        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p2,$rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p2,
      $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.p3,$rootScope.calculos.hacienda_particular.recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p3);

        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.valor=$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.valor.map(Math.round);

        // Calculo de la fila 38 de hacienda_particular
        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.electricidadConsumida=$rootScope.calculos.usuario_particular.sinDH.electricidadConsumida;


        // Calculo de la fila 8 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH,$rootScope.datosTarifa.terminoEnergiaSinDh);

        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH=$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH.map(function(x){
          return Math.round(x*100)/100;
        });


        // Calculo de la fila 37 de hacienda_particular
        calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.valor,$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.electricidadConsumida,$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH);

        $rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.valor=$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.valor.map(Math.round);

        // Calculo fila 36 hacienda_particular
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
  				$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.valor=$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.sinDH.valor;
  			}else{
  				$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.valor=$rootScope.calculos.hacienda_particular.IVAElectricidadConsumida.conDH.electricidadConsumida.valor;
  			}

        // Calculo de la fila 29 de hacienda_particular
        // $rootScope.datosTarifa.terminoEnergiaConDhP1 -> fila 16
        // $rootScope.datosTarifa.terminoEnergiaConDhP2 -> fila 18
        // $rootScope.datosTarifa.terminoEnergiaConDhP3 -> fila 20



        debugger;

      }


    }





    return calculoImpactOnPublicFinancesFactory;





  }]);
