app.directive('cashFlows', function() {
  return {
    scope:true,
    restrict: 'AE',
    templateUrl: './templates/cashFlows.view.html',
    link:function(scope){
      scope.$watch("outputs",function(){
          d3.select("#cashFlowsWithBIPV > svg").remove();
          crearGrafica();
      },true);



      var crearGrafica=function(){

        var margin = {top: 40, right: 10, bottom: 20, left: 10},
        width = 876 - margin.left - margin.right,
        height = 340 - margin.top - margin.bottom;

        var svg = d3.select("body").select("#cashFlowsWithBIPV").append("svg")
        .attr('class', "chart-svg-flow chart-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var investment = scope.outputs.investment || 0;
        var repayment = scope.outputs.anual_repayment_interest_conditional || [0];
        var omcost = scope.outputs.o_m_cost || [0];
        var gross = scope.outputs.gross_income || [0];

        var n = 4, // number of layers
        m = 26, // number of samples per layer
        stack = d3.layout.stack(),
        data = [[investment], repayment, omcost, gross]
        layers = stack(data),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d; }); }),
        yGroupMin =  d3.min(layers, function(layer) { return d3.min(layer, function(d) { return d; }); });


        var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .7)

        var y = d3.scale.linear()
        .domain([yGroupMin ,yGroupMax])
        .range([height, 0])
        .nice();

        var color = d3.scale.ordinal()
        .range(["#f1de3f", "#f9b000", "#149dde", "#777777"]);

        var barClass = d3.scale.ordinal()
        .range(["invest", "repayment", "costs" , "gross"]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");



        svg.append("g")
        .attr("class", "axis-bottom y axis-cumulated")
        .call(yAxis);

        svg.selectAll(".axis-cumulated > .tick > line")
        .attr("x2", 838)
        .attr("y2", 0);

        var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", function(d, i){ return barClass(i);})
        .style("fill", function(d, i) { return color(i); });

        var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("y", height)
        .attr("class" , "bar")
        .attr("width", x.rangeBand())
        .attr("height", 0)
        .on("mouseover", function(d, i){
          tooltip
          .style("display", "block")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");

          switch (this.parentNode.getAttribute("class")) {
            case "invest":
            tooltip.html(
              "<span class='bold'>Initial investment:  </span>" + d + " €"
            );
            break;
            case "repayment":
            tooltip.html(
              "<span class='bold'> " + i + ((i > 1 ) ? " years " : " year ") + "</span><br>Annual repayment: " + d + " €"
            );
            break;
            case "costs":
            tooltip.html(
              "<span class='bold'> " + i + ((i > 1 ) ? " years " : " year ") + "</span><br>O&M costs: " + d + " €"
            );
            break;
            case "gross":
            tooltip.html(
              "<span class='bold'> " + i + ((i > 1 ) ? " years " : " year ") + "</span><br>Gross income: " + d + " €"
            );
            break;
            default:
            tooltip.html(
              d + " €"
            );
          }
        })
        .on("mouseout", function(d){
          tooltip
          .style("display", "none")
        });

        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");


        rect.transition()
        .attr("y", function(d) {return y(Math.max(0, d));})
        .attr("height", function(d) { return Math.abs(y(d) - y(0));});

        svg.append("g")
        .attr("class", "x axis-bottom")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


        function transitionStacked() {
          y.domain([0, yStackMax]);

          rect.transition()
          .attr("y", function(d) { return y(d.y0 + d.y); })
          .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
          .transition()
          .attr("x", function(d) { return x(d.x); })
          .attr("width", x.rangeBand());
        }
      }
      function array_values(input) {
        var tmp_arr = [],
          key = '';
        if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
          return input.values();
        }
        for (key in input) {
          tmp_arr[tmp_arr.length] = input[key];
        }
        return tmp_arr;
      }
    }
  };
});
