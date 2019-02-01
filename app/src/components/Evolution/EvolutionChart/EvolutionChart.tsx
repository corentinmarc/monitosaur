import React, { Component, RefObject } from 'react';
import {
  select,
  scaleLinear,
  schemeRdYlGn,
  area,
  Selection,
} from 'd3';

import {
  MONITOR_INTERVAL,
  MONITOR_EVOLUTION_DURATION,
} from 'constants/monitor';

const WIDTH = 800;
const HEIGHT = 400;
// const DURATION = 1000;

interface Props {
  data: Maybe<number>[];
};

class EvolutionChart extends Component<Props> {
  private chartRef: RefObject<SVGSVGElement> = React.createRef();
  private chartSVG: Maybe<Selection<SVGSVGElement, any, any, any>> = null;
  private chartPath: Maybe<Selection<SVGPathElement, any, any, any>> = null;
  private chartDefs: Maybe<Selection<SVGDefsElement, any, any, any>> = null;
  private chartLinearGradient: Maybe<Selection<SVGLinearGradientElement, any, any, any>> = null;
  private xScale = scaleLinear().range([WIDTH, 0]).domain([0, MONITOR_EVOLUTION_DURATION / MONITOR_INTERVAL]);
  private yScale = scaleLinear<number>().range([HEIGHT, 0]);
  private colorScale = scaleLinear<string>().range(schemeRdYlGn[11]);

  componentDidMount() {
    // Chart initialization
    this.create();
  }

  componentDidUpdate() {
    if (!this.chartRef.current) {
      this.create();
    }
    this.update();
  }

  create() {
    if (!this.chartRef.current) {
      return;
    }

    this.chartSVG = select<SVGSVGElement, {}>(this.chartRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .attr('viewbox', `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      
    this.chartPath = this.chartSVG.append('path')
      .style("fill", "url(#evolutionChartLinearGradient)");
    this.chartDefs = this.chartSVG.append("defs");

    this.update();
  }

  createLinearGradient = () => {
    if (!this.chartDefs) {
      return;
    }

    this.chartLinearGradient = this.chartDefs.append("linearGradient")
      .attr("id", "evolutionChartLinearGradient");
    
    // Append gradient stops
    this.chartLinearGradient
      .attr("x1", '0%')
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data(this.colorScale.range().reverse())
      .enter().append("stop")
      .attr("stop-color", (d) => d);
  }

  updateLinearGradient() {
    const { data } = this.props;

    if (!this.chartLinearGradient) {
      this.createLinearGradient();
      this.updateLinearGradient();
      return;
    }

    const maxValue = data.reduce((max: number, value) => {
      if (typeof value === 'number' && value > max) {
        return value;
      }
      return max;
    }, 0);

    const gradientScale = scaleLinear<number>()
      .range([0, 1])
      .domain([0, 1]);

    this.chartLinearGradient.selectAll("stop")
      .attr("offset", (_,i) => (i / (this.colorScale.range().length - 1)) / gradientScale(maxValue));
  }

  update() {
    if (!this.chartPath) {
      return;
    }
 
    const { data } = this.props;

    // Adjust yScale domain
    const yDomainMin = 0;
    const yDomainMax = data.reduce((max: number, value) => {
      if (typeof value === 'number' && value > max) {
        return value;
      }
      return max;
    }, 1);
    this.yScale.domain([yDomainMin, yDomainMax]);

    // Draw area
    const areaShape = area<Maybe<number>>()
      .x((_, index) => this.xScale(index))
      .y0(this.yScale(0))
      .y1((d) => {
        if (typeof d === 'number') {
          return this.yScale(d);
        }
        return this.yScale(0);
      });

    this.updateLinearGradient();

    this.chartPath
      .datum(data)
      .attr('d', areaShape);
    }
    
  render() {
    return (
      <svg ref={this.chartRef} />
    )
  }
}

export default EvolutionChart;
