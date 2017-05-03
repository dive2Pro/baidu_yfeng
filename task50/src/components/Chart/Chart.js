/**
 * Created by hyc on 17-3-4.
 */
import PieChart from './PieChart';
import BarChart from './BarChart';
import React from 'react';
import { findDOMNode } from 'react-dom';
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartToClassMappings = {
      pie: PieChart,
      bar: BarChart
    };
  }
  componentDidMount() {
    if (Object.keys(this.props.data).length === 0) {
      return;
    }
    const el = findDOMNode(this);
    if (this.props.type === 'custom') {
      this.chart = new this.props.customChart(el, this.props);
    } else {
      this.chart = new this.chartToClassMappings[this.props.type](el, this.props);
    }
    this.chart.create(this.props.data);
  }
  componentDidUpdate() {
    this.chart.update(this.props.data);
  }
  componentWillUnmount() {
    if (this.chart) this.chart.unmount();
  }

  render() {
    return <div className="chart" />;
  }
}
