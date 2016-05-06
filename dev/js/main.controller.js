app.controller("mainController",
["$scope","calculoImpactOnPublicFinancesFactory","calculoImpactForTheElectricitySystemFactory","calculoImpactForTheSelfConsumerFactory","calculoImpactForTheElectricitySystemFactory","$rootScope","modelFactory" ,
function($scope,calculoImpactOnPublicFinancesFactory,calculoImpactForTheElectricitySystemFactory,calculoImpactForTheSelfConsumerFactory,calculoImpactForTheElectricitySystemFactory,$rootScope, modelFactory){





	$scope.init=function(){
		initConstantes();
		initDatos();
		initDatosCalculados();


		//WATCH


		// Watch cambios para generar los outputs de energy flows
		$scope.$watch('outputs', function(newValue, oldValue, scope) {
			if($scope.outputs.generalChar && $scope.outputs.modelParams && $scope.energyFlowsCalculation && $scope.inputs){
				fillEnergyFlow();
			}
		},true);


		$scope.$watch('outputs.modelParams.excedentsToll', function(newValue, oldValue,scope) {
			if(oldValue!="" && $scope.outputs.modelParams && $scope.inputs && $scope.outputs.generalChar && $scope.energyFlowsCalculation){
				fillEnergyFlow();
			}
		});

		$scope.$watch('outputs.generalChar.capacity.value', function(newValue, oldValue,scope) {
			if(oldValue!="" && $scope.outputs.modelParams && $scope.inputs && $scope.outputs.generalChar && $scope.energyFlowsCalculation){
				fillEnergyFlow();
			}
		});

		//Cambiar valor de los inputs en model params vinculados a remuneration
		$scope.$watch('outputs.modelParams.remuneration.value', function(newValue, oldValue, scope) {
			if($scope.outputs.modelParams && $scope.inputs && $scope.outputs.generalChar && $scope.energyFlowsCalculation){
				if(newValue === 3){
					$scope.outputs.modelParams.rollingPeriod = $scope.inputs.modelParams[4].options[1];
					$scope.outputs.modelParams.exchange      = $scope.inputs.modelParams[5].options[1];
				}else{
					$scope.outputs.modelParams.rollingPeriod = $scope.inputs.modelParams[4].options[0];
					$scope.outputs.modelParams.exchange      = $scope.inputs.modelParams[5].options[0];
				}
				fillEnergyFlow();
			}
		});


		//Cambiar inputs del model params vinculados a Regulation approach

		$scope.$watch('outputs.regulatory.value', function(newValue, oldValue, scope) {
			if ($scope.outputs.regulatory && $scope.inputs) {
				switch(newValue){
					case 0:
					$scope.outputs.modelParams.remuneration   = $scope.inputs.modelParams[0].options[0];
					$scope.outputs.modelParams.backupToll     = $scope.inputs.modelParams[1].options[1];
					$scope.outputs.modelParams.excedentsToll  = 100;
					$scope.outputs.modelParams.investmentAids = 100;
					break;

					case 1:
					$scope.outputs.modelParams.remuneration   = $scope.inputs.modelParams[0].options[1];
					$scope.outputs.modelParams.backupToll     = $scope.inputs.modelParams[1].options[0];
					$scope.outputs.modelParams.excedentsToll  = 100;
					$scope.outputs.modelParams.investmentAids = 100;
					break;

					case 2:
					$scope.outputs.modelParams.remuneration   = $scope.inputs.modelParams[0].options[2];
					$scope.outputs.modelParams.backupToll     = $scope.inputs.modelParams[1].options[0];
					$scope.outputs.modelParams.excedentsToll  = 30;
					$scope.outputs.modelParams.investmentAids = 20;
					break;
				}
			}
		});


	}









	function initConstantes(){
		// Declaramos las variables globales para los calculos
		$rootScope.IVA=0.21;
		$rootScope.IPC=0.02;

		// Impuesto sobre la electricidad
		$rootScope.IE=5.11/100;
		$rootScope.producto=(1+$rootScope.IVA)*(1+$rootScope.IE);
		// Configuracion con constantes a partir de inputs
		$rootScope.config={
			tableCode:"",
			tipoUsuario:'usuario_particular',
			tipoHacienda:'hacienda_particular'
		};
		$rootScope.vidaUtil=25;
		$rootScope.vidaUtilInversor=16;
		// Numero de annos
		$rootScope.annos=35;
		$rootScope.datosTarifa={};
	}




	// Inicializa los objetos de los calculos
	function initDatosCalculados(){
		var objetoHacienda={
			// Referencia al tercer dato de las tablas de hacienda
			cashflowAcumulado:[],

			IEElectricidadConsumidaFormaDiferida:{

				// Referencia a la fila 66 de hacienda_particular
				valor:[],

				sinDH:{

					// Referencia a la fila 67 de hacienda_particular
					valor:[],

					// Referencia a la fila 68 de hacienda_particular
					cuotaBN:[]
				},
				conDH:{

					// Referencia de la fila 69 de hacienda_particular
					valor:[],

					// Referencia a la fila 71 de hacienda_particular
					p1:[],

					// Referencia a la fila 72 de hacienda_particular
					p2:[],

					// Referencia a la fila 73 de hacienda_particular
					p3:[]
				}
			},
			IVAElectricidadAutoconsumidaDiferida:{

				// Referencia a la fila 48 de hacienda_particular
				valor:[],

				sinDH:{

					// Referencia a la fila 49 de hacienda_particular
					valor:[],

					// Referencia a la fila 50 de hacienda_particular
					IVASinCuotaBN:[],

					// Referencia a la fila 52 de hacienda_particular
					electricidadAutoconsumidaDeFormaDiferida:[]
				},
				conDH:{
					// Referencia a la fila 53 de hacienda_particular
					valor:[],

					p1:{
						// Referencia a la fila 56 de hacienda_particular
						cuotaBN:0,

						// Referencia a la fila 57 de hacienda_particular
						electricidadAutoconsumidaDeFormaDiferida:[]
					},

					p2:{

						// Referencia a la fila 60 de hacienda_particular
						cuotaBN:0,

						// Referencia a la fila 61 de hacienda_particular
						electricidadAutoconsumidaDeFormaDiferida:[]
					},

					p3:{

						// Referencia a la fila 64 de hacienda_particular
						cuotaBN:0,

						// Referencia a la fila 65 de hacienda_particular
						electricidadAutoconsumidaDeFormaDiferida:[]
					}
				}
			},
			IEElectricidadConsumida:{


				// Fila 45 hacienda_particular
				valor:[],
				sinDH:{

					// Fila 46 hacienda_particular
					valor:[],

					// Fila 26 hacienda_particular
					terminoDeEnergiaSinDH:[]
				},
				conDH:{

					// Referencia a la fila 47 de hacienda_particular
					valor:[],

					// Fila 29 hacienda_particular
					p1:[],

					// Fila 30 hacienda_particular
					p2:[],

					// Fila 31 hacienda_particular
					p3:[]
				}
			},
			recaudacionEscenarioSinFV:{

				// Referencia a la fila 4 de hacienda_particular
				valor:[],

				IVAAlquilerContador:{

					// Referencia a la fila 32 de hacienda_particular
					valor:[]
				},
				IEElectricidadConsumida:{

					// Referencia a la fila 24 de hacienda_particular
					valor:[],
					sinDH:{

						// Referencia a la fila 25 de hacienda_particular
						valor:[]
					},
					conDH:{

						// Referencia a la fila 27 de hacienda_particular
						valor:[]
					}
				},
				IVAElectricidadConsumida:{

					// Referencia a la fila 5 de hacienda_particular
					valor:[]
				},
				sinDH:{

					// Referencia a la fila 6 de hacienda_particular
					valor:[],

					// Referencia a la fila 8 de hacienda_particular
					IVATerminoEnergiaSinDH:[]
				},
				conDH:{

					// Referencia a la fila 10 de hacienda_particular
					valor:[],

					IVATerminoEnergiaConDH:{

						// Referencia a la fila 16 de hacienda_particular
						p1:[],

						// Referencia a la fila 18 de hacienda_particular
						p2:[],

						// Referencia a la fila 20 de hacienda_particular
						p3:[]
					}
				}
			},
			IVAElectricidadConsumida:{

				// Referencia a la fila 36 de hacienda_particular
				valor:[],
				conDH:{
					electricidadConsumida:{

						// Referencia a la fila 39 de hacienda_particular
						valor:[],

						// Referencia a la fila 41 de hacienda_particular
						p1:[],

						// Referencia a la fila 42 de hacienda_particular
						p2:[],

						// Referencia a la fila 43 de hacienda_particular
						p3:[]
					}
				},
				sinDH:{

					// Referencia a la fila 37 de hacienda_particular
					valor:[],

					// Referencia a la fila 8 de hacienda_particular
					terminoDeEnergiaSinDH:[],

					// Referencia a la fila 38 de hacienda_particular
					electricidadConsumida:0
				}
			},

			IVAPeajeRespaldo:{

				// Referencia a la fila 74 de hacienda_particular
				valor:[],
				// Referencia a la fila 75 de hacienda_particular
				valorBasePeajeRespaldo:[]
			},
			IVACostesOM:{

				// Referencia a la fila 77 de hacienda_particular
				valor:[],
				IVACostesOM:{
					// Referencia a la fila 78 de hacienda_particular
					valor:[],

					// Referencia a la fila 79 de hacienda_particular
					costesOM:0
				},
				IVACosteCambioInversorActualizado:{

					// Referencia a la fila 80 de hacienda_particular
					valor:[],

					// Referencia a la fila 81 de hacienda_particular
					IVACosteCambioInversor:0
				}
			},
			IVAAlquilerContador:{

				// Referencia a la fila 86 de hacienda_particular
				valor:[]
			},
			impuestoPrimasSeguros:{

				// Referencia a la fila 88 de hacienda_particular
				valor:[],

				// Referencia a la fila 89 de hacienda_particular
				costeSeguro:[]
			},
			IVAInversion:{

				// Referencia a la fila 91 de hacienda_particular
				valor:0,

				// Referencia a la fila 92 de hacienda_particular
				inversionSinIVA:0
			},
			ayudasPublicasALaInversion:{

				// Referenia a la fila 95 de hacienda_particular
				valor:0,

				// Referencia a la fila 96 de hacienda_particular
				porcentajeDeAyudasPublicas:0
			},
			incrementoImpuestoSociedadesInstalador:{

				// Referencia a la fila 97 de hacienda_particular
				valor:0

			},
			recaudacionEscenarioConFV:{

				// Referencia a la fila 35 de hacienda_particular
				valor:[]
			},
			diferenciaRecaudacion:{

				// Referencia a la fila 100 de hacienda_particular
				valor:[]
			},
			indicadores:{

				// Referencia a la fila 104 de hacienda_particular
				VAN:0,

				// Referencia a la fila 106 de hacienda_particular
				VANPorMWn:0,

				// Referencia a la fila 107 de hacienda_particular
				VANPorKWPVGenerado:0
			}
		};
		var objetoUsuario={
			// Referencia a la fila 149
			VANPagoPrincipal:0,

			// Referencia a la fila 148
			VANGastosFinancieros:0,

			// Referencia a la fila 147
			VANInversionInicial:0,

			// Referencia a la fila 146
			VANCostesSeguro:0,

			// Referencia a la fila 145
			VANAlquilerContador:0,

			// Referencia a la fila 144
			VANCostesOM:0,

			// Referencia a la fila 141
			VANEnergiaProducida:0,



			porcentajeDeAhorroDeEnergia:0,

			// Referencia a la fila 140 de USUARIO-PARTICULAR
			LCOE:0,

			TIR:0,

			// Referencia a la fila 142 de USUARIO-PARTICULAR
			energiaProducida:[],

			// Referencia a la fila 151 de USUARIO-PARTICULAR
			precioMedioElectricidadComprada:[],

			// Referencia a la fila 130 de USUARIO-PARTICULAR
			cashflowDelAhorroComparativoEnElCasoFV:[],

			// Referencia a la fila 30 de USUARIO-PARTICULAR
			costeElectricidadConsumida:[],

			// Referencia fila 28 de USUARIO-PARTICULAR
			cashflowEscenarioConFV:[],

			// Referencia a la fila 101 de USUARIO-PARTICULAR
			costeDeOM:[],

			//Fila 137 USUARIO-PARTICULAR
			indicadores:{
				cashflowAcumulado:[]
			},
			costePeajeRespaldoConImpuestos:{

				// Fila 82 USUARIO-PARTICULAR
				valor:[],
				sinDH:{

					// Referencia a la fila 83 de USUARIO-PARTICULAR
					costePeaje:[],
					terminoDeEnergiaConImpuestos:[],

					// Referencia a la fila 84 de USUARIO-PARTICULAR
					electricidadAutoconsumidaInstantaneamente:[]
				},
				conDH:{

					// Fila 87 USUARIO-PARTICULAR
					costePeajeRespaldoConImpuestos:[],
					terminoDeEnergiaDHConImpuestos:{

						// Fila 93 USUARIO-PARTICULAR
						p1:[],

						// Fila 95 USUARIO-PARTICULAR
						p2:[],

						// Fila 97 USUARIO-PARTICULAR
						p3:[]
					}
				}
			},
			calculoGastosFinancieros:{
				// Referencia a la fila 123 de USUARIO-PARTICULAR
				intereses:[],
				// Referencia a la fila 127 de USUARIO-PARTICULAR
				amortizacion:[],
				pagoInicial:[],
				saldo:[]
			},
			gastosFinancieros:[],

			// Fila 52 - Coste de la electricidad FV auto-consumida de forma diferida
			costeElectricidadFVAutoconsumidaDiferida:[],

			// Referencia a la fila 118 de USUARIO-PARTICULAR
			inversionInicial:[],

			// Referencia a la fila 115 de USUARIO-PARTICULAR
			costesDeSeguro:[],

			// Referencia a la linea 5 de USUARIO-PARTICULAR
			costeElectricidadConsumidaSinFV:[],

			// Referencia a la linea 4 de USUARIO-PARTICULAR
			cashflowEscenarioSinFV:[],
			sinDH:{

				// Referencia a la fila 6 de USUARIO-PARTICULAR
				costeElectricidadConsumida:[],
				terminoDeEnergiaConImpuestos:[],
				electricidadAutoconsumidaInstantaneamente:[],
				electricidadAutoconsumidaDeFormaDiferida:[],

				// Fila 53 - USUARIO-PARTICULAR Coste de la electricidad FV auto-consumida de forma diferida
				costeElectricidadFVAutoconsumidaDiferida:[],
				electricidadExtraidaDeLaRed:[],
				// Hace referencia a la fila 32 de USUARIO-PARTICULAR
				electricidadConsumida:[],
				// Hace referencia a la fila 31 de USUARIO-PARTICULAR
				valor:[],
				cuotaBNConImpuestos:[]
			},
			conDH:{
				// Referencia a la fila 62 de USUARIO-PARTICULAR
				costeElectricidadConDH:[],
				// Referencia a la fila 10 de USUARIO-PARTICULAR
				costeElectricidadConsumida:[],
				// Referencia a la fila 37 de USUARIO-PARTICULAR
				costeElectricidadConsumidaSinFV:[],
				p1:{
					electricidadConsumida:[],

					// Fila 89
					consumo:[],
					terminoDeEnergiaSinImpuestos:[],
					cuotaBNConImpuestos:[],
					electricidadExtraidaDeLaRed:[],
					electricidadAutoconsumidaInstantaneamente:[],
					electricidadAutoconsumidaDeFormaDiferida:[],
					valor:[]
				},
				p2:{
					terminoDeEnergiaSinImpuestos:[],
					cuotaBNConImpuestos:[],
					electricidadAutoconsumidaInstantaneamente:[],
					electricidadAutoconsumidaDeFormaDiferida:[],
					electricidadExtraidaDeLaRed:[],
					electricidadConsumida:[],

					// Fila 90
					consumo:[],
					valor:[]
				},
				p3:{
					electricidadConsumida:[],

					// Fila 91
					consumo:[],
					terminoDeEnergiaSinImpuestos:[],
					cuotaBNConImpuestos:[],
					electricidadAutoconsumidaInstantaneamente:[],
					electricidadExtraidaDeLaRed:[],
					electricidadAutoconsumidaDeFormaDiferida:[],
					valor:[]
				}
			},
			costesOM:{
				costesOMConIVA:[]
			},
			alquiler_de_contador:[],

			// Referencia a la fila 113 USUARIO-PARTICULAR
			alquiler_de_contadorConFV:[]

		};




		$rootScope.calculos={
			inputs:{
				alquilerDeContadores:{
					sinFV:10,
					conFV:20
				},
				informacionDeContorno:{
					sistema_electrico:{

						// Referencia a la fila 82 de inputs
						factorEmisionCO2:0.41,

						// Referencia a la fila 83 de inputs
						precioToneladaCO2:15
					}
				},

				// Inputs I21
				regulacionDelAutoconsumo:{
					pagosPorCapacidad:'No'
				},
				gastosFinancieros:{

					// L125 USUARIO-PARTICULAR
					duracion:0,
					cantidadFinanciada:0,
					costeDeuda:0
				},
				caracteristicasTecnicas:{
					vidaUtilInversor:16,
					ratio:1.15,

					//Referencia a la fila 33 de inputs
					perdidaRendimientoAnual:0.6/100
				},
				// Fila 20 de INPUTS
				costesDeOM:0,
				costesOM:{
					costeCambioInversor:0.3,

					// Referencia a la fila 110 de USUARIO-PARTICULAR
					costeCambioInversorConIVA:0,

					// Referencia a la fila 110 de USUARIO-PARTICULAR
					costeCambioInversorConIVAActualizado:[],

					// Referencia a la fila 111 de USUARIO-PARTICULAR
					disminucionDelCosteMaduracionTecnologica:0.02,

					// Referencia a la fila 110 de USUARIO-PARTICULAR
					incrementoCosteInversorIPCMaduracion:0

				},
				inversionInicial:{
					inversionTotalConIVA:0
				},
				costePeajeRespaldoConImpuestos:{
					sinDH:{
						// Referencia a la linea 86 de USUARIO-PARTICULAR
						terminoDeEnergiaSinImpuestos:0
					},
					conDH:{
						terminoDeEnergiaDHConImpuestos:{

							// Fila 94 USUARIO-PARTICULAR
							p1:[],

							// Fila 96 USUARIO-PARTICULAR
							p2:[],

							// Fila 98 USUARIO-PARTICULAR
							p3:[]
						}
					}
				}
			},
			sistema_electrico:{

				// Referencia a la fila 62
				ahorroEmisionCO2:0,

				impactoAnualParaSistemaElectricoMwn:{

					// Referencia a la fila 55 sistema_electrico
					valor:0,

					// Referencia a la fila 56 sistema_electrico
					impactoAnualSistemaElectricoEspanol:0,

					// Referencia a la fila 58
					variacionIngresosPorPeajes:0
				},

				// Referencia a la fila 47 sistema_electrico
				impactoPorPeajeDeRespaldo:0,


				ingresosEnergiaCedidaSistema:{

					// Referencia a la fila 51 sistema_electrico
					valor:0,

					// Referencia a la fila 52 sistema_electrico
					energiaCedida:0,

					// Referencia a la fila 53 sistema_electrico
					precioPool:45
				},

				ingresosPorPeajeDeGeneracion:{

					// Referencia a la fila 48 sistema_electrico
					valor:0,

					// Referencia a la fila 49 sistema_electrico
					peajeDeGeneracion:0.05,

					// Referencia a la fila 50 sistema_electrico
					energiaVertidaALaRed:0
				},

				impactoPeajesBalanceNeto:{

					// Referencia a la fila 32 sistema_electrico
					valor:0,

					sinDH:{

						// Referencia a la fila 33 sistema_electrico
						valor:0,

						// Referencia a la fila 35 sistema_electrico
						peajeBNSinDH:0
					},
					conDH:{

						// Referencia a la fila 37 de sistema_electrico
						valor:0,

						peajesDeBNConDH:{

							// Referencia a la fila 43,44,45 sistema_electrico
							p1:0,
							p2:0,
							p3:0
						}
					}
				},
				impactoSobrecostesServiciosAjuste:{

					// Referencia a la fila 27 de sistema_electrico
					valor:0,

					sinDH:{

						// Referencia a la fila 28 de sistema_electrico
						valor:0,

						// Referencia a la fila 29 sistema_electrico
						sobrecosteServiciosAjuste:0
					},
					conDH:{

						// Referencia a la fila 31 de sistema_electrico
						valor:0
					}
				},
				impactoPorPagosPorCapacidad:{

					// Referencia a la fila 18
					valor:0,

					sinDH:{

						// Referencia a la fila 19
						valor:0,
						// Referencia a la fila 20
						pagosPorCapacidadSinDH:0
					},
					conDH:{

						// Referencia a la fila 22 de sistema_electrico
						valor:0,

						pagosPorCapacidadConDH:{
							p1:0,
							p2:0,
							p3:0
						}
					}
				},
				impactoPorLosPeajesDeAcceso:{

					// Referencia a la fila 4 de sistema_electrico
					valor:0,

					sinDH:{

						// Referencia a la fila 6 de sistema_electrico
						reduccionElectricidadComprada:0,

						// Referencia a la fila 5 de sistema_electrico
						valor:0,

						// Referencia a la fila 7 de sistema_electrico
						peajesDeAccesoSinDH:0
					},
					conDH:{

						// Referencia a la fila 8 de sistema_electrico
						valor:0,

						electricidadAutoconsumidaDeFormaDiferida:{

							// Fila 10 sistema_electrico
							p1:0,

							// Fila 11 sistema_electrico
							p2:0,

							// Fila 12 sistema_electrico
							p3:0
						},
						peajesAccesoConDH:{

							// Fila 14 sistema_electrico
							p1:0,

							// Fila 15 sistema_electrico
							p2:0,

							// Fila 16 sistema_electrico
							p3:0
						}


					}
				},
				conDH:{
					p1:{
						peajesDeBNConDH:0
					},
					p2:{
						peajesDeBNConDH:0
					},
					p3:{
						peajesDeBNConDH:0
					}
				},
				sinDH:{
					// Referencia a L55 de USUARIO-PARTICULAR
					cuotaBN:0
				}
			},
			usuario_particular:objetoUsuario,
			usuario_empresa:objetoUsuario,
			hacienda_particular:objetoHacienda,
			hacienda_empresa:objetoHacienda
		}

	}
	// Funcion de inicializacion de los datos relacionados con los inputs
	function initDatos(){

		$scope.outputs = {};
		$scope.chartData = {};
		$scope.chartOutputs = {};
		$scope.chartOutputs.energyFlows = {};
		$scope.chartOutputs.impactSelfConsumer = {};
		$scope.chartOutputs.impactElectricitySystem = {};
		$scope.chartOutputs.impactPublicFinances = {};


		$scope.testInputEnergyFlows = [];
		$scope.testInputImpact = [];
		$scope.testInputImpact[0] = [];
		$scope.testInputImpact[0][0] = 3;
		getDataInputs();


	}







	//////////////////////////////
	///ENERGY FLOWS
	//////////////////////////////






	function getDataInputs(){
		modelFactory.getData().then(
			function(response){
				$scope.inputs = response.data.inputs;

				modelFactory.getRegulatory().then(
					function(response){
						$scope.inputRegulatory = response.data.regulatory;
						$scope.outputs.regulatory = $scope.inputRegulatory.options[1];

						modelFactory.getEnergyFlows().then(
							function(response){
								$scope.chartData.energyFlows = response.data.energyFlows;

								modelFactory.getImpactSelfConsumer().then(
									function(response){
										$scope.chartData.impactSelfConsumer = response.data.impactSelfConsumer;

										modelFactory.getImpactElectricitySystem().then(
											function(response){
												$scope.chartData.impactElectricitySystem = response.data.impactElectricitySystem;

												modelFactory.getImpactPublicFinances().then(
													function(response){
														$scope.chartData.impactPublicFinances = response.data.impactPublicFinances;

														modelFactory.getEnergyFlowsCalculation().then(
															function(response){
																$scope.energyFlowsCalculation  = response.data;
																// fillEnergyFlow();

																modelFactory.getTarifasData().then(
																	function(response){
																		$scope.tarifas  = response.data;

																		modelFactory.getUsertype().then(
																			function(response){
																				$scope.userType  = response.data;

																				fillEnergyFlow();
																			},
																			function(error){
																				console.log(error);
																			}
																		);

																	},
																	function(error){
																		console.log(error);
																	}
																);

															},
															function(error){
																console.log(error);
															}
														);


													},
													function(error){
														console.log(error);
													}
												);

											},
											function(error){
												console.log(error);
											}
										);

									},
									function(error){
										console.log(error);
									}
								);


							},
							function(error){
								console.log(error);
							}
						);


					},
					function(error){
						console.log(error);
					}
				);

			},
			function(error){
				console.log(error);
			}
		);










	}

	// Generar los outputs de energy flows
	var fillEnergyFlow = function(){

		var discrimination  = $scope.outputs.generalChar.timeDiscrimination.value;

		if($scope.outputs.generalChar.legalStatus.name=='Company'){
			$rootScope.config.tipoUsuario='usuario_empresa';
			$rootScope.config.tipoHacienda='hacienda_empresa';
			$rootScope.producto=(1+$rootScope.IE);
		}else{
			$rootScope.config.tipoUsuario='usuario_particular';
			$rootScope.config.tipoHacienda='hacienda_particular';
			$rootScope.producto=(1+$rootScope.IE)*(1+$rootScope.IVA);
		}

		// Nos devuelve el código de 4 numeros compuesto por diferentes variables que usaremos para discriminar los datos
		// en el

		$rootScope.config.tableCode = [$scope.outputs.generalChar.location.value ,
			$scope.outputs.generalChar.consumerType.value ,
			$scope.outputs.generalChar.capacity.value ,
			$scope.outputs.modelParams.remuneration.value].join("") ;

			$scope.chartOutputs.energyFlows['annualDemand']         = $scope.energyFlowsCalculation[$rootScope.config.tableCode].demand;
			$scope.chartOutputs.energyFlows['annualGeneration']     = $scope.energyFlowsCalculation[$rootScope.config.tableCode].production;
			$scope.chartOutputs.energyFlows['production']           = $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentProduction;
			$scope.chartOutputs.energyFlows['electricityDemand']    = (discrimination === 1) ? $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfVsDemandGlobal : $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfVsDemandBalance ;
			$scope.chartOutputs.energyFlows['electricityInstantly'] = (discrimination === 1) ? $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfConsumedInstantGlobal : $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfConsumedInstantBalance ;
			$scope.chartOutputs.energyFlows['electricityManner']    = (discrimination === 1) ? $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfConsumedDeferredGlobal : $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSelfConsumedDeferredBalance ;
			$scope.chartOutputs.energyFlows['electricitySold']      = (discrimination === 1) ? $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSoldGlobal : $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentSoldBalance;
			$scope.chartOutputs.energyFlows['electricityLost']      = (discrimination === 1) ? $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentLostGlobal : $scope.energyFlowsCalculation[$rootScope.config.tableCode].percentLostBalance;

			$scope.testInputEnergyFlows = [
				$scope.energyFlowsCalculation[$rootScope.config.tableCode].selfConsumedInstant,
				$scope.energyFlowsCalculation[$rootScope.config.tableCode].selfConsumedDeferred,
				$scope.energyFlowsCalculation[$rootScope.config.tableCode].sold,
				$scope.energyFlowsCalculation[$rootScope.config.tableCode].lost
			];


			$rootScope.objetoTabla=$scope.energyFlowsCalculation[$rootScope.config.tableCode];

			$rootScope.datosTarifa=$scope.tarifas[$scope.outputs.generalChar.consumerType.name];
			$rootScope.userType=$scope.userType[$scope.outputs.generalChar.consumerType.name];
			//$rootScope.userType=$scope.userType[$scope.outputs.generalChar.legalStatus.name];

			$rootScope.outputs=$scope.outputs;


			// Refrescamos los datos de la primera grafica
			$scope.testInputEnergyFlows[0]=[$rootScope.objetoTabla.selfConsumedInstant];

			// WITHOUT_HD == true
			if($rootScope.outputs.generalChar.timeDiscrimination.value=="1"){
				$scope.testInputEnergyFlows[1]=$rootScope.objetoTabla.summarySelfConsumedDeferredGlobal;
				$scope.testInputEnergyFlows[2]=$rootScope.objetoTabla.summarySoldGlobal;
				$scope.testInputEnergyFlows[3]=$rootScope.objetoTabla.summaryLostGlobal;
			}else{
				$scope.testInputEnergyFlows[1]=$rootScope.objetoTabla.summarySelfConsumedDeferredBalance;
				$scope.testInputEnergyFlows[2]=$rootScope.objetoTabla.summarySoldBalance;
				$scope.testInputEnergyFlows[3]=$rootScope.objetoTabla.summaryLostBalance;
			}





			// Declaramos las promesas para ejecutar los calculos en segundo plano
			var promesaCalculoImpactForTheSelfConsumer=new Promise(function(resolve,reject){
				calculoImpactForTheSelfConsumerFactory.init();
				resolve(1);
			});







			promesaCalculoImpactForTheSelfConsumer.then(function(){

				// Calculamos la TIR
				$rootScope.calculos[$rootScope.config.tipoUsuario].TIR=calculoImpactForTheSelfConsumerFactory.calculos.calcularTIR($rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV);
				$scope.testInputImpact[0][0]=$rootScope.calculos[$rootScope.config.tipoUsuario].TIR;
				$scope.chartData.impactSelfConsumer[0].valor=$rootScope.calculos[$rootScope.config.tipoUsuario].TIR;

				// Calculamos el VAN
				$rootScope.calculos[$rootScope.config.tipoUsuario].VAN=calculoImpactForTheSelfConsumerFactory.calculos.calcularVAN($rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV,$rootScope.userType.tasaDescuentoUsuario);

				$scope.chartData.impactSelfConsumer[1].valor=$rootScope.calculos[$rootScope.config.tipoUsuario].VAN;

				// Calculamos el porcentaje de ahorro de energia en el anno 2
				$rootScope.calculos[$rootScope.config.tipoUsuario].porcentajeDeAhorroDeEnergia=-calculoImpactForTheSelfConsumerFactory.calculos.calcularPorcentajeDeEnergia($rootScope.calculos[$rootScope.config.tipoUsuario].cashflowDelAhorroComparativoEnElCasoFV[1],$rootScope.calculos[$rootScope.config.tipoUsuario].cashflowEscenarioSinFV[1]);

				$scope.chartData.impactSelfConsumer[2].valor=$rootScope.calculos[$rootScope.config.tipoUsuario].porcentajeDeAhorroDeEnergia;

				// Calculamos el payback simple
				var arrayFiltrado=$rootScope.calculos[$rootScope.config.tipoUsuario].indicadores.cashflowAcumulado.filter(function(x){
					return x<0;
				});
				$scope.chartData.impactSelfConsumer[3].valor=(arrayFiltrado.length==0)?arrayFiltrado.length:arrayFiltrado.length;


				// Calculo del precio medio de la electricidad comprada
				$scope.chartData.impactSelfConsumer[4].valor=$rootScope.calculos[$rootScope.config.tipoUsuario].precioMedioElectricidadComprada[0];

				// Calculo del LCOE
				$scope.chartData.impactSelfConsumer[5].valor=$rootScope.calculos[$rootScope.config.tipoUsuario].LCOE;


				$scope.$apply();


				var promesaCalculoImpactForTheElectricitySystemFactory=new Promise(function(resolve,reject){
					calculoImpactForTheElectricitySystemFactory.init();
					resolve(1);
				});

				var promesaCalculoImpactOnPublicFinancesFactory=new Promise(function(resolve,reject){
					calculoImpactOnPublicFinancesFactory.init();
					resolve(1);
				});

				// Ejecutamos la promesa para calcular la tercera tabla de resultados
				promesaCalculoImpactForTheElectricitySystemFactory.then(function(){

					$scope.chartData.impactElectricitySystem[0].valor=$rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.impactoAnualSistemaElectricoEspanol;
					$scope.chartData.impactElectricitySystem[1].valor=$rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.valor;
					$scope.chartData.impactElectricitySystem[2].valor=$rootScope.calculos.sistema_electrico.impactoAnualParaSistemaElectricoMwn.variacionIngresosPorPeajes;
					$scope.chartData.impactElectricitySystem[3].valor=$rootScope.calculos.sistema_electrico.ahorroEmisionCO2;
					$scope.$apply();



					promesaCalculoImpactOnPublicFinancesFactory.then(function(){
						$scope.chartData.impactPublicFinances[0].valor=$rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorMWn;
						$scope.chartData.impactPublicFinances[1].valor=$rootScope.calculos[$rootScope.config.tipoHacienda].indicadores.VANPorKWPVGenerado;
						$scope.testPublicFinances=$rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado;
						var arrayFiltrado=[];
						if($rootScope.config.tipoUsuario=='usuario_empresa'){
							var k=0;
							while(k<$rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado.length && $rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado[k]>0){
								arrayFiltrado.push($rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado[k]);
								k++;
							}
						}else{
							arrayFiltrado=$rootScope.calculos[$rootScope.config.tipoHacienda].cashflowAcumulado.filter(function(x){
								return x>0;
							});
						}						$scope.chartData.impactPublicFinances[2].valor=(arrayFiltrado.length==0)?arrayFiltrado.length:arrayFiltrado.length;

						$scope.$apply();
					});




				});



			});







		}



	}]);
