"use strict";

class Graph {
  constructor(width, height) {
    this.drawing = new Drawing(width, height);
    this.width = width;
    this.height = height;
    this.padding = 30;

    this.yAxis = new YAxis(this.drawing, width, height, this.padding, "y-axis");
    this.xAxis = new XAxis(this.drawing, width, height, this.padding, "x-axis");

    this.pointGenerator = new PointGenerator(0, 0, width, height);

    this.pen = new LinePen().setThickness(1).setLineColor("black");
  }

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  draw() {
    this._drawBorder();
    this.yAxis.draw();
    this.xAxis.draw();
  }

  _drawBorder() {
    const corners = [
      this.pointGenerator
        .fromTopLeftCorner(this.padding, this.padding)
        .generate(),

      this.pointGenerator
        .fromTopRightCorner(this.padding, this.padding)
        .generate(),

      this.pointGenerator
        .fromBottomRightCorner(this.padding, this.padding)
        .generate(),

      this.pointGenerator
        .fromBottomLeftCorner(this.padding, this.padding)
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
