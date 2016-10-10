app.directive('selfConsumer', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    templateUrl: './templates/charts/selfConsumer.view.html',
    link:function(scope){
      var n = 1, // number of samples
      m = 1; // number of series

      scope.$watchCollection('testInputImpact[0]', function(newCollection, oldCollection, scope) {
        if(newCollection !== oldCollection){
          d3.select('#selfConsumer > svg').remove();
          crearGrafica();
        }
      });

      crearGrafica();

      function crearGrafica(){

        var data = scope.testInputImpact;

        var max = Math.max.apply(Math, data);

        var margin = {top: 20, right: 0, bottom: 30, left: 110},
        width = 590 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

        var y = d3.scale.linear()
        .domain([-max*1.5,max*1.5])
        .range([height, 0])

        var x0 = d3.scale.ordinal()
        .domain(d3.range(n))
        .rangeBands([0, width], .3);

        var color = d3.scale.ordinal()
        .range([ (max>=0)?"#3aaa35":"red"]);

        var barClass = d3.scale.ordinal()
        .range(["w", "wo"]);

        var x1 = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeBands([0, x0.rangeBand()]);

        var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

        var yAxis = d3.svg.axis().ticks(4)
        .scale(y)
        .orient("left");

        var svg = d3.select("body").select("#selfConsumer").append("svg")
        .attr('class', "chart-svg-electricity-bill chart-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
        .attr("class", "axis-bottom y axis-cumulated")
        .call(yAxis);

        svg.selectAll(".axis-cumulated > .tick > line").attr("x2", width);
        svg.selectAll(".axis-cumulated > .tick > text").html((function(d, i){ return d + "%"}))

        svg.append("g").selectAll("g")
        .data(data)
        .enter().append("g")
        .style("fill", function(d, i) {return color(i); })
        .attr("class", function(d,i) {return barClass(i)})
        .attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("height", function(d){ return Math.abs(y(d) - y(0));})

        .attr("x", function(d, i) { return x0(i); })
        .attr("y", function(d) { return y(Math.max(0, d)); });

        svg.selectAll(".w ")
        .append("text")
        .style("fill", "#fff")
        .style("font-family", "'Myriad Pro Semibold'")
        .attr("x", function(d, i) { return (x0(i) + (x1.rangeBand() / 2) - 30); })
        .attr("y", function(d) { return (y(Math.max(0, d))+18); })
        .html(function(d, i){ return d + "%"});
        var textBar = svg.selectAll(".w");

      }
    }
  };
});
