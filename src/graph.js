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
  }

  _createAxisConfig() {
    const xAxisConfig = new Config({
      label: "X-axis",
      orientation: "horizontal",
      width: this.width,
      height: this.height,
      padding: this.padding,
      drawing: this.drawing
    });

    const yAxisConfig = new Config({
      label: "Y-axis",
      orientation: "vertical",
      width: this.width,
      height: this.height,
      padding: this.padding,
      drawing: this.drawing
    });

    return { xAxisConfig, yAxisConfig };
  }

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  draw() {
    this.yAxis.draw();
    this.xAxis.draw();
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
}
