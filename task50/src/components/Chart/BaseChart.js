import { scaleOrdinal ,schemeCategory20c} from "d3-scale";
import { select, event } from "d3-selection";
const chartConfig = {
  showTooltips: false,
  transitionDuration: 1000,
  innerRadius: 0,
  showLegend: false
};

export default class BaseChart {
  constructor(el, props) {
    this.el = el;
    this.props = props;
    this.color = this.getColor();
    Object.keys(chartConfig).forEach(configKey => {
      if (this.props[configKey] !== undefined) {
        this[configKey] = this.props[configKey];
      } else {
        this[configKey] = chartConfig[configKey];
      }
    });
  }
  getColor() {
    return scaleOrdinal(schemeCategory20c);
  }
  addTooltips() {
    this.tooltip = select(this.el)
      .append("div")
      .classed("d3act-tooltip", true)
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("border", "1px solid grey")
      .style("border-radius", "3px")
      .style("text-align", "center")
      .style("padding", "8px 0")
      .style("width", "100px")
      .style("background-color", "#000")
      .style("color", "#fff");
  }
  onMouseMove() {
    if (!this.showTooltips) {
      return;
    }

    const top = event.pageY - 10;
    const left = event.pageX + 10;
    this.tooltip.style("top", `${top}px`).style("left", `${left}px`);
  }
  onMouseOut() {
    if (!this.showTooltips) {
      return;
    }
    this.tooltip.style("visibility", "hidden");
  }
  unmount() {
    this.el.remove();
  }
  create() {}
  update() {}
}
