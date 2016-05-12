app.factory('calculosGenericosFactory',['$rootScope',function($rootScope){

  function calculoAsignacionProductoDatoFijo(fijo,constante){
    var calculo=[];

    calculo[0]=constante;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*fijo;
    }
    return calculo;
  }

  function calculoReduccionImpuestosSinFVEmpresa(dato1,dato2,constante){
    var calculo=[];
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=(dato1[i]+dato2[i])*constante;
    }
    return calculo;
  }


  function devolverWithoutHD(verdadero,falso){
    if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
      return verdadero;
    }else{
      return falso;
    }
  }

  function calculoArrayDatoFijo(calculo,dato,fijo){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=dato[i]*fijo;
    }
  }


  function calculoArrayEntreProducto(calculo,dato){
    var producto=(1+$rootScope.IVA)*(1+$rootScope.IE);
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=dato[i]/producto;
    }
  }

  function calculoCosteCambioInversorConIVA(){
    $rootScope.calculos.inputs.costesOM.costeCambioInversorConIVA=$rootScope.objetoTabla.power*$rootScope.calculos.inputs.costesOM.costeCambioInversor*1000*(1+$rootScope.IVA);
  }


  function calculoCosteCambioInversorConIVAActualizado(){
    $rootScope.calculos.inputs.costesOM.costeCambioInversorConIVAActualizado[0]=0;
    for (var i = 1; i < $rootScope.annos; i++) {
      if((i+1)%$rootScope.calculos.inputs.caracteristicasTecnicas.vidaUtilInversor==0){
        $rootScope.calculos.inputs.costesOM.costeCambioInversorConIVAActualizado[i]=$rootScope.calculos.inputs.costesOM.costeCambioInversorConIVA;
      }else{
        $rootScope.calculos.inputs.costesOM.costeCambioInversorConIVAActualizado[i]=0;
      }
    }

  }


  function calculoCosteCambioInversorConIVAActualizadoParametros(calculo,dato){
    calculo[0]=0;
    for (var i = 1; i < $rootScope.annos; i++) {
      if((i+1)%$rootScope.calculos.inputs.caracteristicasTecnicas.vidaUtilInversor==0){
        calculo[i]=$rootScope.calculos.hacienda_particular.IVACostesOM.IVACosteCambioInversorActualizado.IVACosteCambioInversor*Math.pow(1+dato,i-1);
      }else{
        calculo[i]=0;
      }
    }

  }


  // N151= N4*100/L7
  function calcularProductoArrayEntre100(calculo,dato1,fijo){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=-Math.round((dato1[i]*100/fijo)*10)/10;
    }
  }

  function calculoCashflowEscenarioConFV(){
    if($rootScope.config.tipoUsuario=='usuario_particular'){
      for (var i = 0; i < $rootScope.annos; i++) {
        $rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioConFV[i]=
        -$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumida.valor[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadFVAutoconsumidaDiferida[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.valor[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeDeOM[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].inversionInicial[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i];

      }
    }else{

      // Referencia a la fila 133 de usuario_empresa
      $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades=[];

      // Calculo amortizacion
      var amortizacionProvisionUsuarioEmpresa=[];
      for (var i = 0; i < $rootScope.annos; i++) {
        amortizacionProvisionUsuarioEmpresa[i]=(i<10)?$rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA/10:0;
      }
      // Calculo fila 133 de usuario_empresa
      for (var i = 0; i < $rootScope.annos; i++) {
        $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades[i]=
        parseInt($rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumida.valor[i]+
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadFVAutoconsumidaDiferida[i]+
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeDeOM[i]+
        $rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV[i]+
        $rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro[i]+
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i]+
        amortizacionProvisionUsuarioEmpresa[i])*0.25;
      }

      // Calculo del cashflowEscenarioConFV de usuario_empresa
      for (var i = 0; i < $rootScope.annos; i++) {
        $rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioConFV[i]=
        -$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumida.valor[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadFVAutoconsumidaDiferida[i]+
        $rootScope.calculos.usuario_empresa.soloOpcionVentaPool[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.valor[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].costeDeOM[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV[i]-
        // Fila 115
        $rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i]+
        $rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].inversionInicial[i]-
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i];

      }
    }

  }


  function calculoInteresesDelUsuarioParticular(){
    for (var i = 1; i < $rootScope.annos; i++) {
      if(i<$rootScope.calculos.inputs.gastosFinancieros.duracion){

        // calculo[i]= N159*L126 = (L124-N158) * L126
        // N159 = (L124-N158) = cantidadFinanciada - intereses[0]
        // N158 = N156 - N157 = pagoInicial - intereses[0]
        // N157 = intereses[0]
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i]= $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.saldo[i-1] * $rootScope.calculos.inputs.gastosFinancieros.costeDeuda;

        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i] = $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.pagoInicial[i-1] - $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i];

      }else{
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[i]=0;
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i] =0;
      }
      $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.saldo[i] = ($rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.saldo[i-1] - $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i]<0)?0:($rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.saldo[i-1] - $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[i]);
    }
  }


  function calculoPagoInicial(){
    var denominador=1-Math.pow((1+$rootScope.calculos.inputs.gastosFinancieros.costeDeuda),-$rootScope.calculos.inputs.gastosFinancieros.duracion);
    var resultadoFinal=($rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada * $rootScope.calculos.inputs.gastosFinancieros.costeDeuda)/denominador;
    //Math.pow(base, exponente)
    for (var i = 0; i < $rootScope.annos; i++) {
      if($rootScope.calculos.inputs.gastosFinancieros.duracion>i){
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.pagoInicial[i]=resultadoFinal;
      }else{
        $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.pagoInicial[i]=0;
      }
    }

  }

  // N118= L119*(1-L122)
  // L119= L105*L106*L120*(1+IVA-L121)*1000
  // L106 = 1.15
  // L105 = $rootScope.objetoTabla.power
  // L120 = $rootScope.userType.llaveEnMano
  // L121 = $rootScope.outputs.modelParams.investmentAids
  // L122 = $rootScope.userType.apalancamiento
  function calcularConIVAEInversion(calculo){
    // Calculamos L119, al ser muy largo lo metemos en una variable
    if($rootScope.config.tipoUsuario=='usuario_particular'){
      $rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA=$rootScope.objetoTabla.power*1.15*$rootScope.userType.llaveEnMano*
      (1+$rootScope.IVA-(parseInt($rootScope.outputs.modelParams.investmentAids)/100))*1000;
    }else{
      $rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA=$rootScope.objetoTabla.power*1.15*$rootScope.userType.llaveEnMano*
      (1-(parseInt($rootScope.outputs.modelParams.investmentAids)/100))*1000;
    }

    // Calculamos N118
    calculo[0]=$rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA*(1-$rootScope.userType.apalancamiento);
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=0;
    }

  }

  function calcularProductoIPC(calculo,dato){
    var producto=(1+$rootScope.IPC);
    calculo[0]=dato;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*producto;
    }
  }


  function calcularSumaMultiplicacionDosArrays(calculo,dato1,dato2,dato3){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=(dato3[i]*(dato1[i]+dato2[i]))/100;
    }
  }

  function calcularMultiplicacionSeisDatosEntre100(calculo,dato1,dato2,dato3,dato4,dato5,dato6){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=((dato1[i]*dato2[i])+(dato3[i]*dato4[i])+(dato5[i]*dato6[i]))/100;
    }
  }

  function calcularMultiplicacionSeisDatosEntre100Unico(calculo,dato1,dato2,dato3,dato4,dato5,dato6){
      calculo=((dato1*dato2)+(dato3*dato4)+(dato5*dato6))/100;
  }

  function calcularRestaInvertido(calculo,resta1,resta2){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=-parseInt(resta1[i])-parseInt(resta2[i]);
    }
  }


  function eleccionTimeDiscrimination(calculo,verdadero,falso){

    // Si el valor equivale a WITHOUT_HD entonces asignamos el conjunto verdadero
    if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
      calculo=verdadero;
    }else{
      calculo=falso;
    }

  }

  // ( L12*N16 + L13*N18 + L14*N20) /100
  function calculoSumaProductosArray(calculo,fijo1,dato1,fijo2,dato2,fijo3,dato3){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=(fijo1[i]*dato1[i]+fijo2[i]*dato2[i]+fijo3[i]*dato3[i])/100;
    }
  }


  // ( L12*N16 + L13*N18 + L14*N20) /100
  function calculoSumaProductos(calculo,fijo1,dato1,fijo2,dato2,fijo3,dato3){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=(fijo1*dato1[i]+fijo2*dato2[i]+fijo3*dato3[i])/100;
    }
  }

  function calculoProductoFijoEntre100(calculo,dato1,dato2){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=dato1*dato2[i]/100;
    }
  }


  function calculoProductoEntre100(calculo,dato1,dato2){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=dato1[i]*dato2[i]/100;
    }
  }


  function calculoProductoEntre100Fijo(dato1,dato2){
    return dato1*dato2/100;
  }


  function calculoSuma(calculo,suma1,suma2){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=suma1[i]+suma2[i];
    }
  }


  function calculoResta(calculo,resta1,resta2){
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=resta1[i]-resta2[i];
    }
  }



  /* EJEMPLO DE CALCULO DE LA FUNCION
  // N44= B35
  // O44= N44 + N45 - O45
  */
  function calculoSumaResta(calculo,dato1,inicial){
    calculo[0]=inicial;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]+dato1[i-1]-dato1[i];
    }
  }


  // N137= N130
  // O137 = N137+O130
  function calculoSumaArrayConDato(calculo,dato1){
    calculo[0]=dato1[0];
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]+dato1[i];
    }
  }

  function calculoN33UsuarioParticular(){
    $rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadExtraidaDeLaRed[0]=$rootScope.objetoTabla.consumedNet;
    for (var i = 1; i < $rootScope.annos; i++) {
      $rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadExtraidaDeLaRed[i]=
      $rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadExtraidaDeLaRed[i-1]+
      $rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaInstantaneamente[i-1]-
      $rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaInstantaneamente[i];
    }
  }



  function calculoConAsignacionDirecta(calculo,dato,directo){

    // Devuelve el incremento de la tarifa de la luz
    var incremento=1-dato;

    calculo[0]=directo;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*incremento;
    }
  }


  function calculoConProducto(calculo,dato){
    // Devuelve el incremento de la tarifa de la luz
    var incremento=1+($rootScope.IPC);

    calculo[0]=($rootScope.config.tipoUsuario=="usuario_empresa")?dato:dato*(1+$rootScope.IVA);
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*incremento;
    }
  }


  function calculoDivisionProducto(dato){
    var calculo=[];
    for (var i = 0; i < $rootScope.annos; i++) {
      calculo[i]=dato[i]/$rootScope.producto;
    }

    return calculo;
  }

  function calculoConProductoEIncremento(calculo,dato){
    // Devuelve el incremento de la tarifa de la luz
    var incremento=1+(parseFloat($rootScope.outputs.generalChar.annualRate)/100);
    calculo[0]=dato*$rootScope.producto;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*incremento;
    }
  }

  function calculoConProductoEIncrementoSoloIVA(calculo,dato){
    // Devuelve el incremento de la tarifa de la luz
    var incremento=1+(parseFloat($rootScope.outputs.generalChar.annualRate)/100);
    calculo[0]=dato*$rootScope.IVA;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=calculo[i-1]*incremento;
    }
  }

  function calculoConProductoEIncrementoSoloIE(calculo,dato){
    // Devuelve el incremento de la tarifa de la luz
    var incremento=1+(parseFloat($rootScope.outputs.generalChar.annualRate)/100);
    calculo[0]=Math.round(dato*$rootScope.IE*100)/100;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=(calculo[i-1]*incremento);
    }
  }


  function calculoConProductoEIncrementoSoloCrecimiento(calculo,dato){
    // Devuelve el incremento de la tarifa de la luz
    var incremento=1+(parseFloat($rootScope.outputs.generalChar.annualRate)/100);
    calculo[0]=dato;
    for (var i = 1; i < $rootScope.annos; i++) {
      calculo[i]=(calculo[i-1]*incremento);
    }
  }


  var calcularPorcentajeDeEnergia=function(dato1,dato2){
    var porcentaje=Math.round((dato1/dato2)*1000)/10;
    return porcentaje;
  }

  // Calcula la VAN
  var calcularVAN=function(ft,tir){
    var suma=0;
    for (var i = 0; i < $rootScope.vidaUtil; i++) {
      suma+=(ft[i]/(Math.pow(1+tir,i+1)));
    }
    return parseFloat(suma.toFixed(2));

  }

  // Calcula la aproximacion para una tir determinada
  var calcularAprox=function(ft,tir){

    var suma=ft[0];
    for (var i = 1; i < $rootScope.vidaUtil; i++) {
      suma+=(ft[i]/(Math.pow(1+tir,i)));
    }
    return Math.round(suma*100)/100;
  }

  var calcularTIR=function(ft){
    if(ft!==undefined){
      var prevAprox;
      var precisionCalculo=Math.pow(10,1);
      var i=0;
      var tir=0;
      var incremento=0.1;
      ft=ft.map(Math.round);
      var aprox=0;
      var margen_error=0.001;
      var estado;
      aprox=calcularAprox(ft,tir);
      prevAprox=aprox;

      do{
        prevAprox=aprox;
        aprox=calcularAprox(ft,tir);
        if(aprox>0){
          incremento=(prevAprox<0)?incremento*0.1:incremento;
          tir+=incremento;
        }
        else{
          incremento=(prevAprox>0)?incremento*0.1:incremento;
          tir-=incremento;
        }
        i++;
      }while(i<50000);
      tir*=100;

      // Redondeamos el resultado de la tir a 1 decimal
      return Math.round(tir*precisionCalculo)/precisionCalculo;
    }

  }


  var calculosGenericosFactory={
    config:{},




    calculos:{
      calculoCashflowEscenarioConFV:calculoCashflowEscenarioConFV,
      calcularProductoArrayEntre100:calcularProductoArrayEntre100,
      calculoCosteCambioInversorConIVAActualizado:calculoCosteCambioInversorConIVAActualizado,
      calculoCosteCambioInversorConIVA:calculoCosteCambioInversorConIVA,
      calculoInteresesDelUsuarioParticular:calculoInteresesDelUsuarioParticular,
      calculoPagoInicial:calculoPagoInicial,
      calculoReduccionImpuestosSinFVEmpresa:calculoReduccionImpuestosSinFVEmpresa,
      calcularConIVAEInversion:calcularConIVAEInversion,
      calcularProductoIPC:calcularProductoIPC,
      calcularMultiplicacionSeisDatosEntre100:calcularMultiplicacionSeisDatosEntre100,
      calcularRestaInvertido:calcularRestaInvertido,
      eleccionTimeDiscrimination:eleccionTimeDiscrimination,
      calculoSumaProductosArray:calculoSumaProductosArray,
      calculoSumaProductos:calculoSumaProductos,
      calculoProductoFijoEntre100:calculoProductoFijoEntre100,
      calculoProductoEntre100:calculoProductoEntre100,
      calculoSuma:calculoSuma,
      calculoAsignacionProductoDatoFijo:calculoAsignacionProductoDatoFijo,
      calculoArrayDatoFijo:calculoArrayDatoFijo,
      calculoResta:calculoResta,
      calculoSumaResta:calculoSumaResta,
      calculoSumaArrayConDato:calculoSumaArrayConDato,
      calculoN33UsuarioParticular:calculoN33UsuarioParticular,
      calculoConAsignacionDirecta:calculoConAsignacionDirecta,
      calculoConProducto:calculoConProducto,
      calculoConProductoEIncremento:calculoConProductoEIncremento,
      calcularTIR:calcularTIR,
      calcularVAN:calcularVAN,
      calcularSumaMultiplicacionDosArrays:calcularSumaMultiplicacionDosArrays,
      calcularMultiplicacionSeisDatosEntre100Unico:calcularMultiplicacionSeisDatosEntre100Unico,
      calcularPorcentajeDeEnergia:calcularPorcentajeDeEnergia,
      calculoDivisionProducto:calculoDivisionProducto,
      calculoConProductoEIncrementoSoloCrecimiento:calculoConProductoEIncrementoSoloCrecimiento,
      calculoProductoEntre100Fijo:calculoProductoEntre100Fijo,
      calculoConProductoEIncrementoSoloIVA:calculoConProductoEIncrementoSoloIVA,
      devolverWithoutHD:devolverWithoutHD,
      calculoArrayEntreProducto:calculoArrayEntreProducto,
      calculoCosteCambioInversorConIVAActualizadoParametros:calculoCosteCambioInversorConIVAActualizadoParametros,
      calculoConProductoEIncrementoSoloIE:calculoConProductoEIncrementoSoloIE

    },

    init:function(){

    }
  };

  return calculosGenericosFactory;




}]);
