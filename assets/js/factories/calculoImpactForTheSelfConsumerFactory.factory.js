app.factory('calculoImpactForTheSelfConsumerFactory',["$rootScope","calculosGenericosFactory",function($rootScope,calculosGenericosFactory) {

	/*
	*   DEVOLVEMOS EL OBJETO QUE CALCULA LA SECCION DE DATOS
	*   IMPACT FOR THE SELF CONSUMER FACTORY
	*/
	var calculoImpactForTheSelfConsumerFactory = {
		config:{},
		init:function(){
			// Fila 8 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.sinDH.terminoDeEnergiaConImpuestos,$rootScope.datosTarifa.terminoEnergiaSinDh);

			// Fila 16 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p1.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP1);

			// Fila 18 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p2.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP2);

			// Fila 20 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p3.terminoDeEnergiaSinImpuestos,$rootScope.datosTarifa.terminoEnergiaConDhP3);


			// Fila 25 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConProducto($rootScope.calculos.usuario_particular.alquiler_de_contador,10);
			$rootScope.calculos.usuario_particular.alquiler_de_contador=$rootScope.calculos.usuario_particular.alquiler_de_contador.map(Math.round);



			// Fila 34 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstant);
			$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaInstantaneamente.map(Math.round);


			//Fila 33 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoN33UsuarioParticular();


			//Fila 36 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferred);
			$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaDeFormaDiferida=$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaDeFormaDiferida.map(Math.round);

			//Fila 32 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos.usuario_particular.sinDH.electricidadConsumida,$rootScope.calculos.usuario_particular.sinDH.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaDeFormaDiferida);


			// Fila 31 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos.usuario_particular.sinDH.valor,$rootScope.calculos.usuario_particular.sinDH.electricidadConsumida,$rootScope.calculos.usuario_particular.sinDH.terminoDeEnergiaConImpuestos);

			// Fila 41 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP1);
			$rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 40 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos.usuario_particular.conDH.p1.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP1);

			// Fila 6 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoProductoFijoEntre100($rootScope.calculos.usuario_particular.sinDH.costeElectricidadConsumida,$rootScope.objetoTabla.demand,$rootScope.calculos.usuario_particular.sinDH.terminoDeEnergiaConImpuestos);
			$rootScope.calculos.usuario_particular.sinDH.costeElectricidadConsumida=$rootScope.calculos.usuario_particular.sinDH.costeElectricidadConsumida.map(Math.round);

			// Fila 42 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP1);


			// Fila 45 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP2);
			$rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 49 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaInstantaneamente,0.006,$rootScope.objetoTabla.selfConsumedInstantP3);
			$rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaInstantaneamente=$rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaInstantaneamente.map(Math.round);

			// Fila 44 USUARIO-PARTICULAR
			// N44= B35
			// O44= N44 + N45 - O45
			calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos.usuario_particular.conDH.p2.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP2);

			// Fila 46 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP2);

			// Fila 50 USUARIO-PARTICULAR
			calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaDeFormaDiferida,0.006,$rootScope.objetoTabla.selfConsumedDeferredP3);


			// Fila 43 USUARIO-PARTICULAR
			// N44 - N46
			calculosGenericosFactory.calculos.calculoResta($rootScope.calculos.usuario_particular.conDH.p2.electricidadConsumida,$rootScope.calculos.usuario_particular.conDH.p2.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaDeFormaDiferida);


			// Fila 10 USUARIO-PARTICULAR
			// ( L12*N16 + L13*N18 + L14*N20) /100
			//calculoSumaProductos(calculo,fijo1,dato1,fijo2,dato2,fijo3,dato3)
			calculosGenericosFactory.calculos.calculoSumaProductos($rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumida,
				$rootScope.objetoTabla.demandP1,
				$rootScope.calculos.usuario_particular.conDH.p1.terminoDeEnergiaSinImpuestos,
				$rootScope.objetoTabla.demandP2,
				$rootScope.calculos.usuario_particular.conDH.p2.terminoDeEnergiaSinImpuestos,
				$rootScope.objetoTabla.demandP3,
				$rootScope.calculos.usuario_particular.conDH.p3.terminoDeEnergiaSinImpuestos
			);
			$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumida=$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumida.map(Math.round);


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
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p1.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p1.peajesDeBNConDH);

			// Fila 70
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p2.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p2.peajesDeBNConDH);

			// Fila 76
			calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.conDH.p3.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.conDH.p3.peajesDeBNConDH);

			// Fila 5 USUARIO-PARTICULAR
			// Si el valor equivale a WITHOUT_HD entonces asignamos el conjunto verdadero
			if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
				$rootScope.calculos.usuario_particular.costeElectricidadConsumidaSinFV=$rootScope.calculos.usuario_particular.sinDH.costeElectricidadConsumida;
			}else{
				$rootScope.calculos.usuario_particular.costeElectricidadConsumidaSinFV=$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumida;
			}

			//Fila 4 USUARIO-PARTICULAR
			//  N4 = -N5 - N25
			calculosGenericosFactory.calculos.calcularRestaInvertido($rootScope.calculos.usuario_particular.cashflowEscenarioSinFV,
				$rootScope.calculos.usuario_particular.costeElectricidadConsumidaSinFV,
				$rootScope.calculos.usuario_particular.alquiler_de_contador);



				// Fila 48 USUARIO-PARTICULAR
				calculosGenericosFactory.calculos.calculoSumaResta($rootScope.calculos.usuario_particular.conDH.p3.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaInstantaneamente,$rootScope.objetoTabla.consumedNetP3);

				// Fila 47 USUARIO-PARTICULAR
				// N47= N48 - N50
				calculosGenericosFactory.calculos.calculoResta($rootScope.calculos.usuario_particular.conDH.p3.electricidadConsumida,$rootScope.calculos.usuario_particular.conDH.p3.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaDeFormaDiferida);

				// FILA 39 USUARIO-PARTICULAR
				calculosGenericosFactory.calculos.calculoResta($rootScope.calculos.usuario_particular.conDH.p1.electricidadConsumida,$rootScope.calculos.usuario_particular.conDH.p1.electricidadExtraidaDeLaRed,$rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaDeFormaDiferida);

				// Fila 37 USUARIO-PARTICULAR
				calculosGenericosFactory.calculos.calcularMultiplicacionSeisDatosEntre100($rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumidaSinFV,
					$rootScope.calculos.usuario_particular.conDH.p1.electricidadConsumida,
					$rootScope.calculos.usuario_particular.conDH.p1.terminoDeEnergiaSinImpuestos,
					$rootScope.calculos.usuario_particular.conDH.p2.electricidadConsumida,
					$rootScope.calculos.usuario_particular.conDH.p2.terminoDeEnergiaSinImpuestos,
					$rootScope.calculos.usuario_particular.conDH.p3.electricidadConsumida,
					$rootScope.calculos.usuario_particular.conDH.p3.terminoDeEnergiaSinImpuestos
				);
				$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumidaSinFV=$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumidaSinFV.map(Math.round);


				// Fila 113 USUARIO-PARTICULAR L114=20
				calculosGenericosFactory.calculos.calculoConProducto($rootScope.calculos.usuario_particular.alquiler_de_contadorConFV,20);
				$rootScope.calculos.usuario_particular.alquiler_de_contadorConFV=$rootScope.calculos.usuario_particular.alquiler_de_contadorConFV.map(Math.round);

				// Fila 115 USUARIO-PARTICULAR
				// N115 = L116 = L117 * L105 * L106
				// O115 =
				// L117 = $rootScope.userType.costeDeSeguro
				// L105 = $rootScope.objetoTabla.power
				// L106 = 1.15
				// L116= 	$rootScope.userType.costeDeSeguro*$rootScope.objetoTabla.power*1.15
				calculosGenericosFactory.calculos.calcularProductoIPC($rootScope.calculos.usuario_particular.costesDeSeguro,
					$rootScope.userType.costeDeSeguro*$rootScope.objetoTabla.power*1.15);
					$rootScope.calculos.usuario_particular.costesDeSeguro=$rootScope.calculos.usuario_particular.costesDeSeguro.map(Math.round);

					// Fila 118
					// N118= L119*(1-L122)
					// L119= L105*L106*L120*(1+IVA-L121)*1000
					// L106 = 1.15
					// L105 = $rootScope.objetoTabla.power
					// L120 = $rootScope.objetoTabla.llaveEnMano
					// L121 = $rootScope.outputs.modelParams.investmentAids
					// L122 = $rootScope.outputs.modelParams.apalancamiento
					calculosGenericosFactory.calculos.calcularConIVAEInversion($rootScope.calculos.usuario_particular.inversionInicial);

					// Fila 123 USUARIO-PARTICULAR
					// N123 = L124*L126 --> gastosFinancieros.cantidadFinanciada * gastosFinancieros.costeDeuda;
					// O123 =
					// L124 = L119 * L122 --> inversionInicial.inversionTotalConIVA * $rootScope.userType.apalancamiento
					// L126 = $rootScope.userType.costeDeuda
					$rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada= $rootScope.calculos.inputs.inversionInicial.inversionTotalConIVA*$rootScope.userType.apalancamiento;
					$rootScope.calculos.inputs.gastosFinancieros.costeDeuda= $rootScope.userType.costeDeuda;
					$rootScope.calculos.inputs.gastosFinancieros.duracion=$rootScope.userType.duracionDeuda;

					// Calculamos los intereses iniciales
					$rootScope.calculos.usuario_particular.calculoGastosFinancieros.intereses[0] = $rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada * $rootScope.calculos.inputs.gastosFinancieros.costeDeuda;

					// Calculamos el pago inicial
					calculosGenericosFactory.calculos.calculoPagoInicial();


					// Calculamos la amortizacion inicial
					$rootScope.calculos.usuario_particular.calculoGastosFinancieros.amortizacion[0] = $rootScope.calculos.usuario_particular.calculoGastosFinancieros.pagoInicial[0] - $rootScope.calculos.usuario_particular.calculoGastosFinancieros.intereses[0];
					// Calculamos el elemento inicial del saldo
					$rootScope.calculos.usuario_particular.calculoGastosFinancieros.saldo[0] = $rootScope.calculos.inputs.gastosFinancieros.cantidadFinanciada - $rootScope.calculos.usuario_particular.calculoGastosFinancieros.amortizacion[0];




					// Calculamos los intereses restantes
					calculosGenericosFactory.calculos.calculoInteresesDelUsuarioParticular();


					// Calculamos el coste de cambio de inversor con IVA  L108
					calculosGenericosFactory.calculos.calculoCosteCambioInversorConIVA();


					// Calculamos el incremento del coste del inversor tomando en cuenta IPC y maduración tecnológica fila 110 USUARIO-PARTICULAR
					$rootScope.calculos.inputs.costesOM.incrementoCosteInversorIPCMaduracion= $rootScope.IPC-$rootScope.calculos.inputs.costesOM.disminucionDelCosteMaduracionTecnologica;

					// Fila 107 - Coste cambio inversor con IVA actualizado
					calculosGenericosFactory.calculos.calculoCosteCambioInversorConIVAActualizado();


					// Fila 62 - Coste de la electricidad con dh
					calculosGenericosFactory.calculos.calculoSumaProductosArray($rootScope.calculos.usuario_particular.conDH.costeElectricidadConDH,$rootScope.calculos.usuario_particular.conDH.p1.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos.usuario_particular.conDH.p1.cuotaBNConImpuestos,$rootScope.calculos.usuario_particular.conDH.p2.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos.usuario_particular.conDH.p2.cuotaBNConImpuestos,$rootScope.calculos.usuario_particular.conDH.p3.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos.usuario_particular.conDH.p3.cuotaBNConImpuestos);

					$rootScope.calculos.sistema_electrico.sinDH.cuotaBN=$rootScope.datosTarifa.peajeAccesoEnergiaSinDh+1;


					// Calculamos la fila 54
					calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.sinDH.cuotaBNConImpuestos,$rootScope.calculos.sistema_electrico.sinDH.cuotaBN);


					// Calculamos la fila 53
					calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos.usuario_particular.sinDH.costeElectricidadFVAutoconsumidaDiferida,$rootScope.calculos.usuario_particular.sinDH.electricidadAutoconsumidaDeFormaDiferida,$rootScope.calculos.usuario_particular.sinDH.cuotaBNConImpuestos);


					// Fila 52 USUARIO-PARTICULAR
					if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
						$rootScope.calculos.usuario_particular.costeElectricidadFVAutoconsumidaDiferida=$rootScope.calculos.usuario_particular.sinDH.costeElectricidadFVAutoconsumidaDiferida;
					}else{
						$rootScope.calculos.usuario_particular.costeElectricidadFVAutoconsumidaDiferida=$rootScope.calculos.usuario_particular.conDH.costeElectricidadConDH;
					}


					// Calculamos la fila 103
					$rootScope.calculos.inputs.costesDeOM=0*$rootScope.objetoTabla.power*$rootScope.calculos.inputs.caracteristicasTecnicas.ratio;

					// Fila 102
					calculosGenericosFactory.calculos.calculoConProducto($rootScope.calculos.usuario_particular.costesOM.costesOMConIVA,$rootScope.calculos.inputs.costesDeOM);

					// Fila 101 USUARIO-PARTICULAR
					calculosGenericosFactory.calculos.calculoSuma($rootScope.calculos.usuario_particular.costeDeOM,$rootScope.calculos.usuario_particular.costesOM.costesOMConIVA,$rootScope.calculos.inputs.costesOM.costeCambioInversorConIVAActualizado);


					// Calculamos el input de la fila 86
					if($rootScope.outputs.modelParams.backupToll.value=="0"){
						$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos=0;
					}else{
						$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos=$rootScope.datosTarifa.peajeRespaldoSinDh;
					}


					// Fila 85 USUARIO-PARTICULAR
					calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaConImpuestos,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaSinImpuestos)

					// Fila 84
					calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.electricidadAutoconsumidaInstantaneamente,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstant);

					// Fila 83 USUARIO-PARTICULAR
					// N83 = N84*N85/100
					calculosGenericosFactory.calculos.calculoProductoEntre100($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.costePeaje,$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.electricidadAutoconsumidaInstantaneamente,$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.terminoDeEnergiaConImpuestos);


					// Fila 89
					// selfConsumedInstantP1
					calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p1.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP1);

					// Fila 90
					// selfConsumedInstantP2
					calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p2.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP2);

					// Fila 91
					// selfConsumedInstantP3
					calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.conDH.p3.consumo,$rootScope.calculos.inputs.caracteristicasTecnicas.perdidaRendimientoAnual,$rootScope.objetoTabla.selfConsumedInstantP3);




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
					calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1);

					// Fila 95
					calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2);


					// Fila 97
					calculosGenericosFactory.calculos.calculoConProductoEIncremento($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3,$rootScope.calculos.inputs.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3);



					// Fila 87
					calculosGenericosFactory.calculos.calcularMultiplicacionSeisDatosEntre100($rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.costePeajeRespaldoConImpuestos,
						$rootScope.calculos.usuario_particular.conDH.p1.consumo,$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p1,
						$rootScope.calculos.usuario_particular.conDH.p2.consumo,$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p2,
						$rootScope.calculos.usuario_particular.conDH.p3.consumo,$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.terminoDeEnergiaDHConImpuestos.p3);


						// Fila 82
						// Si el valor equivale a WITHOUT_HD entonces asignamos el conjunto verdadero
						if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
							$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.valor=$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.sinDH.costePeaje;
						}else{
							$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.valor=$rootScope.calculos.usuario_particular.costePeajeRespaldoConImpuestos.conDH.costePeajeRespaldoConImpuestos;
						}


						// Fila 30
						if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
							$rootScope.calculos.usuario_particular.costeElectricidadConsumida.valor=$rootScope.calculos.usuario_particular.sinDH.valor;
						}else{
							$rootScope.calculos.usuario_particular.costeElectricidadConsumida.valor=$rootScope.calculos.usuario_particular.conDH.costeElectricidadConsumidaSinFV;
						}

						// Fila 28
						calculosGenericosFactory.calculos.calculoCashflowEscenarioConFV();

						// Fila 130 de USUARIO-PARTICULAR
						calculosGenericosFactory.calculos.calculoResta($rootScope.calculos.usuario_particular.cashflowDelAhorroComparativoEnElCasoFV,$rootScope.calculos.usuario_particular.cashflowEscenarioConFV,$rootScope.calculos.usuario_particular.cashflowEscenarioSinFV);
						$rootScope.calculos.usuario_particular.cashflowDelAhorroComparativoEnElCasoFV=$rootScope.calculos.usuario_particular.cashflowDelAhorroComparativoEnElCasoFV.map(Math.round);


						// Fila 137 de USUARIO-PARTICULAR
						calculosGenericosFactory.calculos.calculoSumaArrayConDato($rootScope.calculos.usuario_particular.indicadores.cashflowAcumulado,$rootScope.calculos.usuario_particular.cashflowDelAhorroComparativoEnElCasoFV);

						$rootScope.calculos.usuario_particular.indicadores.cashflowAcumulado=$rootScope.calculos.usuario_particular.indicadores.cashflowAcumulado.map(Math.round);

						// Fila 151 de USUARIO-PARTICULAR
						calculosGenericosFactory.calculos.calcularProductoArrayEntre100($rootScope.calculos.usuario_particular.precioMedioElectricidadComprada,$rootScope.calculos.usuario_particular.cashflowEscenarioSinFV,$rootScope.objetoTabla.demand);

						// Fila 142 de USUARIO-PARTICULAR
						calculosGenericosFactory.calculos.calculoConAsignacionDirecta($rootScope.calculos.usuario_particular.energiaProducida,0.006,$rootScope.objetoTabla.production);
						$rootScope.calculos.usuario_particular.energiaProducida=$rootScope.calculos.usuario_particular.energiaProducida.map(Math.round);


						// Calculamos el VAN de la energia producida
						$rootScope.calculos.usuario_particular.VANEnergiaProducida=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.energiaProducida,$rootScope.userType.tasaDescuentoUsuario);

						// Calculamos el VAN de los costes del OM
						$rootScope.calculos.usuario_particular.VANCostesOM=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.costeDeOM,$rootScope.userType.tasaDescuentoUsuario);

						// Calculamos el VAN del alquiler del contador
						$rootScope.calculos.usuario_particular.VANAlquilerContador=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.alquiler_de_contadorConFV,$rootScope.userType.tasaDescuentoUsuario);

						// Calculamos el VAN de los costes del seguro
						$rootScope.calculos.usuario_particular.VANCostesSeguro=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.costesDeSeguro,$rootScope.userType.tasaDescuentoUsuario);

						// Calculamos el VAN de la inversion inicial
						$rootScope.calculos.usuario_particular.VANInversionInicial=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.inversionInicial,$rootScope.userType.tasaDescuentoUsuario);
 
						// Calculamos el VAN de los gastos financieros
						$rootScope.calculos.usuario_particular.VANGastosFinancieros=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.calculoGastosFinancieros.intereses,$rootScope.userType.tasaDescuentoUsuario);

						// Calculamos el VAN del pago principal
						$rootScope.calculos.usuario_particular.VANPagoPrincipal=calculosGenericosFactory.calculos.calcularVAN($rootScope.calculos.usuario_particular.calculoGastosFinancieros.amortizacion,$rootScope.userType.tasaDescuentoUsuario);

						$rootScope.calculos.usuario_particular.LCOE=($rootScope.calculos.usuario_particular.VANPagoPrincipal+
						$rootScope.calculos.usuario_particular.VANGastosFinancieros+
						$rootScope.calculos.usuario_particular.VANInversionInicial+
						$rootScope.calculos.usuario_particular.VANCostesSeguro+
						$rootScope.calculos.usuario_particular.VANAlquilerContador+
						$rootScope.calculos.usuario_particular.VANCostesOM)/($rootScope.calculos.usuario_particular.VANEnergiaProducida*100)*10000;
						$rootScope.calculos.usuario_particular.LCOE=Math.round($rootScope.calculos.usuario_particular.LCOE*10)/10;


						// debugger;


					},
					calculos:{
						calcularTIR:calculosGenericosFactory.calculos.calcularTIR,
						calcularVAN:calculosGenericosFactory.calculos.calcularVAN,
						calcularPorcentajeDeEnergia:calculosGenericosFactory.calculos.calcularPorcentajeDeEnergia
					}

				};

				return calculoImpactForTheSelfConsumerFactory;




			}]);
