"use strict";

class Graph {
  constructor(config) {
    this.config = config;

    const width = config.get("width", 600);
    const height = config.get("height", 600);
    this.config.setIfNotSet("padding", 30);
    this.config.set(
      "drawing",
      new Drawing(config.get("width"), config.get("height"))
    );

    const xAxisConfig = this.config.clone();
    const yAxisConfig = this.config.clone();

    this.yAxis = new YAxis(xAxisConfig);
    this.xAxis = new XAxis(yAxisConfig);

    this.pointGenerator = new PointGenerator(0, 0, width, height);

    this.pen = new LinePen().setThickness(1).setLineColor("black");
  }

  attachTo(container) {
    this.config.get("drawing").attachTo(container);
  }

  draw() {
    this._drawBorder();
    this.yAxis.draw();
    this.xAxis.draw();
  }

  _drawBorder() {
    const corners = [
      this.pointGenerator
        .fromTopLeftCorner(
          this.config.get("padding"),
          this.config.get("padding")
        )
        .generate(),

      this.pointGenerator
        .fromTopRightCorner(
          this.config.get("padding"),
          this.config.get("padding")
        )
        .generate(),

      this.pointGenerator
        .fromBottomRightCorner(
          this.config.get("padding"),
          this.config.get("padding")
        )
        .generate(),

      this.pointGenerator
        .fromBottomLeftCorner(
          this.config.get("padding"),
          this.config.get("padding")
        )
        .generate()
    ];

    this.pen
      .startAt(corners[0])
      .lineTo(corners[1])
      .lineTo(corners[2])
      .lineTo(corners[3])
      .connect()
      .drawOn(this.config.get("drawing"));
  }
}
