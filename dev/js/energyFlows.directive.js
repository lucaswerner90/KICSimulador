app.directive('energyFlows', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    templateUrl: './templates/charts/energyFlows.view.html',
    link:function(scope){

      function crearGrafica(){

        var categories= ['Self Inst.', 'Self Defer.', 'Sales to pool', 'Losses'];

        var colors = ['#f9b000','#149dde', '#3aaa35', '#312783'];

        var max = Math.max.apply(Math, scope.data);

        var width = 615;

        var xscale = d3.scale.linear()
        .domain([10,max])
        .range([0, (width - 150)]);

        var yscale = d3.scale.linear()
        .domain([categories.length,0])
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
        .data(scope.data)
        .enter()
        .append('rect')
        .attr('height',40)
        .attr({'x':0,'y':function(d,i){ return Math.round(yscale(i)+20) ; }})
        .attr('width',function(d){ return 0; });

        var transit = d3.select("svg").selectAll("rect")
        .data(scope.data)
        .style('fill',function(d,i){ return colorScale(i); })
        .attr("width", function(d) { return (xscale(d) +10); });

        var transitext = d3.select('#bars')
        .selectAll('text')
        .data(scope.data)
        .enter()
        .append('text')
        .attr({'x':function(d) {return xscale(d)-37; },'y':function(d,i){ return yscale(i)+45;} , 'text-anchor' : 'middle'})
        .text(function(d){ return d+" kWh"; }).style({'fill':'#fff','font-size':'14px'});

        var line = d3.selectAll('.tick').append('line');
        line.attr('x1', 500)
          .attr('y', 40)
          .attr('y1', 0)
          .attr('x', 30)
          .style('stroke', 'rgb(195, 195, 195)');

        var bars = d3.selectAll('#bars > rect');
        var texts = d3.selectAll('#bars > text');
        var yTexts = d3.selectAll('.tick > text');
        yTexts.attr('x', '-10');



        //SOMBRA RECTS BLANCOS
        // filters go in defs element
        var defs = canvas.append("defs");

        // create filter with id #drop-shadow
        // height=130% so that the shadow is not clipped
        var filter = defs.append("filter")
            .attr("id", "drop-shadow")
            .attr("height", "130%");

        // SourceAlpha refers to opacity of graphic that this filter will be applied to
        // convolve that with a Gaussian with standard deviation 3 and store result
        // in blur
        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 3)
            .attr("result", "blur");

        // translate output of Gaussian blur to the right and downwards with 2px
        // store result in offsetBlur
        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 1)
            .attr("dy", 2)
            .attr("result", "offsetBlur");

        // overlay original SourceGraphic over translated blurred opacity by using
        // feMerge filter. Order of specifying inputs is important!
        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        var emptyBars = function emptyBars(){
          for (var i = bars[0].length - 1; i >= 0; i--) {

            if(bars[0][i].getAttribute("width") < 80 ){

              setAttributes(bars[0][i] , {"width": 80, "class" : "dataFlowBar", "style":"filter:url(#drop-shadow);fill:#fff;stroke-width:1;stroke:#149dde"});
              setAttributes(texts[0][i], {"x": 39, "style" : "fill:#5b5b5f;font-size:14px;", "text-anchor" : "middle"});
            }
          }
        }

        emptyBars();

        // Util functions

        function setAttributes(el, attrs) {
          for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
        }

      }

      scope.$watchCollection('testInputEnergyFlows', function(newValue, oldValue, scope) {
        if(newValue !== oldValue){
          d3.select('#energyFlows > svg').remove();
          d3.selectAll('.dataFlowBar').remove();
          scope.data = scope.testInputEnergyFlows;
          crearGrafica();
        }
      });

    }
  };
});
