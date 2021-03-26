"use strict";
import Axis from "./axis";
import Drawing from "./drawing";
import PointGenerator from "./pointGenerator";
import LinePen from "./linePen";
import PlotLine from "./plotLine";
import GridLines from "./gridLines";
import Ticks from "./ticks";
import { Rect } from "./rect";
import AxisLabel from "./axisLabel";

export default class Graph {
  constructor(config) {
    config = config || {};
    this.viewBox = config.viewBox;
    this.width = config.width || 600;
    this.height = config.height || 600;
    this.padding = config.padding || 30;
    this.drawing = config.drawing || new Drawing(this.width, this.height);

    const padding = 30;
    const spaceForLabels = 30;

    const mainRect = new Rect({
      x0: padding + spaceForLabels,
      y0: padding,
      x1: this.width - padding,
      y1: this.height - (padding + spaceForLabels)
    });

    const xLabelRegion = new Rect({
      x0: padding + spaceForLabels,
      y0: this.height - padding - spaceForLabels,
      x1: this.width - padding,
      y0: this.height - padding,
    });

    const yLabelRegion = new Rect({
      x0: padding,
      y0: padding,
      x1: padding + spaceForLabels,
      y1: this.height - (padding + spaceForLabels)
    });

    this.mainRect = mainRect;

    this.items = [
      new Ticks({
        drawing: this.drawing,
        orientation: "vertical",
        rect: mainRect
      }),
      new Ticks({
        drawing: this.drawing,
        orientation: "horizontal",
        rect: mainRect
      }),
      new GridLines({
        drawing: this.drawing,
        orientation: "vertical",
        rect: mainRect
      }),
      new GridLines({
        drawing: this.drawing,
        orientation: "horizontal",
        rect: mainRect
      }),
      new Axis({
        rect: mainRect,
        orientation: "vertical",
        drawing: this.drawing
      }),
      new Axis({
        rect: mainRect,
        orientation: "horizontal",
        drawing: this.drawing
      }),
      new AxisLabel({
        rect: yLabelRegion,
        orientation: "vertical",
        drawing: this.drawing,
        label: "Y Axis",
      }),
      new AxisLabel({
        rect: xLabelRegion,
        orientation: "horizontal",
        drawing: this.drawing,
        label: "X Axis",
      })
    ];

    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.plotLines = [];
  }

  computeRegions() {}

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  draw() {
    for (const item of this.items) {
      item.draw();
    }
    for (let plotLine of this.plotLines) {
      plotLine.draw();
    }
  }

  _drawBorder() {
    const corners = [
      this.pointGenerator.fromTopLeftCorner(this.padding).generate(),
      this.pointGenerator.fromTopRightCorner(this.padding).generate(),
      this.pointGenerator.fromBottomRightCorner(this.padding).generate(),
      this.pointGenerator.fromBottomLeftCorner(this.padding).generate(),
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
    const { drawing } = this;
    if (animate) {
      this.plotLines.push(
        new PlotLine({
          dataset: [],
          drawing,
          viewBox: this.viewBox,
          rect: this.mainRect,
          color,
        })
      );
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
        drawing,
        viewBox: this.viewBox,
        rect: this.mainRect,
        dataset,
        color,
      });
      this.plotLines.push(plotLine);
    }
  }
}
