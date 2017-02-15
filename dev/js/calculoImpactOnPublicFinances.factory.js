app.factory('calculoImpactOnPublicFinancesFactory',['$rootScope','calculosGenericosFactory',
function($rootScope,calculosGenericosFactory){


  var calculoImpactOnPublicFinancesFactory={
    calculos:{
      calculoCashflowAcumulado:function(){
        var calculo=[];
        calculo[0]=$rootScope.calculos[$rootScope.config.tipoHacienda].diferenciaRecaudacion.valor[0];
        for (var i = 1; i < $rootScope.annos; i++) {
          calculo[i]=calculo[i-1]+$rootScope.calculos[$rootScope.config.tipoHacienda].diferenciaRecaudacion.valor[i];
        }

        return calculo;
      },
      calculoRecaudacionEscenarioConFV: function calculoRecaudacionEscenarioConFV(){
        var calculo=[];

        calculo[0]=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAAlquilerContador.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.valor-
        $rootScope.calculos[$rootScope.config.tipoHacienda].ayudasPublicasALaInversion.valor+
        $rootScope.calculos[$rootScope.config.tipoHacienda].incrementoImpuestoSociedadesInstalador.valor;


        for (var i = 1; i < $rootScope.annos; i++) {
          calculo[i]=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAAlquilerContador.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor[i];
        }


        return calculo;
      },
      calculoRecaudacionEscenarioConFVEmpresa: function calculoRecaudacionEscenarioConFVEmpresa(){
        var calculo=[];

        calculo[0]=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.valor[0]+
        $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor[0]-
        $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades[0]-
        $rootScope.calculos[$rootScope.config.tipoHacienda].ayudasPublicasALaInversion.valor+
        $rootScope.calculos[$rootScope.config.tipoHacienda].incrementoImpuestoSociedadesInstalador.valor;

        for (var i = 1; i < $rootScope.annos; i++) {
          calculo[i]=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.valor[i]+
          $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor[i]-
          $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades[i];

        }


        return calculo;
      },
      calculoSumaDeTres: function(dato1,dato2,dato3){
        var calculo=[];
        for (var i = 0; i < $rootScope.annos; i++) {
          calculo[i]=dato1[i]+dato2[i]+dato3[i];
        }
        return calculo;
      }
    },
    init:function(){

        // Referencia a la fila 41 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p1=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadConsumida;

        // Referencia a la fila 42 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p2=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadConsumida;

        // Referencia a la fila 43 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p3=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadConsumida;

        // Referencia a la fila 16 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p1,$rootScope.datosTarifa.terminoEnergiaConDhP1);

        // Referencia a la fila 18 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p2,$rootScope.datosTarifa.terminoEnergiaConDhP2);

        // Referencia a la fila 20 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA($rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p3,$rootScope.datosTarifa.terminoEnergiaConDhP3);

        // Referencia a la fila 39 de hacienda_particular
        calculosGenericosFactory.calculos.calculoSumaProductosArray($rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p1,$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p1,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p2,$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p2,
      $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p3,$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p3);

        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.valor.map(Math.round);

        // Calculo de la fila 38 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.electricidadConsumida=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadConsumida;


        // Calculo de la fila 8 de hacienda_particular
        if($rootScope.config.tipoUsuario=='usuario_empresa'){
          calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE(
            $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH,$rootScope.datosTarifa.terminoEnergiaSinDh
          );
        }else{
          calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA(
            $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH,$rootScope.datosTarifa.terminoEnergiaSinDh
          );
        }

        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH.map(function(x){
          return Math.round(x*100)/100;
        });


        // Calculo de la fila 37 de hacienda_particular
        calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.terminoDeEnergiaSinDH);

        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.valor.map(Math.round);

        // Calculo fila 36 hacienda_particular
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
  				$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.valor;
  			}else{
  				$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.valor;
  			}

        // Calculo de la fila 29 de hacienda_particular
        // $rootScope.datosTarifa.terminoEnergiaConDhP1 -> fila 16
        // $rootScope.datosTarifa.terminoEnergiaConDhP2 -> fila 18
        // $rootScope.datosTarifa.terminoEnergiaConDhP3 -> fila 20
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p1,$rootScope.datosTarifa.terminoEnergiaConDhP1);

        // Calculo de la fila 30 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p2,$rootScope.datosTarifa.terminoEnergiaConDhP2);

        // Calculo de la fila 31 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p3,$rootScope.datosTarifa.terminoEnergiaConDhP3);

        // Calculo fila 47 hacienda_particular
        calculosGenericosFactory.calculos.calculoSumaProductosArray($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p1,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p1,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p2,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p2,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.conDH.electricidadConsumida.p3,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p3);

        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.valor.map(Math.round);

        //  $rootScope.datosTarifa.terminoEnergiaSinDh  ->  fila 9 de hacienda_particular

        // Calculo fila 26 hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.terminoDeEnergiaSinDH, $rootScope.datosTarifa.terminoEnergiaSinDh);

        // Calculo fila 46 hacienda_particular
        calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.terminoDeEnergiaSinDH,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadConsumida.sinDH.electricidadConsumida);

        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.valor.map(Math.round);

        // Calculo fila 45

        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
  				$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.valor;
  			}else{
  				$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.valor;
  			}

        // Calculo de la fila 52
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida;

        // Caclulo de la fila 50 de hacienda_particular
        if($rootScope.config.tipoUsuario=='usuario_empresa'){
          calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE(
            $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.IVASinCuotaBN,
            $rootScope.calculos.sistema_electrico.sinDH.cuotaBN
          );
        }else{
          calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIVA(
            $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.IVASinCuotaBN,
            $rootScope.calculos.sistema_electrico.sinDH.cuotaBN
          );
        }


        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.IVASinCuotaBN=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.IVASinCuotaBN.map(function(x){
          return Math.round(x*100)/100;
        });

        // Calculo de la fila 49 de hacienda_particular
        calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.IVASinCuotaBN,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.electricidadAutoconsumidaDeFormaDiferida);


        // Calculo de la fila 57 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p1.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaDeFormaDiferida;

        // Calculo de la fila 61 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p2.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaDeFormaDiferida;

        // Calculo de la fila 65 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p3.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaDeFormaDiferida;

        // Calculo de la fila 56 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p1.cuotaBN=$rootScope.calculos.sistema_electrico.conDH.p1.peajesDeBNConDH;

        // Calculo de la fila 60 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p2.cuotaBN=$rootScope.calculos.sistema_electrico.conDH.p2.peajesDeBNConDH;

        // Calculo de la fila 64 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p3.cuotaBN=$rootScope.calculos.sistema_electrico.conDH.p3.peajesDeBNConDH;

        // Calculo de la fila 53 de hacienda_particular
        calculosGenericosFactory.calculos.calculoSumaProductos($rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.valor,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p1.cuotaBN,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p1.electricidadAutoconsumidaDeFormaDiferida,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p2.cuotaBN,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p2.electricidadAutoconsumidaDeFormaDiferida,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p3.cuotaBN,
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p3.electricidadAutoconsumidaDeFormaDiferida);

        // Calculo de la fila 48 de hacienda_particular
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.valor;
        }else{
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.valor;
        }

        // Calculo de la fila 68 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.sinDH.cuotaBN,$rootScope.calculos.sistema_electrico.sinDH.cuotaBN);

        // Calculo de la fila 67 de hacienda_particular
        calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.sinDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.sinDH.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.sinDH.cuotaBN);

        // Calculo de la fila 71 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p1,$rootScope.calculos.sistema_electrico.conDH.p1.peajesDeBNConDH);
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p1=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p1.map(function(x){
          return Math.round(x*100)/100;
        });
        // Calculo de la fila 72 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p2,$rootScope.calculos.sistema_electrico.conDH.p2.peajesDeBNConDH);
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p2=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p2.map(function(x){
          return Math.round(x*100)/100;
        });
        // Calculo de la fila 73 de hacienda_particular
        calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloIE($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p3,$rootScope.calculos.sistema_electrico.conDH.p3.peajesDeBNConDH);
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p3=$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p3.map(function(x){
          return Math.round(x*100)/100;
        });

        // Calculo de la fila 69 de hacienda_particular
        calculosGenericosFactory.calculos.calculoSumaProductosArray(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p1,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p1.electricidadAutoconsumidaDeFormaDiferida,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p2,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p2.electricidadAutoconsumidaDeFormaDiferida,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.p3,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAElectricidadAutoconsumidaDiferida.conDH.p3.electricidadAutoconsumidaDeFormaDiferida
        );

        // Calculo de la fila 66 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.valor=calculosGenericosFactory.calculos.devolverWithoutHD($rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.sinDH.valor,$rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumidaFormaDiferida.conDH.valor);

        // Calculo de la fila 75 de hacienda_particular
        calculosGenericosFactory.calculos.calculoArrayEntreProducto($rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valorBasePeajeRespaldo,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.valor);

        // Calculo de la fila 74 de hacienda_particular
        calculosGenericosFactory.calculos.calculoArrayDatoFijo(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valorBasePeajeRespaldo,
          $rootScope.IVA
        );
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAPeajeRespaldo.valor.map(Math.round);

        // Calculamos la fila 78 de hacienda_particular
        calculosGenericosFactory.calculos.calcularProductoIPC(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.IVACostesOM.valor,
          $rootScope.calculos.inputs.costesDeOM*$rootScope.IVA
        );

        // Calculo de la fila 81 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.IVACosteCambioInversorActualizado.IVACosteCambioInversor=$rootScope.objetoTabla.power*0.3*1000*$rootScope.IVA;

        // Calculo fila 80 hacienda_particular
        // Fila 84 hacienda_particular -->  $rootScope.calculos.inputs.costesOM.incrementoCosteInversorIPCMaduracion
        // Fila 82 hacienda_particular -->  $rootScope.objetoTabla.power
        // Fila 83 hacienda_particular -->  0.3
        // Fila 85 hacienda_particular -->  $rootScope.vidaUtilInversor
        calculosGenericosFactory.calculos.calculoCosteCambioInversorConIVAActualizadoParametros(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.IVACosteCambioInversorActualizado.valor,
          $rootScope.calculos.inputs.costesOM.incrementoCosteInversorIPCMaduracion
        );

        // Calculo de la fila 77 de hacienda_particular
        calculosGenericosFactory.calculos.calculoSuma(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.IVACosteCambioInversorActualizado.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVACostesOM.IVACostesOM.valor
        );

        // Calculo fila 86 hacienda_particular
        calculosGenericosFactory.calculos.calcularProductoIPC(
          $rootScope.calculos[$rootScope.config.tipoHacienda].IVAAlquilerContador.valor,
          $rootScope.calculos.inputs.alquilerDeContadores.conFV*$rootScope.IVA
        );

        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAAlquilerContador.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAAlquilerContador.valor.map(Math.round);

        // Calculo fila 115 hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.costeSeguro=$rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro;

        // Calculo fila 88 hacienda_particular
        calculosGenericosFactory.calculos.calculoArrayDatoFijo(
          $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.costeSeguro,
          0.04
        );

        // Calculo de la fila 88 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].impuestoPrimasSeguros.valor.map(Math.round);

        // Calculo de la fila 92 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.inversionSinIVA=$rootScope.objetoTabla.power*$rootScope.outputs.generalChar.epc*1.15*1000;

        // Calculo de la fila 91 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.inversionSinIVA*$rootScope.IVA;


        // Calculo de la fila 96 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].ayudasPublicasALaInversion.porcentajeDeAyudasPublicas=parseInt($rootScope.outputs.modelParams.investmentAids);

        // Calculo de la fila 95 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].ayudasPublicasALaInversion.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.inversionSinIVA*($rootScope.calculos[$rootScope.config.tipoHacienda].ayudasPublicasALaInversion.porcentajeDeAyudasPublicas/100);

        // Calculo de la fila 97 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].incrementoImpuestoSociedadesInstalador.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].IVAInversion.inversionSinIVA*0.15*0.25;

        // Calculo de la fila 35 de hacienda_particular
        // $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioConFV.valor
        if($rootScope.config.tipoUsuario=='usuario_particular'){
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioConFV.valor=this.calculos.calculoRecaudacionEscenarioConFV();
        }else{
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioConFV.valor=this.calculos.calculoRecaudacionEscenarioConFVEmpresa();
        }



        // Calculo fila 8 hacienda_particular
        // $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.IVATerminoEnergiaSinDH
        // $rootScope.datosTarifa.terminoEnergiaSinDh
        if($rootScope.config.tipoUsuario=='usuario_empresa'){
          calculosGenericosFactory.calculos.calcularProductoIPC(
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.IVATerminoEnergiaSinDH,
            $rootScope.datosTarifa.terminoEnergiaSinDh*$rootScope.IE
          );
        }else{
          calculosGenericosFactory.calculos.calcularProductoIPC(
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.IVATerminoEnergiaSinDH,
            $rootScope.datosTarifa.terminoEnergiaSinDh*$rootScope.IVA
          );

        }

        // Calculo fila 6 hacienda_particular
        // $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.valor
        // J7 ->  $rootScope.objetoTabla.demand
        calculosGenericosFactory.calculos.calculoProductoFijoEntre100(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.valor,
          $rootScope.objetoTabla.demand,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.IVATerminoEnergiaSinDH
        );

        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.valor.map(Math.round);

        // Calculo fila 10 hacienda_particular
        // $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor
        calculosGenericosFactory.calculos.calculoSumaProductos(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor,
          $rootScope.objetoTabla.demandP1,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p1,
          $rootScope.objetoTabla.demandP2,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p2,
          $rootScope.objetoTabla.demandP3,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.IVATerminoEnergiaConDH.p3
        );
        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor.map(Math.round);


        // Calculo de la fila 5 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAElectricidadConsumida.valor=calculosGenericosFactory.calculos.devolverWithoutHD(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.sinDH.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor
        );

        // Calculo fila 25 hacienda_particular
        //
        // fila 26 -> $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.terminoDeEnergiaSinDH
        calculosGenericosFactory.calculos.calculoProductoFijoEntre100(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.sinDH.valor,
          $rootScope.objetoTabla.demand,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.sinDH.terminoDeEnergiaSinDH
        );

        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.sinDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.sinDH.valor.map(Math.round);


        // Calculo de la fila 27
        // fila 29 -> $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p1
        // fila 12 -> $rootScope.objetoTabla.demandP1

        calculosGenericosFactory.calculos.calculoSumaProductos(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor,
          $rootScope.objetoTabla.demandP1,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p1,
          $rootScope.objetoTabla.demandP2,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p2,
          $rootScope.objetoTabla.demandP3,
          $rootScope.calculos[$rootScope.config.tipoHacienda].IEElectricidadConsumida.conDH.p3
        );

        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor.map(Math.round);

        // Calculo de la fila 24 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.valor=calculosGenericosFactory.calculos.devolverWithoutHD(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.sinDH.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.conDH.valor
        );


        // Calculo fila 32 hacienda_particular
        calculosGenericosFactory.calculos.calcularProductoIPC(
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAAlquilerContador.valor,
          10*$rootScope.IVA
        );
        $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAAlquilerContador.valor=$rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAAlquilerContador.valor.map(Math.round);


        // Calculo de la fila 4 de hacienda_particular
        if($rootScope.config.tipoUsuario=='usuario_particular'){
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.valor=this.calculos.calculoSumaDeTres(
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.valor,
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAAlquilerContador.valor,
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IVAElectricidadConsumida.valor
          );
        }else{
          calculosGenericosFactory.calculos.calculoResta(
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.valor,
            $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.IEElectricidadConsumida.valor,
            $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedadesSinFV
          );

        }

        // Calculo de la fila 100 de hacienda_particular
        calculosGenericosFactory.calculos.calculoResta(
          $rootScope.calculos[$rootScope.config.tipoHacienda].diferenciaRecaudacion.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioConFV.valor,
          $rootScope.calculos[$rootScope.config.tipoHacienda].recaudacionEscenarioSinFV.valor
        );

        // Calculamos la fila 104 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VAN=calculosGenericosFactory.calculos.calcularVAN(
          $rootScope.calculos[$rootScope.config.tipoHacienda].diferenciaRecaudacion.valor,
          0.02
        );

        // Calculamos la fila 106 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorMWn=$rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VAN/$rootScope.objetoTabla.power;
        $rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorMWn=Math.round($rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorMWn);


        // Calculamos la fila 107 de hacienda_particular
        $rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorKWPVGenerado=100*$rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VAN/$rootScope.calculos[$rootScope.config.tipoUsuario].VANEnergiaProducida;

        $rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorKWPVGenerado=Math.round($rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorKWPVGenerado*10)/10;

        // Calculamos el cashflowAcumulado
        $rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado=this.calculos.calculoCashflowAcumulado();
        $rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado=$rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado.map(Math.round);

      }




    }





    return calculoImpactOnPublicFinancesFactory;





  }]);
