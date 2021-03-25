"use strict";
import Axis from './axis';
import Drawing from './drawing';
import PointGenerator from './pointGenerator';
import LinePen from './linePen';
import PlotLine from './plotLine';

export default class Graph {
  constructor(config) {
    config = config || {};
    this.width = config.width || 600;
    this.height = config.height || 600;
    this.padding = config.padding || 30;
    this.drawing = config.drawing || new Drawing(this.width, this.height);

    this.xAxis = this.createXAxis(config);
    this.yAxis = this.createYAxis(config);

    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.plotLines = [];
  }

  createXAxis(config) {
    let xAxisConfig = config.xAxis;
    if (!xAxisConfig) {
      xAxisConfig = {
        xOffset: 30,
        yOffset: 30,
        fontSize: 16,
        labels: ['a', 'b', 'c', 'd', 'e'],
      };
    }
    xAxisConfig.drawing = this.drawing;
    xAxisConfig.orientation = "horizontal";
    xAxisConfig.label = xAxisConfig.label || "X-Axis";
    xAxisConfig.width = xAxisConfig.width || this.width;
    xAxisConfig.height = xAxisConfig.height || this.height;
    xAxisConfig.padding = xAxisConfig.padding || this.padding;

    return new Axis(xAxisConfig);
  }

  createYAxis(config) {
    let yAxisConfig = config.yAxis;
    if (!yAxisConfig) {
      yAxisConfig = {
        xOffset: 30,
        yOffset: 30,
        fontSize: 16,
        labels: ['a', 'b', 'c', 'd', 'e'],
      };
    }
    yAxisConfig.drawing = this.drawing;
    yAxisConfig.orientation = "vertical";
    yAxisConfig.label = yAxisConfig.label || "Y-Axis";
    yAxisConfig.width = yAxisConfig.width || this.width;
    yAxisConfig.height = yAxisConfig.height || this.height;
    yAxisConfig.padding = yAxisConfig.padding || this.padding;

    return new Axis(yAxisConfig);
  }

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  draw() {
    this.yAxis.draw();
    this.xAxis.draw();
    for (let plotLine of this.plotLines) {
      plotLine.draw();
    }
  }

  _drawBorder() {
    const corners = [
      this.pointGenerator.fromTopLeftCorner(this.padding).generate(),
      this.pointGenerator.fromTopRightCorner(this.padding).generate(),
      this.pointGenerator.fromBottomRightCorner(this.padding).generate(),
      this.pointGenerator.fromBottomLeftCorner(this.padding).generate()
    ];

    this.pen
      .startAt(corners[0])
      .lineTo(corners[1])
      .lineTo(corners[2])
      .lineTo(corners[3])
      .connect()
      .drawOn(this.drawing);
  }

  newPlotLine(dataset, color, animate = false) {
    const { width, height, drawing } = this;
    if (animate) {
      this.plotLines.push(new PlotLine({
        width: 510,
        height: 510,
        maxX: 537,
        maxY: 537,
        dataset: [],
        drawing,
        xOffset: 60,
        yOffset: 60,
        color
      }));
      if (dataset.length == 0) return;
      let i = 0;
      const plotLine = this.plotLines[this.plotLines.length - 1];
      const interval = setInterval(() => {
        if (i >= dataset.length - 1) clearInterval(interval);
        plotLine.addData(dataset[i]);
        ++i;
      }, 5);
    } else {
      const plotLine = new PlotLine({
        width: 510,
        height: 510,
        maxX: 537,
        maxY: 537,
        dataset,
        drawing,
        xOffset: 60,
        yOffset: 60,
        color
      });
      this.plotLines.push(plotLine);
    }
  }
}
