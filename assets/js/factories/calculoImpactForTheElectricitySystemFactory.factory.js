app.factory('calculoImpactForTheElectricitySystemFactory',['$rootScope','calculosGenericosFactory',
function($rootScope,calculosGenericosFactory){


  var calculoImpactForTheElectricitySystemFactory={
    calculos:{
    },
    init:function(){


      // Calculamos la fila 7 de sistema_electrico
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.peajesDeAccesoSinDH=$rootScope.datosTarifa.peajeAccesoEnergiaSinDh;


      // Calculamos la fila 6 de sistema_electrico
      if($rootScope.outputs.modelParams.remuneration.name=="Sell to pool" || $rootScope.outputs.modelParams.remuneration.name=="Cession"){
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.reduccionElectricidadComprada=-$rootScope.objetoTabla.selfConsumedInstant;
      }else{
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.reduccionElectricidadComprada=-$rootScope.objetoTabla.production;
      }

      // Calculamos la fila 5 de sistema_electrico
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.valor=parseFloat(($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.reduccionElectricidadComprada*$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.peajesDeAccesoSinDH/100).toFixed(1));


      // Calculamos las filas 10,11 y 12 de sistema_electrico
      if($rootScope.outputs.modelParams.remuneration.name=="Sell to pool" || $rootScope.outputs.modelParams.remuneration.name=="Cession"){
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p1=-$rootScope.objetoTabla.selfConsumedInstantP1;
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p2=-$rootScope.objetoTabla.selfConsumedInstantP2;
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p3=-$rootScope.objetoTabla.selfConsumedInstantP3;
      }else{
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p1=-$rootScope.objetoTabla.productionP1;
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p2=-$rootScope.objetoTabla.productionP2;
        $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p3=-$rootScope.objetoTabla.productionP3;
      }

      // Calculamos las filas 14,15 y 16 de sistema_electrico
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p1=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP1;
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p2=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP2;
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p3=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP3;


      // Calculamos la fila 8 de sistema_electrico
      $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.valor=Math.round(
        ($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p1*$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p1+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p2*$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p2+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p3*$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.peajesAccesoConDH.p3)/100);


        // Calculamos la fila 4 de sistema_electrico
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.valor=$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.valor;
        }else{
          $rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.valor=$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.valor;
        }

        // Calculamos la fila 20
        if($rootScope.calculos.inputs.regulacionDelAutoconsumo.pagosPorCapacidad=='Si'){
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.sinDH.pagosPorCapacidadSinDH=0;
        }else{
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.sinDH.pagosPorCapacidadSinDH=0;
        }

        // Calculamos la fila 19 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.sinDH.valor=($rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.sinDH.pagosPorCapacidadSinDH*$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.reduccionElectricidadComprada)/100;


        // Calculamos las filas 24,25 y 26 de sistema_electrico
        if($rootScope.calculos.inputs.regulacionDelAutoconsumo.pagosPorCapacidad=='Si'){
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p1=$rootScope.datosTarifa.pagosCapacidadConDhP1;
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p2=$rootScope.datosTarifa.pagosCapacidadConDhP2;
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p3=$rootScope.datosTarifa.pagosCapacidadConDhP3;
        }else{
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p1=0;
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p2=0;
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p3=0;
        }

        // Calculamos la fila 22 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.valor=($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p1*$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p1+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p2*$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p2+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p3*$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.pagosPorCapacidadConDH.p3)/100;


        // Calculamos la fila 18 de sistema_electrico
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.valor=$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.sinDH.valor;
        }else{
          $rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.valor=$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.conDH.valor;
        }

        // Calculamos la fila 29
        if($rootScope.calculos.inputs.regulacionDelAutoconsumo.pagosPorCapacidad=='Si'){
          $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.sobrecosteServiciosAjuste=$rootScope.datosTarifa.sobrecoste;
        }else{
          $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.sobrecosteServiciosAjuste=0;
        }


        // Calculamos la fila 28 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.valor=calculosGenericosFactory.calculos.calculoProductoEntre100Fijo($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.reduccionElectricidadComprada,$rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.sobrecosteServiciosAjuste);

        // Calculamos la fila 31 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.conDH.valor=calculosGenericosFactory.calculos.calculoProductoEntre100Fijo($rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.sobrecosteServiciosAjuste,($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p1+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p2+$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.conDH.electricidadAutoconsumidaDeFormaDiferida.p3));


        // Calculamos la fila 27 de sistema_electrico
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.valor=$rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.sinDH.valor;
        }else{
          $rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.valor=$rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.conDH.valor;
        }

        // Calculamos la fila 35
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.sinDH.peajeBNSinDH=$rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.sinDH.peajesDeAccesoSinDH*$rootScope.outputs.modelParams.excedentsToll/100;

        // Calculamos la fila 33 sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.sinDH.valor=calculosGenericosFactory.calculos.calculoProductoEntre100Fijo($rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.sinDH.peajeBNSinDH,$rootScope.objetoTabla.selfConsumedDeferred);

        // $rootScope.outputs.modelParams.excedentsToll   -> fila 36 sistema_electrico
        // $rootScope.objetoTabla.selfConsumedDeferredP1  -> fila 39 sistema_electrico
        // $rootScope.objetoTabla.selfConsumedDeferredP2  -> fila 40 sistema_electrico
        // $rootScope.objetoTabla.selfConsumedDeferredP3  -> fila 41 sistema_electrico
        // $rootScope.datosTarifa.peajeAccesoEnergiaConDhP1 -> fila 14 sistema_electrico
        // $rootScope.datosTarifa.peajeAccesoEnergiaConDhP2 -> fila 15 sistema_electrico
        // $rootScope.datosTarifa.peajeAccesoEnergiaConDhP3 -> fila 16 sistema_electrico
        // $rootScope.outputs.modelParams.excedentsToll -> fila 36 sistema_electrico


        // Calculamos la fila 43,44,45 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p1=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP1*($rootScope.outputs.modelParams.excedentsToll/100);
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p2=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP2*($rootScope.outputs.modelParams.excedentsToll/100);
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p3=$rootScope.datosTarifa.peajeAccesoEnergiaConDhP3*($rootScope.outputs.modelParams.excedentsToll/100);

        // Calculamos la fila 37 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.valor=($rootScope.objetoTabla.selfConsumedDeferredP1*$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p1+$rootScope.objetoTabla.selfConsumedDeferredP2*$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p2+$rootScope.objetoTabla.selfConsumedDeferredP3*$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.peajesDeBNConDH.p3)/100;


        // Calculamos la fila 32 de sistema_electrico
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.valor=$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.sinDH.valor;
        }else{
          $rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.valor=$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.conDH.valor;
        }

        // Calculamos la fila 75 de hacienda_particular
        $rootScope.calculos.hacienda_particular.IVAPeajeRespaldo.valorBasePeajeRespaldo=calculosGenericosFactory.calculos.calculoDivisionProducto($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.valor);
        $rootScope.calculos.hacienda_particular.IVAPeajeRespaldo.valorBasePeajeRespaldo=$rootScope.calculos.hacienda_particular.IVAPeajeRespaldo.valorBasePeajeRespaldo.map(Math.round);


        // Calculamos la fila 47 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoPorPeajeDeRespaldo=$rootScope.calculos.hacienda_particular.IVAPeajeRespaldo.valorBasePeajeRespaldo[0];

        // Calculamos la fila 50 de sistema_electrico
        if($rootScope.outputs.modelParams.remuneration.name=="Sell to pool"){
          $rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.energiaVertidaALaRed=$rootScope.objetoTabla.sold;
        }else{
          $rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.energiaVertidaALaRed=0;
        }

        // Calculamos la fila 48 de sistema_electrico
        $rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.valor=$rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.peajeDeGeneracion*$rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.energiaVertidaALaRed/100;

        // Calculamos la fila 52 de sistema_electrico
        if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
          $rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.energiaCedida=$rootScope.objetoTabla.summaryLostGlobal;
        }else{
          $rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.energiaCedida=$rootScope.objetoTabla.summaryLostBalance;
        }

        // Calculamos la fila 51 de sistema_electrico
        $rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.valor=Math.round(($rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.energiaCedida*$rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.precioPool)/1000);


        // Calculamos la fila 56 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.impactoAnualSistemaElectricoEspanol=Math.round($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.valor+$rootScope.calculos.sistema_electrico.impactoPorPagosPorCapacidad.valor+$rootScope.calculos.sistema_electrico.impactoSobrecostesServiciosAjuste.valor+$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.valor+$rootScope.calculos.sistema_electrico.impactoPorPeajeDeRespaldo+$rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.valor+$rootScope.calculos.sistema_electrico.ingresosEnergiaCedidaSistema.valor);

        // Calculamos la fila 55 de sistema_electrico
        // $rootScope.objetoTabla.power   -> fila 57 sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.valor=Math.round(($rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.impactoAnualSistemaElectricoEspanol/$rootScope.objetoTabla.power)*10)/10;

        // Calculamos la fila 58 de sistema_electrico
        $rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.variacionIngresosPorPeajes=Math.round(($rootScope.calculos.sistema_electrico.impactoPorLosPeajesDeAcceso.valor+$rootScope.calculos.sistema_electrico.impactoPeajesBalanceNeto.valor+$rootScope.calculos.sistema_electrico.impactoPorPeajeDeRespaldo+$rootScope.calculos.sistema_electrico.ingresosPorPeajeDeGeneracion.valor)*10)/10;

        // Calculo fila 62 sistema_electrico
        $rootScope.calculos.sistema_electrico.ahorroEmisionCO2=Math.round((($rootScope.objetoTabla.production/1000)*$rootScope.calculos.inputs.informacionDeContorno.sistema_electrico.factorEmisionCO2*$rootScope.calculos.inputs.informacionDeContorno.sistema_electrico.precioToneladaCO2)*10)/10;



        debugger;

      }
    }





    return calculoImpactForTheElectricitySystemFactory;





  }]);
