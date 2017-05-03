import BaseChart from './BaseChart';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

import { max } from 'd3-array';

export default class BarChart extends BaseChart {
  onMouseOver(d) {}
  getScaleX() {
    return scaleBand().range([0, this.props.width], 150);
  }
  getScaleY() {
    return scaleLinear().range([this.props.height, 0]);
  }
  createAxisX(x) {
    return axisBottom(x);
  }
  createAxisY(y) {
    return axisLeft(y);
  }
  create(data) {
    this.x = this.getScaleX();
    this.y = this.getScaleY();
    const xAxis = this.createAxisX(this.x);
    const yAxis = this.createAxisY(this.y);
    const width = this.props.width + this.props.margin.left + this.props.margin.right;
    const height = this.props.height + this.props.margin.top + this.props.margin.bottom;
    this.svg = select(this.el)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${this.props.margin.left},${this.props.margin.top})`);

    this.x.domain(data.map(d => d.xValue));
    this.y.domain([0, max(data, d => d.yValue)]);

    this.svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${this.props.height})`)
      .call(xAxis);

    this.svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('tranform', `rotate(-99)`)
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    this.svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.x(d.xValue))
      .attr('width', this.x.bandwidth())
      .attr('y', d => {
        const yvalue = this.y(d.yValue);

        return yvalue;
      })
      .attr('height', d => {
        return this.props.height - this.y(d.yValue);
      })
      .on('mouseover', this.onMouseOver.bind(this))
      .on('mousemove', this.onMouseMove.bind(this))
      .on('mouseout', this.onMouseOut.bind(this))
      .style('fill', 'lightblue');

    this.svg
      .selectAll('rect')
      .style('fill', 'lightblue')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    if (this.showTooltips) {
      this.addTooltips();
    }
  }
}
