app.directive('energyFlows', function() {
      return {
scope: true,  // use a child scope that inherits from parent
restrict: 'AE',
templateUrl: './templates/charts/energyFlows.view.html',
link:function(scope){

      scope.$watchCollection('testInputEnergyFlows', function(newValue, oldValue, scope) {
            if(newValue !== oldValue){
                  d3.select('#energyFlows > svg').remove();
                  d3.selectAll('.dataFlowBar').remove();
                  crearGrafica();
            }
      });

      crearGrafica();

      function crearGrafica(){

            var categories= ['Self Inst.', 'Self Defer.', 'Sales to pool', 'Losses'];

            var data = scope.testInputEnergyFlows;

            var colors = ['#f9b000','#3aaa35'];

            var max = Math.max.apply(Math, data);

            var width = 615;

            var xscale = d3.scale.linear()
            .domain([10,max])
            .range([0, (width - 150)]);

            var yscale = d3.scale.linear()
            .domain([categories.length,0,])
            .range([230,0]);

            var colorScale = d3.scale.quantize()
            .domain([0,categories.length])
            .range(colors);

            var canvas = d3.select('#energyFlows')
            .append('svg')
            .attr({'width':width,'height':250});

            var xAxis = d3.svg.axis();
            xAxis
            .orient('bottom')

            var yAxis = d3.svg.axis();
            yAxis
            .orient('left')
            .scale(yscale)
            .tickSize(0)
            .tickFormat(function(d,i){ return categories[i]; })
            .tickValues(d3.range(4));

            var y_xis = canvas.append('g')
            .attr("transform", "translate(120,40)")
            .attr('id','yaxis')
            .call(yAxis);

            var chart = canvas.append('g')
            .attr("transform", "translate(120,0)")
            .attr('id','bars')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('height',40)
            .attr({'x':0,'y':function(d,i){ return yscale(i)+20; }})
            .style('fill',function(d,i){ return colorScale(i); })
            .attr('width',function(d){ return 0; });


            var transit = d3.select("svg").selectAll("rect")
            .data(data)
            .attr("width", function(d) { return (xscale(d) +10); });

            var transitext = d3.select('#bars')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr({'x':function(d) {var xPosition = 0;if(xscale(d)-75<20){xPosition = 20;}else {xPosition = xscale(d)-75;}return xPosition; },'y':function(d,i){ return yscale(i)+45; }})
            .text(function(d){ return d+" kWh"; }).style({'fill':function(d){var colors="#fff";if(d<1500){colors = "#343434"};return colors },'font-size':'14px'});

            var line = d3.selectAll('.tick').append('line');
            line.attr('x1', 500)
            .attr('y', 40)
            .attr('y1', 0)
            .attr('x', 30)
            .style('stroke', 'rgb(195, 195, 195)');

            var bars = d3.selectAll('#bars > rect');
            var yTexts = d3.selectAll('.tick > text');
            yTexts.attr('x', '-10');

            var emptyBars = d3.selectAll([bars[0][1], bars[0][3]]);
            emptyBars
            .attr('style', 'display:none');

            var texts = d3.selectAll('#bars > text');
            var emptyText = d3.selectAll([texts[0][1], texts[0][3]]);
            emptyText
            .style('display' , 'none');

            var barDataSelf = d3.select('#energyFlows').append('div');
            var barDataLoss = d3.select('#energyFlows').append('div');

            barDataSelf
            .attr('class', 'dataFlowBar')
            .html('<p>' + data[1] + ' kWh</p>')
            .style('top', '74px')
            .style('left', '120px');

            barDataLoss
            .attr('class', 'dataFlowBar')
            .html('<p>' + data[3] + ' kWh</p>')
            .style('top', '190px')
            .style('left', '120px');


      }

}
};
});
