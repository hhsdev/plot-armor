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
import utils from "./utils";
import GridLineLabels from "./gridLineLabels";
import Tooltip from "./tooltip";
import EventDispatcher from "./events/eventDispatcher";

export default class Graph {
  constructor(config) {
    config = config || {};
    this.viewBox = config.viewBox;
    this.width = config.width;
    this.height = config.height;
    this.padding = config.padding || 30;
    this.drawing = config.drawing || new Drawing(this.width, this.height);

    this.yLabel = "Y axis";
    this.xLabel = "X axis";
    this.yLabels = this.normalizeLabels(config.yLabels);
    this.xLabels = this.normalizeLabels(config.xLabels);

    const spaceForYAxisLabel = utils.getTextMetrics(
      this.yLabel,
      `normal ${this.fontSize}px Arial`
    ).height;

    const spaceForXAxisLabel = utils.getTextMetrics(
      this.xLabel,
      `normal ${this.fontSize}px Arial`
    ).height;

    const spaceForYGridLabels =
      this.computeLongestLabelLength(this.yLabels) + 10;
    const spaceForXGridLabels = utils.getTextMetrics(
      this.xLabel,
      `normal ${this.fontSize}px Arial`
    ).height;

    const padding = 30;
    const spaceForXLabels =
      2 *
      utils.getTextMetrics(this.xLabel, `normal ${this.fontSize}px Arial`)
        .height;
    const spaceForYLabels = spaceForYAxisLabel + spaceForYGridLabels;

    const mainRect = new Rect({
      x0: padding + spaceForYLabels,
      y0: padding + spaceForXLabels,
      x1: this.width - padding,
      y1: this.height - padding,
    });

    const xLabelRegion = new Rect({
      x0: padding + spaceForYLabels,
      y0: padding,
      x1: this.width - padding,
      y1: padding + spaceForXAxisLabel,
    });

    const xLabelsRegion = new Rect({
      x0: padding + spaceForYLabels,
      y0: padding + spaceForXAxisLabel,
      x1: this.width - padding,
      y1: padding + spaceForXAxisLabel + spaceForXGridLabels,
    });

    const yLabelsRegion = new Rect({
      x0: padding + spaceForYAxisLabel,
      y0: padding + spaceForXLabels,
      x1: padding + spaceForYAxisLabel + spaceForYGridLabels,
      y1: this.height - padding,
    });

    const yAxisLabelRegion = new Rect({
      x0: padding,
      y0: padding + spaceForXLabels,
      x1: padding + spaceForYAxisLabel,
      y1: this.height - padding,
    });

    this.mainRect = mainRect;

    this.tooltip = new Tooltip({ drawing: this.drawing });
    this.tooltip.draw();

    this.items = [
      new GridLineLabels({
        drawing: this.drawing,
        orientation: "vertical",
        viewBox: this.viewBox,
        rect: yLabelsRegion,
        labels: this.yLabels,
      }),
      new GridLineLabels({
        drawing: this.drawing,
        orientation: "horizontal",
        viewBox: this.viewBox,
        rect: xLabelsRegion,
        labels: this.xLabels,
      }),
      new GridLines({
        drawing: this.drawing,
        orientation: "vertical",
        viewBox: this.viewBox,
        rect: mainRect,
        labels: this.yLabels,
        tooltip: this.tooltip,
      }),
      new GridLines({
        drawing: this.drawing,
        orientation: "horizontal",
        viewBox: this.viewBox,
        rect: mainRect,
        labels: this.xLabels,
        tooltip: this.tooltip,
      }),
      new Axis({
        rect: mainRect,
        orientation: "vertical",
        drawing: this.drawing,
      }),
      new Axis({
        rect: mainRect,
        orientation: "horizontal",
        drawing: this.drawing,
      }),
      new AxisLabel({
        rect: yAxisLabelRegion,
        orientation: "vertical",
        drawing: this.drawing,
        label: "Y Axis",
      }),
      new AxisLabel({
        rect: xLabelRegion,
        orientation: "horizontal",
        drawing: this.drawing,
        label: "X Axis",
      }),
    ];

    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
    this.pen = new LinePen(this.drawing).setThickness(1).setLineColor("black");
    this.plotLines = [];
    EventDispatcher.instance().subscribeToEvent("GRID_LINES_HOVER", ({ pos, index }) => {
      const values = this.plotLines.map(plotLine => ({
        color: plotLine.color,
        data: plotLine.dataset[index],
      }));
      this.tooltip.show(pos, values)
    }
    );
    EventDispatcher.instance().subscribeToEvent("GRID_LINES_UNHOVER", () =>
      this.tooltip.hide()
    );
  }

  computeLongestLabelLength(labels) {
    return labels
      .map(
        ({ label }) =>
          utils.getTextMetrics(label, `normal ${this.fontSize}px Arial`).width
      )
      .reduce((curr_max, val) => {
        if (curr_max < val) return val;
        else return curr_max;
      }, -Infinity);
  }

  normalizeLabels(labels) {
    return labels.map((elem) => {
      if (typeof elem === "number") {
        return { at: elem, label: String(elem) };
      } else {
        return { at: Object.keys(elem)[0], label: Object.values(elem)[0] };
      }
    });
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
