import React, { Component, RefObject } from 'react';
import {
  select,
  scaleLinear,
  interpolateRdYlGn,
  scaleSequential,
  Selection,
  transition,
  Transition,
} from 'd3';

import {
  MONITOR_INTERVAL,
  MONITOR_EVOLUTION_DURATION,
} from 'constants/monitor';
import { MonitorEvolutionPoint } from 'entities/monitor';

const WIDTH = 800;
const HEIGHT = 400;
const TRANSITION_DURATION = 100;
const NUMBER_POINTS = MONITOR_EVOLUTION_DURATION / MONITOR_INTERVAL;
const RECT_RATIO = 0.5;
const RECT_WIDTH = RECT_RATIO * WIDTH / NUMBER_POINTS;

interface Props {
  data: MonitorEvolutionPoint[];
};

class EvolutionChart extends Component<Props> {
  private chartRef: RefObject<SVGSVGElement> = React.createRef();
  private chartSVG: Maybe<Selection<SVGSVGElement, any, null, undefined>> = null;
  private xScale = scaleLinear().range([WIDTH - RECT_WIDTH, 0]).domain([0, NUMBER_POINTS - 1]);
  private yScale = scaleLinear<number>().range([HEIGHT, 0]);
  private colorScale = scaleSequential(interpolateRdYlGn).domain([1, 0]);
  private transition: Transition<SVGRectElement, MonitorEvolutionPoint, SVGSVGElement, any> =
    (transition('barTransition').duration(TRANSITION_DURATION) as any);

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

    // Create the responsive SVG container
    this.chartSVG = select<SVGSVGElement, any>(this.chartRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("preserveAspectRatio", "xMidYMax meet")
      .style('width', '100%')
      .style('height', '100%');

    this.update();
  }

  update() {
    if (!this.chartSVG) {
      return this.create();
    }
 
    const { data } = this.props;

    // Adjust yScale domain
    const yDomainMin = 0;
    const yDomainMax = data.reduce((max: number, point) => {
      if (typeof point.loadAvg === 'number' && point.loadAvg > max) {
        return point.loadAvg;
      }
      return max;
    }, 1);
    this.yScale.domain([yDomainMin, yDomainMax]);

    const rect = this.chartSVG
      .selectAll<SVGRectElement, any>('rect')
      .data(data, (d) => d.timestamp );

    // Animate exiting rects
    rect.exit()
      .transition(this.transition)
      .attr('y', HEIGHT)
      .attr('height', 0)
      .remove();

    // Initialize entering rects
    const enteringRect = rect.enter()
      .append('rect')
      .attr('x', this.xScale(0))
      .attr('y', this.yScale(0))
      .attr('width', RECT_WIDTH)
      .attr('fill', d =>  d ? this.colorScale(d.loadAvg) : this.colorScale(0))
      .attr('stroke', 'rgba(255, 255, 255, 0.5)');

    // Interrupt possibly current transition
    rect.interrupt('barTransition');
    enteringRect.interrupt('barTransition');
     
    // Animate entering + persisting rects
    rect.merge(enteringRect)
      .transition(this.transition)
      .attr('x', (_, i) => { console.log(i, ' / ', data.length); return this.xScale(i) })
      .attr('y', (d) => d ? this.yScale(d.loadAvg) : HEIGHT)
      .attr('height', (d) => d ? HEIGHT - this.yScale(d.loadAvg) : 0);
  }
    
  render() {
    return (
      <svg ref={this.chartRef} />
    )
  }
}

export default EvolutionChart;
