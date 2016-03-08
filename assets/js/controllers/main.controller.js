app.controller("mainController",["$scope","calculoFactory","modelFactory" ,function($scope,calculoFactory, modelFactory){
	$scope.init=function(){
 
		initDatos();
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

    getDataInputs();
    getCalculation();
    
    $scope.testInputEnergyFlows = [];
    $scope.testInputImpact = [];
    $scope.testInputImpact[0] = [];
    $scope.testInputImpact[0][0] = 3;
    $scope.testPublicFinances = [6003, 5300, 4903, 4500, 2444, 2344, 1230, 403, -233, -344, -1400, -1923, -2654, -2920, -3402, -4002, -5543, -5666, -6003, -6349, -6703, -8003, -8304, -9003, -9600];
    
  }

	// Calcula la aproximacion para una tir determinada
	var calcularAprox=function(ft,tir){
	  var suma=0;
	  for (var i = 0; i < ft.length; i++) {
	    suma+=(ft[i]/(Math.pow(1+tir,i)));
	  }
	  return parseFloat(suma);
	}

	var calcularTIR=function(){
	  console.time("Calculo tir");
	  var tir=50/100;
	  var incremento=100/100;
	  var ft=[-9.388,357,362,366,371,376,380,385,390,395,400,405,410,416,421,-844,432,437,443,448,454,460,466,472,478,484,490,496,502,508,515,-749,528,535,541];
	  var aprox=0;
	  var margen_error=0.0000001;
	  var estado;
	  var i=0;
	  aprox=calcularAprox(ft,tir);
	  estado=(aprox>0)?estado='positive':estado='negative';

	  do{
	    aprox=calcularAprox(ft,tir);
	    console.log("Aprox: "+aprox+" tir: "+tir+" estado: "+estado+" paso: "+incremento);
	    if(aprox>0){
	      if(estado=='negative'){
	        estado='positive';
	        incremento*=0.1;
	      }
	      tir+=incremento;
	    }
	    else{
	      if(estado=='positive'){
	        estado='negative';
	        incremento*=0.1;
	      }
	      tir-=incremento;
	    }
	  }while(Math.abs(aprox)>margen_error);

	  console.timeEnd("Calculo tir");



	}


  //////////////////////////////
  ///ENERGY FLOWS
  //////////////////////////////

  //WATCH

  // Watch cambios para generar los outputs de energy flows
  $scope.$watchCollection('[outputs.generalChar.timeDiscrimination, outputs.generalChar.location, outputs.generalChar.consumerType, outputs.generalChar.capacity, outputs.modelParams.remuneration]', function(newCollection, oldCollection, scope) {
    if($scope.outputs.generalChar && $scope.outputs.modelParams && $scope.energyFlowsCalculation){
      fillEnergyFlow();
    }
  });
  
  //Cambiar valor de los inputs en model params vinculados a remuneration
  $scope.$watch('outputs.modelParams.remuneration.value', function(newValue, oldValue, scope) {
    if($scope.outputs.modelParams && $scope.inputs){
      if(newValue === 3){
        $scope.outputs.modelParams.rollingPeriod = $scope.inputs.modelParams[4].options[1];
        $scope.outputs.modelParams.exchange      = $scope.inputs.modelParams[5].options[1];
      }else{
        $scope.outputs.modelParams.rollingPeriod = $scope.inputs.modelParams[4].options[0];
        $scope.outputs.modelParams.exchange      = $scope.inputs.modelParams[5].options[0];
      }
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
        default:
        break;
      }
    }
  });


  //FUNCTIONS

  $scope.sendData = function(){
  	console.log($scope.chartOutputs);
  }
 
  function getCalculation(){
    modelFactory.getEnergyFlowsCalculation().then(
      function(response){
        $scope.energyFlowsCalculation  = response.data;
        fillEnergyFlow();
      },
      function(error){
        console.log(error);
      }
    )
  }

  function getDataInputs(){

  	modelFactory.getData().then(

  		function(response){
  			$scope.inputs = response.data.inputs;
  		}, 
  		function(error){
  			console.log(error);
  		}
    );

    modelFactory.getRegulatory().then(
      function(response){
        $scope.inputRegulatory = response.data.regulatory;
        $scope.outputs.regulatory = $scope.inputRegulatory.options[1];
      },
      function(error){
        console.log(error);
      }
    );

    modelFactory.getEnergyFlows().then(
      function(response){
        $scope.chartData.energyFlows = response.data.energyFlows;
      },
      function(error){
        console.log(error);
      }
    );

    modelFactory.getImpactSelfConsumer().then(
      function(response){
        $scope.chartData.impactSelfConsumer = response.data.impactSelfConsumer;
      },
      function(error){
        console.log(error);
      }
    );

    modelFactory.getImpactElectricitySystem().then(
      function(response){
        $scope.chartData.impactElectricitySystem = response.data.impactElectricitySystem;
      },
      function(error){
        console.log(error);
      }
    );

    modelFactory.getImpactPublicFinances().then(
      function(response){
        $scope.chartData.impactPublicFinances = response.data.impactPublicFinances;
      },
      function(error){
        console.log(error);
      }
    );
  }

  // Generar los outputs de energy flows
  var fillEnergyFlow = function(){

      var discrimination  = $scope.outputs.generalChar.timeDiscrimination.value;
      var energyFlowsCode = [$scope.outputs.generalChar.location.value , $scope.outputs.generalChar.consumerType.value , $scope.outputs.generalChar.capacity.value , $scope.outputs.modelParams.remuneration.value].join("") ;

      
      $scope.chartOutputs.energyFlows['annualDemand']         = $scope.energyFlowsCalculation[energyFlowsCode].demand;
      $scope.chartOutputs.energyFlows['annualGeneration']     = $scope.energyFlowsCalculation[energyFlowsCode].production;
      $scope.chartOutputs.energyFlows['production']           = $scope.energyFlowsCalculation[energyFlowsCode].percentProduction;
      $scope.chartOutputs.energyFlows['electricityDemand']    = (discrimination === 1) ? $scope.energyFlowsCalculation[energyFlowsCode].percentSelfVsDemandGlobal : $scope.energyFlowsCalculation[energyFlowsCode].percentSelfVsDemandBalance ;
      $scope.chartOutputs.energyFlows['electricityInstantly'] = (discrimination === 1) ? $scope.energyFlowsCalculation[energyFlowsCode].percentSelfConsumedInstantGlobal : $scope.energyFlowsCalculation[energyFlowsCode].percentSelfConsumedInstantBalance ;
      $scope.chartOutputs.energyFlows['electricityManner']    = (discrimination === 1) ? $scope.energyFlowsCalculation[energyFlowsCode].percentSelfConsumedDeferredGlobal : $scope.energyFlowsCalculation[energyFlowsCode].percentSelfConsumedDeferredBalance ;
      $scope.chartOutputs.energyFlows['electricitySold']      = (discrimination === 1) ? $scope.energyFlowsCalculation[energyFlowsCode].percentSoldGlobal : $scope.energyFlowsCalculation[energyFlowsCode].percentSoldBalance;
      $scope.chartOutputs.energyFlows['electricityLost']      = (discrimination === 1) ? $scope.energyFlowsCalculation[energyFlowsCode].percentLostGlobal : $scope.energyFlowsCalculation[energyFlowsCode].percentLostBalance;

      $scope.testInputEnergyFlows = [

        $scope.energyFlowsCalculation[energyFlowsCode].selfConsumedInstant, 
        $scope.energyFlowsCalculation[energyFlowsCode].selfConsumedDeferred, 
        $scope.energyFlowsCalculation[energyFlowsCode].sold, 
        $scope.energyFlowsCalculation[energyFlowsCode].lost

      ];

  }

 
  
}]);
