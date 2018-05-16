d3.queue()
  .defer(d3.json, "data/bar_graph")
  .await(make_graph);

function make_graph(error, data) {
  // handle errors
  if(error) throw error;

  // get arrays
  var series = [];
  var values = [];

  for (var d in data) {
    series.push(data[d]["x"]);
    values.push(data[d]["y"]);
  };

  // define the graph dimensions
  var margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  var height = 500 - margins.top - margins.bottom;
  var width = 1000 - margins.right - margins.left;

  // x scale
  var x_scale = d3.scaleBand()
  .range([0, width])
  .domain(data.map(function(d) { return d["x"]; }))
  .padding(0.1);

  // y scale
  var y_scale = d3.scaleLinear()
  .range([height, 0])
  .domain([d3.min(values), d3.max(values)]);

  // Add an SVG element with the desired dimensions and margin.
  var graph = d3.select("#graph").append("svg")
        .attr("width", width + margins.left + margins.right)
        .attr("height", height + margins.top + margins.bottom)
        .append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        ;

  // Add the x-axis.
  graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_scale));

  // Add the y-axis to the left
  graph.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y_scale));

  // Add bars tot he graph
  graph.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_scale(d.x); })
      .attr("y", function(d) { return y_scale(d.y); })
      .attr("width", x_scale.bandwidth())
      .attr("height", function(d) { return height - y_scale(d.y); });
};
