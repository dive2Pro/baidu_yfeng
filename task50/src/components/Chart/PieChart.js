import BaseChart from "./BaseChart";
import { select, event } from "d3-selection";
import { entries } from "d3-collection";
import { arc, pie } from "d3-shape";
import { hsl } from 'd3-color'
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
  getCirclePositionWithAngle(r, angle) {
    angle = angle - Math.PI / 2;
    const x1 = r * Math.cos(angle);
    const y1 = r * Math.sin(angle);
    console.log(x1, y1, angle);
    return { x1, y1 };
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
    const xDiff = 15, yDiff = 10;
    const r = radius - 10;
    this.arc = arc().outerRadius(r).innerRadius(this.innerRadius);
    this.pie = pie().sort(null).value(d => d.value);
    this.svg = select(this.el)
      .append("svg")
      .attr("width", width+400)
      .attr("height", svgHeight+20)
      .append("g")
      .attr("transform", `translate(${halfWidth+50},${halfHeight})`);

    const path = this.svg
      .selectAll("path")
      .data(this.pie(entries(data)))
      .enter();
    this.path = path;
    const arcs = this.path
      .append("path")
      .attr("fill", (d, i) => this.color(i))
      .attr("d", this.arc)
      .each(d => this.originalAngles = d)
      .on("mouseover", this.onMouseOver.bind(this))
      .on("mousemove", this.onMouseMove.bind(this))
      .on("mouseout", this.onMouseOut.bind(this));
    const anglePosition = {};
    path.each(d => {
      const angle = (d.endAngle + d.startAngle) / 2;
      anglePosition[d.startAngle] = this.getCirclePositionWithAngle(r, angle);
    });
    path
      .append("line")
      .attr("x1", d => {
        return anglePosition[d.startAngle].x1;
      })
      .attr("y1", d => {
        return anglePosition[d.startAngle].y1;
      })
      .attr("x2", d => {
        const x1 = anglePosition[d.startAngle].x1;
        if (x1 < 0) {
          return x1 - xDiff;
        } else {
          return x1 + xDiff;
        }
      })
      .attr("y2", d => {
        const y1 = anglePosition[d.startAngle].y1;
        if (y1 < 0) {
          return y1 - yDiff;
        } else {
          return y1 + yDiff;
        }
      })
      .attr("stroke-width", 1)
      .attr("stroke", (d, i) => hsl(30 * i, 0.8, 0.8));

    path
      .append("line")
      .attr("x1", d => {
        const x1 = anglePosition[d.startAngle].x1;
        if (x1 < 0) {
          return x1 - xDiff;
        } else {
          return x1 + xDiff;
        }
      })
      .attr("y1", d => {
        const y1 = anglePosition[d.startAngle].y1;
        if (y1 < 0) {
          return y1 - yDiff;
        } else {
          return y1 + yDiff;
        }
      })
      .attr("x2", d => {
        const x1 = anglePosition[d.startAngle].x1;
        if (x1 < 0) {
          return x1 - xDiff * 2;
        } else {
          return x1 + xDiff * 2;
        }
      })
      .attr("y2", d => {
        const y1 = anglePosition[d.startAngle].y1;
        if (y1 < 0) {
          return y1 - yDiff;
        } else {
          return y1 + yDiff;
        }
      })
      .attr("stroke-width", 1)
      .attr("stroke", (d, i) => this.color(i));

    path
      .append("text")
      .text(d => {
        return d.data.key;
      })
      .attr("transform", d => {
        const { x1, y1 } = anglePosition[d.startAngle];
        let xBuffer = 0, yBuffer = 0;
        if (x1 < 0) {
          xBuffer = xDiff * (-3.4);
        } else {
          xBuffer = xDiff * 3;
        }
        if (y1 < 0) {
          yBuffer = yDiff * (-0.5);
        } else {
          yBuffer = yDiff * 1.6;
        }
        return `translate(${x1 + xBuffer},${y1 + yBuffer})`;
      })
      .style("fill", (d, i) => this.color(i));

    if (this.showTooltips) {
      this.addTooltips();
    }

    if (this.showLegend) {
      this.addLegend();
    }
  }
}
