"use strict";

class Graph {
  constructor(config) {
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
    let { xAxis } = config;
    if (!xAxis) {
      xAxis = {
        xOffset: 30,
        yOffset: 30,
        fontSize: 16,
        ticks: 28,
        minorTicksPerMajorTick: 4,
        majorTickSize: 10,
        minorTickSize: 5
      };
    }
    return new Axis(
      "horizontal",
      "X-Axis",
      this.drawing,
      this.width,
      this.height,
      this.padding,
      xAxis.fontSize || 16,
      xAxis.ticks || 28,
      xAxis.minorTicksPerMajorTick || 4,
      xAxis.majorTickSize || 10,
      xAxis.minorTickSize || 5
    );
  }

  createYAxis() {
    return new Axis(
      "vertical",
      "Y-Axis",
      this.drawing,
      600,
      600,
      30,
      16,
      28,
      4,
      10,
      5
    );
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

  newPlotLine(dataset, color) {
    const { width, height, drawing } = this;
    const plotLine = new PlotLine({
      width,
      height,
      maxX: this.width,
      maxY: this.height,
      dataset,
      drawing,
      xOffset: 30,
      yOffset: 30,
      color
    });
    this.plotLines.push(plotLine);
  }
}
