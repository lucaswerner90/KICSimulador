app.factory('calculoFactory', function() {
  var outputs={};
  var num_years=26;
  // Inicializamos los datos de output
  outputs.energy_consumption_kwh=[];
  outputs.energy_consumption_eur=[];
  outputs.investment=0;
  outputs.decommissioning=[];
  outputs.energy_generation_mwh=[];
  outputs.gross_income=[];
  outputs.gross_income[0]='';
  outputs.o_m_cost=[];
  outputs.o_m_cost[0]='';
  outputs.anual_repayment_interest=0;
  outputs.balance=[];
  outputs.interests=[];
  outputs.repayment=[];
  outputs.anual_repayment_interest_conditional=[];
  outputs.anual_repayment_interest_conditional[0]='';
  outputs.production_consumptions_cost=[];
  outputs.project_return=[];
  outputs.taxes=[];
  outputs.loan_interest=[];
  outputs.net_income_with_project=[];
  outputs.net_income_wo_project=[];
  outputs.total_cash_flow_with_project=[];
  outputs.total_cash_flow_wo_project=[];
  outputs.project_cashflow=[];
  outputs.cumulated_project_economy=[];
  outputs.test_payback_year=[];
  outputs.consumption_negative=[];
  outputs.electricity_bill_with_bipv=[];
  outputs.electricity_bill_with_bipv[0]='';
  outputs.electricity_bill_wo_bipv=[];
  outputs.electricity_bill_wo_bipv[0]='';
  outputs.inflation_rate_energy_cost=0;





  var calculoFactory = {
    calcularOutputs: function(inputs) {

      var transformInputs=function(){
        inputs.bank.debt_financing=parseInt(inputs.bank.debt_financing)/100;
        inputs.bank.loan_interest_rate=parseInt(inputs.bank.loan_interest_rate)/100;
        inputs.bank.load_duration=parseInt(inputs.bank.load_duration);


        inputs.installation.investment_bipv=parseInt(inputs.installation.investment_bipv);
        inputs.installation.tamano=parseInt(inputs.installation.tamano);
        inputs.installation.full_hours=parseInt(inputs.installation.full_hours);
        inputs.installation.degradation=inputs.installation.degradation/100;
        inputs.installation.opex=inputs.installation.opex/100;

        inputs.regulation.inflation=parseInt(inputs.regulation.inflation)/100;
        inputs.regulation.energy_consumed=parseInt(inputs.regulation.energy_consumed);
        inputs.regulation.tax_rate=parseInt(inputs.regulation.tax_rate)/100;
      }



      var retransformInputs=function(){
        inputs.bank.debt_financing=inputs.bank.debt_financing*100;
        inputs.bank.loan_interest_rate=inputs.bank.loan_interest_rate*100;

        inputs.installation.degradation=inputs.installation.degradation*100;
        inputs.installation.opex=inputs.installation.opex*100;

        inputs.regulation.inflation=inputs.regulation.inflation*100;
        inputs.regulation.tax_rate=inputs.regulation.tax_rate*100;
      }

      var calcularEnergyConsumptionKW=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.energy_consumption_kwh[i]=inputs.regulation.energy_consumed;
        }
      }


      var calcularEnergyConsumptionEuros=function(){
        var potencia=0;
        for (var i = 1; i < num_years; i++) {
          potencia=Math.pow(outputs.inflation_rate_energy_cost,i-1);
          outputs.energy_consumption_eur[i]=outputs.energy_consumption_kwh[i]*inputs.regulation.tariff_consumer*potencia;
        }
      }

      var calcularInflationRateEnergyCost=function(){
        outputs.inflation_rate_energy_cost=1+inputs.regulation.inflation;
      }


      var calcularAnualRepaymentInterest=function(){
        // Investiment with BIPV * Debt Financing * ( Loan Interest Rate / 1-(1+Loan Interest Rate)^(-Loan Duration))
        //'Input & Output'!$C$25*'Input & Output'!$C$10*('Input & Output'!$C$11/(1-(1+'Input & Output'!$C$11)^(-'Input & Output'!$C$12)))
        var primeraMulti=(inputs.installation.investment_bipv)*(inputs.bank.debt_financing);
        var potencia=Math.pow(1+inputs.bank.loan_interest_rate,-inputs.bank.load_duration);
        var division=inputs.bank.loan_interest_rate/(1-potencia);
        outputs.anual_repayment_interest=Math.round(primeraMulti*division);

      }


      var calcularEnergyGenerationMWh=function(){
        var comun=inputs.installation.tamano*inputs.installation.full_hours;
        var potencia=0;
        var resta=1-inputs.installation.degradation;
        outputs.energy_generation_mwh[1]=(comun)/1000;
        for (var i = 2; i < num_years; i++) {
          potencia=Math.pow(resta,i-1);
          outputs.energy_generation_mwh[i]=(comun*potencia)/1000;
        }

      }


      var calcularGrossIncome=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.gross_income[i]=Math.round(outputs.energy_generation_mwh[i]*inputs.regulation.tariff_producer*1000);
        }
      }

      var calcularOMCosts=function(){
        var comun=inputs.installation.tamano*inputs.installation.opex*1000;
        for (var i = 1; i < num_years; i++) {
          outputs.o_m_cost[i]=Math.round(comun*(Math.pow(outputs.inflation_rate_energy_cost,i-1)));
        }
      }


      var calcularBalance=function(){
        // Calculamos el balance inicial
        outputs.balance[1]=inputs.bank.debt_financing*inputs.installation.investment_bipv;
        // Calculamos los intereses iniciales
        outputs.interests[1]=outputs.balance[1]*inputs.bank.loan_interest_rate;
        // Calculamos el repago del interes condicional
        if(outputs.balance[1]-outputs.anual_repayment_interest>0){
          outputs.anual_repayment_interest_conditional[1]=outputs.anual_repayment_interest;
        }

        outputs.repayment[1]=Math.abs(outputs.anual_repayment_interest_conditional[1]-outputs.interests[1]);

        for (var i = 2; i < num_years; i++) {
          outputs.balance[i]=outputs.balance[i-1]-outputs.repayment[i-1];
          outputs.interests[i]=Math.round(outputs.balance[i]*inputs.bank.loan_interest_rate);


          // INICIO Calculo de anual repayment interest conditional
          if(outputs.balance[i]-outputs.anual_repayment_interest>0){
            outputs.anual_repayment_interest_conditional[i]=outputs.anual_repayment_interest;
          }
          else{
            if(outputs.balance[i]==0){
              outputs.anual_repayment_interest_conditional[i]=0;
            }
            else{
              outputs.anual_repayment_interest_conditional[i]=Math.round(outputs.balance[i]+outputs.interests[i]);
            }
          }
          // FIN Calculo de anual repayment interest conditional
          outputs.repayment[i]=Math.round(Math.abs(outputs.anual_repayment_interest_conditional[i]-outputs.interests[i]));
        }

      }


      var calcularProductionConsumptionCosts=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.production_consumptions_cost[i]=Math.round(outputs.gross_income[i]-outputs.energy_consumption_eur[i]-
          outputs.o_m_cost[i]-outputs.anual_repayment_interest_conditional[i]);
        }
      }


      var calcularProjectReturn=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.project_return[i]=Math.round(outputs.gross_income[i]-outputs.o_m_cost[i]-outputs.anual_repayment_interest_conditional[i]);
        }
      }


      var calcularTaxes=function(){
        for (var i = 1; i < num_years; i++) {
          if(outputs.production_consumptions_cost[i]>0){
            outputs.taxes[i]=outputs.production_consumptions_cost[i]*inputs.regulation.tax_rate;
          }
          else{
            outputs.taxes[i]=0;
          }
        }
      }


      var calcularInvestment=function(){
        // Investment=Investment with BIPV * (1 - Debt Financing)
        outputs.investment=inputs.installation.investment_bipv *
        (1-(inputs.bank.debt_financing));

        outputs.net_income_with_project[0]=-outputs.investment;
        outputs.net_income_wo_project[0]=-inputs.installation.investment_wo_bipv;
      }


      var calcularNetIncome=function(){
        for (var i = 1; i < num_years; i++) {
          // With Project
          outputs.net_income_with_project[i]=Math.round(outputs.gross_income[i]-outputs.energy_consumption_eur[i]-
          outputs.o_m_cost[i]-outputs.anual_repayment_interest_conditional[i]-outputs.taxes[i]);

          // W/O Project
          outputs.net_income_wo_project[i]=-outputs.energy_consumption_eur[i];
        }
      }


      var calcularTotalCashFlow=function(){
        outputs.total_cash_flow_wo_project[0]=-inputs.installation.investment_wo_bipv;
        outputs.total_cash_flow_with_project[0]=-outputs.investment;

        outputs.total_cash_flow_with_project[1]=outputs.net_income_with_project[0]+outputs.net_income_with_project[1];
        outputs.total_cash_flow_wo_project[1]=outputs.net_income_wo_project[0]+outputs.net_income_wo_project[1];

        for (var i = 2; i < num_years; i++) {
          outputs.total_cash_flow_with_project[i]=Math.round(outputs.total_cash_flow_with_project[i-1]+outputs.net_income_with_project[i]);
          outputs.total_cash_flow_wo_project[i]=Math.round(outputs.total_cash_flow_wo_project[i-1]+outputs.net_income_wo_project[i]);
        }

      }

      var calcularProjectCashFlow=function(){
          outputs.project_cashflow[0]=(-inputs.installation.investment_bipv)*(1-inputs.bank.debt_financing);
          for (var i = 1; i < num_years; i++) {
            outputs.project_cashflow[i]=outputs.gross_income[i]-outputs.o_m_cost[i]-outputs.anual_repayment_interest_conditional[i];
          }
      }

      var calcularCumulatedProjectEconomy=function(){
        outputs.cumulated_project_economy[0]=(-inputs.installation.investment_bipv);
        for (var i = 1; i < num_years; i++) {
          outputs.cumulated_project_economy[i]=outputs.cumulated_project_economy[i-1]+(outputs.project_cashflow[i]);
        }

      }
      var calcularTestPaybackYear=function(){
        for (var i = 1; i < num_years; i++) {

          if(outputs.cumulated_project_economy[i]<0){
            outputs.test_payback_year[i]=0;
          }
          else{
            if(outputs.cumulated_project_economy[i-1]>0){
              outputs.test_payback_year[i]=0;
            }
            else{
              outputs.test_payback_year[i]=1;
            }
          }
        }
      }

      var calcularConsumptionLoanNegative=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.consumption_negative[i]=Math.round(-outputs.energy_consumption_eur[i]);
          outputs.loan_interest[i]=Math.round(-outputs.anual_repayment_interest_conditional[i]);
        }
      }


      var calcularElectricityBill=function(){
        for (var i = 1; i < num_years; i++) {
          outputs.electricity_bill_with_bipv[i]=Math.round(outputs.energy_consumption_eur[i]-outputs.gross_income[i]);
          outputs.electricity_bill_wo_bipv[i]=Math.round(outputs.energy_consumption_eur[i]);
        }
      }

      var convertOutputsToNegative=function(){
        outputs.investment=-outputs.investment;
        for (var i = 1; i < num_years; i++) {
            outputs.anual_repayment_interest_conditional[i]=-outputs.anual_repayment_interest_conditional[i];
            outputs.o_m_cost[i]=-outputs.o_m_cost[i];

        }
      }

      // Transformamos los inputs a su dominio correspondiente
      transformInputs();
      // Llamamos a las funciones de calculo
      calcularAnualRepaymentInterest();

      calcularInvestment();
      calcularInflationRateEnergyCost();


      calcularEnergyConsumptionKW();
      calcularEnergyConsumptionEuros();

      calcularEnergyGenerationMWh();
      calcularGrossIncome();
      calcularOMCosts();


      calcularBalance();


      calcularProductionConsumptionCosts();
      calcularProjectReturn();

      calcularTaxes();

      calcularNetIncome();

      calcularTotalCashFlow();

      calcularProjectCashFlow();

      calcularCumulatedProjectEconomy();

      calcularTestPaybackYear();

      calcularConsumptionLoanNegative();


      calcularElectricityBill();
      // Devolvemos los inputs a su forma original
      retransformInputs();
      convertOutputsToNegative();




      return outputs;
    }
  }

  return calculoFactory;
});
