// read data into console
var x_test = d3.json("data/line_graph", function(data) {
    return x = data["x"];
});

var y_test = d3.json("data/line_graph", function(data) {
    return y = data["y"];
});

var data = d3.json("data/line_graph", function(d) {
  return data = d;
});

// get min max var min_x = Math.min.apply(null, x);
d3.queue()
  .defer(d3.json, "data/line_graph")
  .await(make_graph);

function make_graph(error, data) {
  // get arrays
  var x = [];
  var y = [];

  for (var d in data) {
    x.push(data[d]["x"]);
    y.push(data[d]["y"]);
  };

  // define dimensions of graph
  var margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  var height = 500 - margins.top - margins.bottom;
  var width = 1000 - margins.left - margins.right;

  // X scale
  var x_scale = d3.scaleLinear().domain([d3.min(x), d3.max(x)]).range([0, width]);
  // Y scale (Note the inverted domain for the y-scale: bigger is up!)
  var y_scale = d3.scaleLinear().domain([d3.min(y), d3.max(y)]).range([height, 0]);

  // Create line
  var line = d3.line()
    .x(function(d) { return x_scale(d["x"]); })
    .y(function(d) { return y_scale(d["y"]); })
    .curve(d3.curveMonotoneX);

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

    // Add the line by appending an svg:path element with the data line we created above
  // do this AFTER the axes above so that the line is above the tick-lines
  graph.append("path")
       .datum(data) // 10. Binds data to the line
       .attr("class", "line") // Assign a class for styling
       .attr("d", line); // 11. Calls the line generator)

  d3.select("path.line")
   .attr("fill", "none")
   .attr("stroke", "#000");
};
