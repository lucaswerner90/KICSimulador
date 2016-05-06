app.directive('publicFinances', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    templateUrl: './templates/charts/publicFinances.view.html',
    link:function(scope){

      var m = [20, 30, 20, 140]; // margins
      var w = 670 - m[1] - m[3]; // width
      var h = 300 - m[0] - m[2]; // height

      scope.$watchCollection('testPublicFinances', function(newCollection, oldCollection, scope) {

        if(newCollection !== oldCollection){
          d3.selectAll("#publicFinances > svg").remove();
          crearGrafica();
        }

      });

      crearGrafica();

      function crearGrafica (){
        if(scope.testPublicFinances && scope.testPublicFinances.length>0){
          var data = scope.testPublicFinances;

          var yMax =  Math.max.apply(Math, data),
          yMin =   Math.min.apply(Math, data);


          var x = d3.scale.linear()
          .domain([1, data.length])
          .range([1, w]);


          var y = d3.scale.linear()
          .domain([(Math.floor((yMin / 1000))*1000), (Math.ceil((yMax / 1000)) * 1000)])
          .range([h, 0]);

          var line = d3.svg.line()

          .x(function(d,i) {
            return x(i);
          })
          .y(function(d) {
            return y(d);
          })

          var eurDiv = d3.selectAll("#publicFinances").append("div")
          .attr("class", 'eur-legend')
          .attr("style", "height:" + h +"px")
          .html("<p class='bold'>€</p>")


          var graph = d3.selectAll("#publicFinances").append("svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


          var xAxis = d3.svg.axis().scale(x).tickSize(-h).ticks(4).tickSubdivide(true);
          graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);


          var yAxisLeft = d3.svg.axis().scale(y).tickSize((-w )).orient("left");

          graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(0,0)")
          .call(yAxisLeft);

          var dataLine = graph.append("svg:path").attr("d", line(data)).attr("transform", "translate(15,-1)");

          var yLegend = d3.selectAll(".y.axis > .tick > text")
          .attr("class", function(d)
          {
            if(d == 0) {
              return "text-cero-cum"
            }else if(d > 0){
              return "text-pos-cum"
            }else{
              return "text-neg-cum"
            }
          })
          .attr("x" , "-16");


          var tooltip = d3.select("#publicFinances").append("div")
          .attr("class", "tooltip")
          .style("display", "none");

          var xAxisHover = d3.svg.axis().scale(x).tickSize(-h).ticks(data.length);
          graph.append("svg:g")
          .attr("class", "x axisHover")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxisHover);


          var arrayLineData = line(data).split(',');


          var linesHover = d3.selectAll('.axisHover > g');
          linesHover
          .on("mouseover", function(d, i){
            var firstArr = this.getAttribute('transform').split('(');
            var secArr = firstArr[1].split(')');
            var leftArr = secArr[0].split(',');
            var left = leftArr[0];

            tooltip.html('<span class="bold">'+ (i +1) +' years</span><br><span>'+ data[i] +' €</span>')
            .attr("style" , ( "display:block;top:" + (Math.round(arrayLineData[i].substring(0,4))+24) + "px;") + ("left:" + (140 + Math.round(left)) + "px;"));

          })
          .on("mouseout", function(){
            tooltip.style("display", "none");
          })
        }



      }
    }
  };
});
