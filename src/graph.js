"use strict";

class Graph {
  constructor(height, width, padding, drawing, yAxis, xAxis) {
    this.height = height;
    this.width = width;
    this.padding = padding;
    this.drawing = drawing;

    this.yAxis = yAxis;
    this.xAxis = xAxis;

    this.pointGenerator = new PointGenerator(0, 0, width, height);
    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.plotLines = [];
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
      this.pointGenerator
        .fromTopLeftCorner(this.padding)
        .generate(),

      this.pointGenerator
        .fromTopRightCorner(this.padding)
        .generate(),

      this.pointGenerator
        .fromBottomRightCorner(this.padding)
        .generate(),

      this.pointGenerator
        .fromBottomLeftCorner(this.padding)
        .generate()
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
    console.log(dataset);
    const plotLine = new PlotLine(this.width, this.height, this.width, this.height, dataset, this.drawing, 30, 30, color);
    this.plotLines.push(plotLine);
  }
}
