app.directive('cumulatedCashFlowBIPV', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    templateUrl: './templates/cumulatedCashFlowBIPV.view.html',
    link:function(scope){

      scope.$watch("outputs",function(){
          d3.select("#cumulatedCashFlow > svg").remove();
          d3.select(".payback-div").remove();
          crearGrafica();
      },true);

      var crearGrafica = function(){

        var margin = {top: 30, right: 10, bottom: 10, left: 30},
        width = 876 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;

        var svg = d3.select("#cumulatedCashFlow").append("svg")
        .attr('class', "chart-svg-cumulated chart-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = scope.outputs.cumulated_project_economy || [0,0,0,0];

        var y0 = Math.max(Math.abs(d3.min(data)), Math.abs(d3.max(data)));

        var yMax =  Math.max.apply(Math, data),
        yMin =   Math.min.apply(Math, data);

        var y = d3.scale.linear()
        .domain([-y0, y0])
        .range([height,0])
        .nice();

        var x = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, width], .7);

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

        svg.append("g")
        .attr("class", "x axis-bottom")
        .attr("transform", "translate(0," + (height + 15) + ")")
        .call(xAxis);

        svg.selectAll(".bar")
        .append('text')
        .attr("x2", 0)
        .attr("y2", 0)
        .attr("x", 10)
        .attr("y", 20)

        svg.append("g")
        .attr("class", "x axis-cumulated")
        .call(yAxis);

        svg.selectAll(".tick > line")
        .attr("x2", 838);

        svg.append("g")
        .attr("class", "y axis-cumulated")
        .append("line")
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("x1", 0)
        .attr("x2", width);

        svg.selectAll(".axis-cumulated .tick > text")
        .attr("class", function(d)
        {
          if(d == 0) {
            return "text-cero-cum"
          }else if(d > 0){
            return "text-pos-cum"
          }else{
            return "text-neg-cum"
          }
        });

        svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) { return y(Math.max(0, d)); })
        .attr("x", function(d, i) { return x(i); })
        .attr("height", function(d) { return Math.abs(y(d) - y(0)); })
        .attr("width", x.rangeBand())
        .attr("fill", "#38abe1")
        .on("mouseover", function(d, i){
          tooltip
          .style("display", "block")
          tooltip.html( "PAYBACK " + (i) + ((i > 0 ) ? " years " : " year ") + d + " €" )
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d){
          tooltip
          .style("display", "none")
        });

        var rect = d3.selectAll("rect.bar");

        // First payBack Div

        if(getFirstPositiveIndex()){
          var firstPositive = getFirstPositive();
          var firstPositiveIndex = getFirstPositiveIndex();

          var payBackX = firstPositive.x.baseVal.value;
          var payBackY = firstPositive.y.baseVal.value;

          d3.select("#cumulatedCashFlow").append("div")
          .attr("class", "payback-div")
          .style("left", ((payBackX + 100 + (x.rangeBand() / 2)) + "px"))
          .style("top", ((payBackY + 22) + "px"))
          .html("<span> Payback</span><br><span>" +  firstPositiveIndex + ((firstPositiveIndex > 0) ? " years" : " year"))
          .append("div")

          function getFirstPositive(){
            return rect[0][getFirstPositiveIndex()]
          }

          function getFirstPositiveIndex (){
            for (index = 0, len = data.length; index < len; index++) {
              if(data[index] > 0){
                return index;
              }
            }
          }
        }
      }


    }
  };
});
