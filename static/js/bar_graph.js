d3.queue()
  .defer(d3.json, "data/bar_chart")
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
  }

  // define the graph dimensions
  var margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  height = 500 - margins.top - margins.bottom;
  width = 1000 - margins.right - margins.left;

  // x scale
  x_scale = d3.scaleBand
  .domain(data.map function(d) { return d["x"]; })
  .range(0, width);

  // y scale
  y_scale = d3.scaleLinear
  .domain(d3.min(values), d3.max(values))
  .range(height, 0);

  // define bars (?)
};
