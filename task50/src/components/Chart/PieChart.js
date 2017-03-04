import BaseChart from "./BaseChart";
import { select, event } from "d3-selection";
import { entries } from "d3-collection";
import { arc, pie } from "d3-shape";
export default class PieChart extends BaseChart {
  onMouseOver(d) {
    this.tooltip
      .style("visibility", "visible")
      .text(`${d.data.key}(${d.data.value})`);
  }
  getHeight(numberOfItems) {
    if (this.showLegend) {
      const legendRectExtraHeight = numberOfItems * this.legendRectSize;
      const legendSpacingExtraHeight = numberOfItems * this.legendSpacing;
      return this.props.height * 1.5 +
        legendSpacingExtraHeight +
        legendRectExtraHeight;
    }
    return this.props.height;
  }
  addLegend() {
    this.legend = this.svg
      .selectAll(".d3act-legend")
      .data(this.color.domain())
      .enter()
      .append("g")
      .attr("class", "d3act-legend")
      .attr("transform", (d, i) => {
        const height = this.legendRectSize + this.legendSpacing;
        const offset = 20;
        const horz = (-2) * this.legendRectSize;
        const vert = this.props.height / 2 + i * height + offset;
        return `translate(${horz},${vert})`;
      });
    this.legend
      .append("rect")
      .attr("width", this.legendRectSize)
      .attr("height", this.legendRectSize)
      .style("fill", this.color)
      .style("stroke", this.color);
    this.legend
      .append("text")
      .attr("x", this.legendRectSize + this.legendSpacing)
      .attr("y", this.legendRectSize + this.legendSpacing)
      .text(d => {
        const name = Object.keys(this.data)[d];
        const value = this.data[name];
        return `${name}(${value})`;
      });
  }
  create(data) {
    this.legendRectSize = 18;
    this.legendSpacing = 4;
    this.data = data;
    const numberOfItems = Object.keys(data).length;
    const { width, height } = this.props;
    const svgHeight = this.getHeight(numberOfItems);
    const radius = Math.min(width, height) / 2;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.arc = arc().outerRadius(radius - 10).innerRadius(this.innerRadius);
    this.hoverArc = arc().outerRadius(radius - 5).innerRadius(this.innerRadius);
    this.pie = pie().sort(null).value(d => d.value);
    this.svg = select(this.el)
      .append("svg")
      .attr("width", width)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${halfWidth},${halfHeight})`);

    this.path = this.svg
      .selectAll("path")
      .data(this.pie(entries(data)))
      .enter()
      .append("path");

    this.path
      .attr("fill", (d, i) => this.color(i))
      .attr("d", this.arc)
      .each(d => this.originalAngles = d)
      .on("mouseover", this.onMouseOver.bind(this))
      .on("mousemove", this.onMouseMove.bind(this))
      .on("mouseout", this.onMouseOut.bind(this));

    if (this.showTooltips) {
      this.addTooltips();
    }

    if (this.showLegend) {
      this.addLegend();
    }
  }
}
