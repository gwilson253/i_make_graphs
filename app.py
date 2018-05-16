
from flask import Flask, render_template
from math import sin
import json

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/line_graph')
def line_graph():
    return render_template('line_graph.html')

@app.route('/bar_graph')
def bar_graph():
    return render_template('bar_graph.html')

@app.route('/choropleth_graph')
def choropleth_graph():
    return render_template('choropleth_graph.html')

@app.route('/data/line_graph')
def data_line_graph():
    x = [_ for _ in range(-10, 11)]
    y = [sin(_) * 100 for _ in x]
    data = []
    for a, b in zip(x, y):
        data.append({'x': a, 'y': b})
    return json.dumps(data)

@app.route('/data/bar_graph')
def data_bar_graph():
    data = []
    x = ['A', 'B', 'C', 'D', 'E', 'F']
    y = [_ for _ in range(100, 700, 100)]
    for a, b in zip(x, y):
        data.append({'x': a, 'y': b})
    return json.dumps(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
