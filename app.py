
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
    data = {}
    data['x'] = [_ for _ in range(-10, 11)]
    data['y'] = [sin(_) * 100 for _ in data['x']]
    return json.dumps(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
