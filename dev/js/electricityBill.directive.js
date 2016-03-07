app.directive('electricityBill', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    templateUrl: './templates/electricityBill.view.html',
    link:function(scope){
      m = 2; // number of series

      scope.$watch("outputs",function(){
          d3.select("#electricityBill > svg").remove();
          crearGrafica();
      },true);

      var  crearGrafica = function(){

        var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 876 - margin.left - margin.right,
        height = 340 - margin.top - margin.bottom;

        var svg = d3.select("body").select("#electricityBill").append("svg")
        .attr('class', "chart-svg-electricity-bill chart-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var billW = scope.outputs.electricity_bill_with_bipv || [0];
        var billWo = scope.outputs.electricity_bill_wo_bipv || [0];
        var n = billWo.length || 0;

        var data = [billW, billWo];

        var yGroupMax = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d; }); }),
        yGroupMin =  d3.min(data, function(layer) { return d3.min(layer, function(d) { return d; }); });

        var y = d3.scale.linear()
        .domain([0, (5000 * Math.ceil(yGroupMax / 5000))])
        .range([height, 0])

        var x0 = d3.scale.ordinal()
        .domain(d3.range(1, n))
        .rangeBands([0, width], .5);

        var color = d3.scale.ordinal()
        .range(["#f9b000", "#3aaa35"]);

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

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

        svg.append("g")
        .attr("class", "axis-bottom y axis-cumulated")
        .call(yAxis);

        svg.append("g")
        .attr("class", "x axis-bottom")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        svg.selectAll(".axis-cumulated > .tick > line")
        .attr("x2", 838)
        .attr("y2", 0);

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
        .attr("class" , "bar")
        .attr("x", function(d, i) { return x0(i); })
        .attr("y", function(d) { return y(Math.max(0, d)); })
        .on("mouseover", function(d, i){
          tooltip
          .style("display", "inline-block")
          tooltip.html("<span class='bold'>" + i + " Year</span> <br>"  + d + " €" )
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          switch (this.parentNode.getAttribute("class")) {
            case "w":
            tooltip.html(
              "<span class='bold'> " + i + ((i > 1) ? " years" : " year") + "</span><br>" +
              "Electricity bill w BIPV project: " + d + " €"
            )
            break;
            case "wo":
            tooltip.html(
              "<span class='bold'> " + i + ((i > 1) ? " years" : " year") + "</span><br>" +
              "Electricity bill w/o BIPV project: " + d + " €"
            )
            break;
            default:
            tooltip.html(d + " €")
          }
        })
        .on("mouseout", function(d){
          tooltip
          .style("display", "none")
        });
      }
    }
  };
});
