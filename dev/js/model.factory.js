app.factory('modelFactory', ['$http', function($http){

	var directory='models/';

	return{
		getData : function (){
			return $http({
				method : 'GET',
				url    : directory+'inputs.model.json'
			})
		},
		getRegulatory : function(){
			return $http({
				method : 'GET',
				url    : directory+'inputRegulation.model.json'
			})
		},
		getEnergyFlows : function(){
			return $http({
				method : 'GET',
				url    : directory+'energyFlows.model.json'
			})
		},
		getImpactSelfConsumer : function(){
			return $http({
				method : 'GET',
				url    : directory+'impactSelfConsumer.model.json'
			})
		},
		getImpactElectricitySystem : function(){
			return $http({
				method : 'GET',
				url    : directory+'impactElectricitySystem.model.json'
			})
		},
		getImpactPublicFinances : function(){
			return $http({
				method : 'GET',
				url    : directory+'impactPublicFinances.model.json'
			})
		},
		getEnergyFlowsCalculation : function(){
			return $http({
				method : 'GET',
				url    : directory + 'calculation/energyFlows.calc.model.json'
			})
		},
		getUsertype : function(){
			return $http({
				method : 'GET',
				url    : directory + 'calculation/usertype.model.json'
			})
		},
		getTarifasData : function(){
			return $http({
				method : 'GET',
				url    : directory + 'calculation/taxes.calc.model.json'
			})
		}

	}

}]);
