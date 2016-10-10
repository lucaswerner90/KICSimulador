app.factory('calculoImpactForTheSelfConsumerFactory',["$rootScope","calculosGenericosFactory",function($rootScope,calculosGenericosFactory) {

	/*
	*   DEVOLVEMOS EL OBJETO QUE CALCULA LA SECCION DE DATOS
	*   IMPACT FOR THE SELF CONSUMER FACTORY
	*/



	function reduccionImpuestoSociedades(suma1,suma2,producto){
		var calculo=[];

		for (var i = 0; i < $rootScope.annos; i++) {
			calculo[i]=(suma1[i]+suma2[i])*producto;
		}
		return calculo;
	}

	var calculoImpactForTheSelfConsumerFactory = {
		config:{},
		init:function(){
			// Fila 8 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.terminoDeEnergiaConImpuestos,$rootScope.datosTarifa.terminoEnergiaSinDh);

			// Fila 16 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP1);

			// Fila 18 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP2);

			// Fila 20 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP3);


			// Fila 25 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProducto(
				$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador,
				10
			);
			$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador=$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador.map(Math.round);



			// Fila 34 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstant);
			$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaInstantaneamente.map(Math.round);


			//Fila 33 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoN33UsuarioParticular();


			//Fila 36 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferred);
			$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida.map(Math.round);

			//Fila 32 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida);


			// Fila 31 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.valor,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.terminoDeEnergiaConImpuestos);

			// Fila 41 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP1);
			$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 40 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP1);

			// Fila 6 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoProductoFijoEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadConsumida,$rootScope.objetoTabla.demand,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.terminoDeEnergiaConImpuestos);
			$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadConsumida=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadConsumida.map(Math.round);

			// Fila 42 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP1);


			// Fila 45 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP2);
			$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 49 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP3);
			$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 44 USUARIO-PARTICULAR
			// N44= B35
			// O44= N44 + N45 - O45
			calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP2);

			// Fila 46 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP2);

			// Fila 50 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP3);


			// Fila 43 USUARIO-PARTICULAR
			// N44 - N46
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaDeFormaDiferida);


			// Fila 10 USUARIO-PARTICULAR
			// ( L12*N16 + L13*N18 + L14*N20) /100
			//calculoSumaProductos(calculo,fijo1,dato1,fijo2,dato2,fijo3,dato3)
			calculosGenericosFactory.calculos.calculoSumaProductos($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumida,
				$rootScope.objetoTabla.demandP1,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.terminoDeEnergiaSinImpuestos,
				$rootScope.objetoTabla.demandP2,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.terminoDeEnergiaSinImpuestos,
				$rootScope.objetoTabla.demandP3,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.terminoDeEnergiaSinImpuestos
			);
			$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumida=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumida.map(Math.round);


			// Calculo de L77 USUARIO-PARTICULAR
			$rootScope.calculos.sistema_electrico.conDH.p3.peajesDeBNConDH=1+(parseInt($rootScope.outputs.modelParams.excedentsToll)/100)*$rootScope.datosTarifa.peajeAccesoEnergiaConDhP3;

			// Calculo de L71 USUARIO-PARTICULAR
			$rootScope.calculos.sistema_electrico.conDH.p2.peajesDeBNConDH=1+(parseInt($rootScope.outputs.modelParams.excedentsToll)/100)*$rootScope.datosTarifa.peajeAccesoEnergiaConDhP2;

			// Calculo de L65 USUARIO-PARTICULAR
			$rootScope.calculos.sistema_electrico.conDH.p1.peajesDeBNConDH=1+(parseInt($rootScope.outputs.modelParams.excedentsToll)/100)*$rootScope.datosTarifa.peajeAccesoEnergiaConDhP1;


			// Fila 76 USUARIO-PARTICULAR == Fila 70 USUARIO-PARTICULAR == Fila 64 USUARIO-PARTICULAR
			// N76 = L77 * (1+IVA) * (1+IE)
			// O76 = N76 * (1+N23)

			// Fila 64
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p1.peajesDeBNConDH);

			// Fila 70
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p2.peajesDeBNConDH);

			// Fila 76
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p3.peajesDeBNConDH);

			// Fila 5 USUARIO-PARTICULAR
			// Si el valor equivale a WITHOUT_HD entonces asignamos el conjunto verdadero
			if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
				$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadConsumida;
			}else{
				$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumida;
			}



			//Fila 4 USUARIO-PARTICULAR
			//  N4 = -N5 - N25
			calculosGenericosFactory.calculos.calcularRestaInvertido(
				$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV,
				$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV,
				$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador
			);
			if($rootScope.config.tipoUsuario=='usuario_empresa'){
				// Referencia a la fila 27 de usuario_empresa ( ESTA VARIABLE NO TIENE NADA QUE VER CON LA SIGUIENTE DE REDUCCION DE IMPUESTO DE SOCIEDADES) --> SE CALCULAN DE MANERA DISTINTA
				$rootScope.calculos.usuario_empresa.reduccionImpuestoSociedadesSinFV=[];
				$rootScope.calculos.usuario_empresa.reduccionImpuestoSociedadesSinFV=calculosGenericosFactory.calculos.calculoReduccionImpuestosSinFVEmpresa(
					$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV,
					$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador,
					0.25
				);
				$rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades=[];
				// Para la fila 4 en caso de ser usuario_empresa hay que sumar una fila nueva
				// Calculo fila 27 de usuario_empresa
				$rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades=this.calculos.reduccionImpuestoSociedades(
					$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV,
					$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador,
					0.25
				);
				calculosGenericosFactory.calculos.calculoSuma(
					$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV,
					$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV,
					$rootScope.calculos.usuario_empresa.reduccionImpuestoSociedades
				);

			}


			// Fila 48 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP3);

			// Fila 47 USUARIO-PARTICULAR
			// N47= N48 - N50
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaDeFormaDiferida);

			// FILA 39 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadConsumida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadExtraidaDeLaRed,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaDeFormaDiferida);

			// Fila 37 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calcularMultiplicacionSeisDatosEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumidaSinFV,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadConsumida,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.terminoDeEnergiaSinImpuestos,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadConsumida,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.terminoDeEnergiaSinImpuestos,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadConsumida,
				$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.terminoDeEnergiaSinImpuestos
			);
			$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumidaSinFV=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumidaSinFV.map(Math.round);


			// Fila 113 USUARIO-PARTICULAR L114=20
			calculosGenericosFactory.calculos.calculoConProducto($rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV,20);
			$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV=$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV.map(Math.round);

			// Fila 115 USUARIO-PARTICULAR
			// N115 = L116 = L117 * L105 * L106
			// O115 =
			// L117 = $rootScope.userType.costeDeSeguro
			// L105 = $rootScope.objetoTabla.power
			// L106 = 1.15
			// L116= 	$rootScope.userType.costeDeSeguro*$rootScope.objetoTabla.power*1.15
			calculosGenericosFactory.calculos.calcularProductoIPC($rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro,
				$rootScope.userType.costeDeSeguro*$rootScope.objetoTabla.power*1.15);
				$rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro=$rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro.map(Math.round);

				// Fila 118
				// N118= L119*(1-L122)
				// L119= L105*L106*L120*(1+IVA-L121)*1000
				// L106 = 1.15
				// L105 = $rootScope.objetoTabla.power
				// L120 = $rootScope.objetoTabla.llaveEnMano
				// L121 = $rootScope.outputs.modelParams.investmentAids
				// L122 = $rootScope.outputs.modelParams.apalancamiento
				calculosGenericosFactory.calculos.calcularConIVAEInversion($rootScope.calculos[$rootScope.config.tipoUsuario].inversionInicial);

				// Fila 123 USUARIO-PARTICULAR
				// N123 = L124*L126 --> gastosFinancieros.cantidadFinanciada * gastosFinancieros.costeDeuda;
				// O123 =
				// L124 = L119 * L122 --> inversionInicial.inversionTotalConIVA * $rootScope.userType.apalancamiento
				// L126 = $rootScope.userType.costeDeuda
				$rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada= $rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA*$rootScope.userType.apalancamiento;
				$rootScope.calculos.inputs.gastosFinancieros.costeDeuda= $rootScope.userType.costeDeuda;
				$rootScope.calculos.inputs.gastosFinancieros.duracion=$rootScope.userType.duracionDeuda;
				// Calculamos los intereses iniciales
				$rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[0] = $rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada * $rootScope.calculos.inputs.gastosFinancieros.costeDeuda;

				// Calculamos el pago inicial
				calculosGenericosFactory.calculos.calculoPagoInicial();


				// Calculamos la amortizacion inicial
				$rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[0] = $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.pagoInicial[0] - $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses[0];
				// Calculamos el elemento inicial del saldo
				$rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.saldo[0] = $rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada - $rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion[0];

				// Calculamos los intereses restantes
				calculosGenericosFactory.calculos.calculoInteresesDelUsuarioParticular();


				// Calculamos el coste de cambio de inversor con IVA  L108
				calculosGenericosFactory.calculos.calculoCosteCambioInversorConIVA();

				// Calculamos el incremento del coste del inversor tomando en cuenta IPC y maduración tecnológica fila 110 USUARIO-PARTICULAR
				$rootScope.calculos.inputs.costesOM.incrementoCosteInversorIPCMaduracion= $rootScope.IPC-$rootScope.calculos.inputs.costesOM.disminucionDelCosteMaduracionTecnologica;

				// Fila 107 - Coste cambio inversor con IVA actualizado
				calculosGenericosFactory.calculos.calculoCosteCambioInversorConIVAActualizado();


				// Fila 62 - Coste de la electricidad con dh
				calculosGenericosFactory.calculos.calculoSumaProductosArray($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConDH,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.cuotaBNConImpuestos,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.cuotaBNConImpuestos,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.cuotaBNConImpuestos);

				$rootScope.calculos.sistema_electrico.sinDH.cuotaBN=$rootScope.datosTarifa.peajeAccesoEnergiaSinDh+1;

				// Calculamos la fila 54
				calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.sinDH.cuotaBN);


				// Calculamos la fila 53
				calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadFVAutoconsumidaDiferida,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.cuotaBNConImpuestos);


				// Fila 52 USUARIO-PARTICULAR
				if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
					$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadFVAutoconsumidaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.costeElectricidadFVAutoconsumidaDiferida;
				}else{
					$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadFVAutoconsumidaDiferida=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConDH;
				}


				// Calculamos la fila 103
				$rootScope.calculos.inputs.costesDeOM=0*$rootScope.objetoTabla.power*$rootScope.calculos.inputs.caracteristicasTecnicas.ratio;

				// Fila 102
				calculosGenericosFactory.calculos.calculoConProducto($rootScope.calculos[$rootScope.config.tipoUsuario].costesOM.costesOMConIVA,$rootScope.calculos.inputs.costesDeOM);

				// Fila 101 USUARIO-PARTICULAR
				calculosGenericosFactory.calculos.calculoSuma($rootScope.calculos[$rootScope.config.tipoUsuario].costeDeOM,$rootScope.calculos[$rootScope.config.tipoUsuario].costesOM.costesOMConIVA,$rootScope.calculos.inputs.costesOM.costeCambioInversorConIVAActualizado);


				// Calculamos el input de la fila 86
				if($rootScope.outputs.modelParams.backupToll.value=="0"){
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos=0;
				}else{
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos=$rootScope.datosTarifa.peajeRespaldoSinDh;
				}


				// Fila 85 USUARIO-PARTICULAR
				calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaConImpuestos,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos)

				// Fila 84
				calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.electricidadAutoconsumidaInstantaneamente,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstant);

				// Fila 83 USUARIO-PARTICULAR
				// N83 = N84*N85/100
				calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.costePeaje,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.electricidadAutoconsumidaInstantaneamente,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaConImpuestos);


				// Fila 89
				// selfConsumedInstantP1
				calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP1);

				// Fila 90
				// selfConsumedInstantP2
				calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP2);

				// Fila 91
				// selfConsumedInstantP3
				calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP3);




				// Fila 94 USUARIO-PARTICULAR
				// Fila 96 USUARIO-PARTICULAR
				// Fila 98 USUARIO-PARTICULAR
				if($rootScope.outputs.modelParams.backupToll.value=="0"){
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1=0;
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2=0;
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3=0;
				}else{
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1=$rootScope.datosTarifa.peajeRespaldoConDhP1;
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2=$rootScope.datosTarifa.peajeRespaldoConDhP2;
					$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3=$rootScope.datosTarifa.peajeRespaldoConDhP3;
				}

				// Fila 93
				calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1);

				// Fila 95
				calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2);


				// Fila 97
				calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3);



				// Fila 87
				calculosGenericosFactory.calculos.calcularMultiplicacionSeisDatosEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.costePeajeRespaldoConImpuestos,
					$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p1.consumo,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1,
					$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p2.consumo,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2,
					$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.p3.consumo,$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3);


					// Fila 82
					// Si el valor equivale a WITHOUT_HD entonces asignamos el conjunto verdadero
					if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
						$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.valor=$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.sinDH.costePeaje;
					}else{
						$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.valor=$rootScope.calculos[$rootScope.config.tipoUsuario].costePeajeRespaldoConImpuestos.conDH.costePeajeRespaldoConImpuestos;
					}


					// Fila 30
					if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
						$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoUsuario].sinDH.valor;
					}else{
						$rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumida.valor=$rootScope.calculos[$rootScope.config.tipoUsuario].conDH.costeElectricidadConsumidaSinFV;
					}



					if($rootScope.config.tipoUsuario=='usuario_empresa'){

						// Calculo fila 86 usuario_empresa
						$rootScope.calculos.usuario_empresa.electricidadInyectadaALaRed=[];
						if($rootScope.outputs.modelParams.remuneration.value=='3'){
							calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
								$rootScope.calculos.usuario_empresa.electricidadInyectadaALaRed,
								0.6/100,
								$rootScope.objetoTabla.sold
							);
						}else{
							calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
								$rootScope.calculos.usuario_empresa.electricidadInyectadaALaRed,
								0.6/100,
								0
							);
						}

						// Referencia a la fila 87 de usuario_empresa
						$rootScope.calculos.usuario_empresa.precioVentaPool=[];
						$rootScope.calculos.usuario_empresa.precioVentaPool=calculosGenericosFactory.calculos.calculoAsignacionProductoDatoFijo(
							1.02,
							4.5
						);


						// Referencia a la fila 85 de usuario_empresa
						$rootScope.calculos.usuario_empresa.ventasAlPool=[];
						calculosGenericosFactory.calculos.calculoProductoEntre100(
							$rootScope.calculos.usuario_empresa.ventasAlPool,
							$rootScope.calculos.usuario_empresa.electricidadInyectadaALaRed,
							$rootScope.calculos.usuario_empresa.precioVentaPool
						);


						// Referencia a la fila 91 de usuario_empresa
						$rootScope.calculos.usuario_empresa.peajeDeGeneracion=[];

						// Calculo fila 91 de usuario_empresa
						calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloCrecimiento(
							$rootScope.calculos.usuario_empresa.peajeDeGeneracion,
							0.05
						);
						$rootScope.calculos.usuario_empresa.peajeDeGeneracion=$rootScope.calculos.usuario_empresa.peajeDeGeneracion.map(Math.round);


						// Referencia a la fila 92 de usuario_empresa
						$rootScope.calculos.usuario_empresa.costeDeGestion=[];

						// Calculo fila 92 de usuario_empresa
						calculosGenericosFactory.calculos.calculoConProductoEIncrementoSoloCrecimiento(
							$rootScope.calculos.usuario_empresa.costeDeGestion,
							0.001
						);


						// Referencia a la fila 90 de usuario_empresa
						$rootScope.calculos.usuario_empresa.costesPorVentaAlPool=[];
						calculosGenericosFactory.calculos.calcularSumaMultiplicacionDosArrays(
							$rootScope.calculos.usuario_empresa.costesPorVentaAlPool,
							$rootScope.calculos.usuario_empresa.peajeDeGeneracion,
							$rootScope.calculos.usuario_empresa.costeDeGestion,
							$rootScope.calculos.usuario_empresa.electricidadInyectadaALaRed
						);


						// Referencia a la fila 84 de usuario_empresa
						$rootScope.calculos.usuario_empresa.soloOpcionVentaPool=[];
						calculosGenericosFactory.calculos.calculoResta(
							$rootScope.calculos.usuario_empresa.soloOpcionVentaPool,
							$rootScope.calculos.usuario_empresa.ventasAlPool,
							$rootScope.calculos.usuario_empresa.costesPorVentaAlPool
						);

						$rootScope.calculos.usuario_empresa.costePeajeRespaldo={

							// Referencia a la fila 93 de usuario_empresa
							valor:[],
							sinDH:{

								// Referencia a la fila 94 de usuario_empresa
								valor:[],

								// Referencia a la fila 95 de usuario_empresa
								electricidadAutoconsumidaInstantaneamente:[],

								// Referencia fila 96 usuario_empresa
								terminoDeEnergiaConImpuestosSinIVA:[]
							},
							conDH:{

								// Referencia a la fila 98 de usuario_empresa
								valor:[],

								consumo:{

									// Referencia a la fila 100 de usuario_empresa
									p1:[],

									// Referencia a la fila 101 de usuario_empresa
									p2:[],

									// Referencia a la fila 102 de usuario_empresa
									p3:[],
								},
								terminoDeEnergiaDHConImpuestosSinIVA:{

									// Referencia a la fila 104 de usuario_empresa
									p1:[],

									// Referencia a la fila 106 de usuario_empresa
									p2:[],

									// Referencia a la fila 108 de usuario_empresa
									p3:[],
								}
							}
						}

						// Referencia fila 95 usuario_empresa
						calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.electricidadAutoconsumidaInstantaneamente,
							0.6/100,
							$rootScope.objetoTabla.selfConsumedInstant
						);

						// Referencia fila 96 usuario_empresa
						if($rootScope.outputs.modelParams.backupToll.value=="1"){

							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.terminoDeEnergiaConImpuestosSinIVA,
								$rootScope.datosTarifa.peajeRespaldoSinDh
							);

						}else{
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.terminoDeEnergiaConImpuestosSinIVA,
								0
							);
						}

						// Referencia fila 94 usuario_empresa
						calculosGenericosFactory.calculos.calculoProductoEntre100(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.valor,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.terminoDeEnergiaConImpuestosSinIVA,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.electricidadAutoconsumidaInstantaneamente
						);


						//Calculo fila 100 usuario_empresa
						calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p1,
							0.6/100,
							$rootScope.objetoTabla.selfConsumedInstantP1
						);

						//Calculo fila 101 usuario_empresa
						calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p2,
							0.6/100,
							$rootScope.objetoTabla.selfConsumedInstantP2
						);

						//Calculo fila 102 usuario_empresa
						calculosGenericosFactory.calculos.calculoConAsignacionDirecta(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p3,
							0.6/100,
							$rootScope.objetoTabla.selfConsumedInstantP3
						);

						//Calculo fila 104 fila 105 fila 106 usuario_empresa

						if($rootScope.outputs.modelParams.backupToll.value=="1"){
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p1,
								$rootScope.datosTarifa.peajeRespaldoConDhP1
							);
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p2,
								$rootScope.datosTarifa.peajeRespaldoConDhP2
							);
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p3,
								$rootScope.datosTarifa.peajeRespaldoConDhP3
							);
						}else{
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p1,
								0
							);
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p2,
								0
							);
							calculosGenericosFactory.calculos.calculoConProductoEIncremento(
								$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p3,
								0
							);
						}

						// Calculo fila 98 de usuario_empresa
						calculosGenericosFactory.calculos.calcularMultiplicacionSeisDatosEntre100(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.valor,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p1,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p1,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p2,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p2,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.consumo.p3,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.terminoDeEnergiaDHConImpuestosSinIVA.p3
						);

						// Calculo fila 93 usuario_empresa
						$rootScope.calculos.usuario_empresa.costePeajeRespaldo.valor=calculosGenericosFactory.calculos.devolverWithoutHD(
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.sinDH.valor,
							$rootScope.calculos.usuario_empresa.costePeajeRespaldo.conDH.valor
						);

					}



					// Fila 28
					calculosGenericosFactory.calculos.calculoCashflowEscenarioConFV();

					// Fila 130 de USUARIO-PARTICULAR
					calculosGenericosFactory.calculos.calculoResta($rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV,$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioConFV,$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV);
					$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV=$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV.map(Math.round);
					debugger;

					// Fila 137 de USUARIO-PARTICULAR
					calculosGenericosFactory.calculos.calculoSumaArrayConDato($rootScope.calculos[$rootScope.config.tipoUsuario].indicadores.cashflowAcumulado,$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV);

					$rootScope.calculos[$rootScope.config.tipoUsuario].indicadores.cashflowAcumulado=$rootScope.calculos[$rootScope.config.tipoUsuario].indicadores.cashflowAcumulado.map(Math.round);

					// Fila 151 de USUARIO-PARTICULAR
					if($rootScope.config.tipoUsuario=='usuario_empresa'){

						for (var i = 0; i < $rootScope.annos; i++) {
						$rootScope.calculos[$rootScope.config.tipoUsuario].precioMedioElectricidadComprada[i]=(($rootScope.calculos[$rootScope.config.tipoUsuario].costeElectricidadConsumidaSinFV[i]+$rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contador[i])*100/$rootScope.objetoTabla.demand);
						}
					}else{

					calculosGenericosFactory.calculos.calcularProductoArrayEntre100($rootScope.calculos[$rootScope.config.tipoUsuario].precioMedioElectricidadComprada,$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV,$rootScope.objetoTabla.demand);

					}

					// Fila 142 de USUARIO-PARTICULAR
					calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos[$rootScope.config.tipoUsuario].energiaProducida,0.006,$rootScope.objetoTabla.production);
					$rootScope.calculos[$rootScope.config.tipoUsuario].energiaProducida=$rootScope.calculos[$rootScope.config.tipoUsuario].energiaProducida.map(Math.round);


					// Calculamos el VAN de la energia producida
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANEnergiaProducida=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].energiaProducida,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN de los costes del OM
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANCostesOM=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].costeDeOM,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN del alquiler del contador
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANAlquilerContador=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].alquiler_de_contadorConFV,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN de los costes del seguro
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANCostesSeguro=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].costesDeSeguro,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN de la inversion inicial
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANInversionInicial=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].inversionInicial,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN de los gastos financieros
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANGastosFinancieros=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.intereses,$rootScope.userType.tasaDescuentoUsuario);

					// Calculamos el VAN del pago principal
					$rootScope.calculos[$rootScope.config.tipoUsuario].VANPagoPrincipal=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].calculoGastosFinancieros.amortizacion,$rootScope.userType.tasaDescuentoUsuario);

					$rootScope.calculos[$rootScope.config.tipoUsuario].LCOE=($rootScope.calculos[$rootScope.config.tipoUsuario].VANPagoPrincipal+
						$rootScope.calculos[$rootScope.config.tipoUsuario].VANGastosFinancieros+
						$rootScope.calculos[$rootScope.config.tipoUsuario].VANInversionInicial+
						$rootScope.calculos[$rootScope.config.tipoUsuario].VANCostesSeguro+
						$rootScope.calculos[$rootScope.config.tipoUsuario].VANAlquilerContador+
						$rootScope.calculos[$rootScope.config.tipoUsuario].VANCostesOM)/($rootScope.calculos[$rootScope.config.tipoUsuario].VANEnergiaProducida*100)*10000;
						$rootScope.calculos[$rootScope.config.tipoUsuario].LCOE=Math.round($rootScope.calculos[$rootScope.config.tipoUsuario].LCOE*10)/10;




					},
					calculos:{
						calcularTIR:calculosGenericosFactory.calculos.calcularTIR,
						calcularVAN:calculosGenericosFactory.calculos.calcularVAN,
						calcularPorcentajeDeEnergia:calculosGenericosFactory.calculos.calcularPorcentajeDeEnergia,
						reduccionImpuestoSociedades:reduccionImpuestoSociedades
					}

				};

				return calculoImpactForTheSelfConsumerFactory;




			}]);
