import React, { Component } from "react";
import "./App.css";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import chartData from "./data.json";
import flags from "./flags.json";

class App extends Component {
  constructor() {
    super();

    this.sortByTime = this.sortByTime.bind(this);

    this.state = {
      options: {
        title: {
          text: "Test Chart for Smolyar"
        },
        xAxis: {
          title: "TIME"
        },
        yAxis: {
          title: {
            text: "PRESSURE"
          }
        }
      }
    };
  }

  componentDidMount() {
    const { options } = this.state;
    const data = [];
    const plotBands = [];
    let { xAxis } = this.state;

    chartData.list.forEach(item => {
      data.push([item.time, item.value]);
    });

    flags.list.forEach(item => {
      plotBands.push({
        color: 'orange', // Color value
        from: item.start_time, // Start of the plot band
        to: item.end_time, // End of the plot band
        label: { 
          text: item.type, // Content of the label. 
          align: 'left', // Positioning of the label.
        }
      });
    });

    data.sort(this.sortByTime);

    const newXAxis = {...xAxis, plotBands};

    const optionsF = {
      ...options,
      xAxis: newXAxis,
      series: [{ name: "Pressure", type: "line", data }]
    };


    console.log(plotBands);

    this.setState({ options: optionsF });
  }

  sortByTime(a, b) {
    return a[0] - b[0];
  }

  render() {

    const { options } = this.state;

    return (
      <div className="App">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default App;
