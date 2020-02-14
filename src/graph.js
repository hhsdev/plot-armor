"use strict";

class Graph {
  constructor(width, height) {
    this.drawing = new Drawing(width, height);
    this.width = width;
    this.height = height;

    this.pointGenerator = new PointGenerator(0, 0, width, height);
    this.padding = 30;

    this.xTicks = 24;
    this.yTicks = 24;

    this.majorTickSize = 10;
    this.minorTickSize = 5;
    this.pen = new LinePen().setThickness(1).setLineColor("#333");
  }

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  draw() {
    this._drawBorder();
    this._drawTicks();
  }

  _drawAxes() {
    this._drawXAxis();
    this._drawYAxis();
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

  _drawXAxis() {
    const startPoint = this.pointGenerator
      .distanceFromLeftBorder(this.padding)
      .distanceFromBottomBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .distanceFromRightBorder(this.padding)
      .distanceFromBottomBorder(this.padding)
      .generate();

    this.pen
      .startAt(startPoint)
      .lineTo(endPoint)
      .drawOn(this.drawing);
  }

  _drawYAxis() {
    const startPoint = this.pointGenerator
      .distanceFromLeftBorder(this.padding)
      .distanceFromTopBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .distanceFromLeftBorder(this.padding)
      .distanceFromBottomBorder(this.padding)
      .generate();

    this.pen
      .startAt(startPoint)
      .lineTo(endPoint)
      .drawOn(this.drawing);
  }

  _drawTicks() {
    this._drawXTicks();
    this._drawYTicks();
  }

  _drawXTicks() {
    const xAxisLength = this.width - 2 * this.padding;
    const distanceBetweenTicks = xAxisLength / this.xTicks;
    for (let i = 0; i < this.xTicks + 1; i += 1) {
      if (i % 4 === 0) {
        this._drawXTick(
          i * distanceBetweenTicks + this.padding,
          this.majorTickSize
        );
        if (i !== 0 && i < this.xTicks) {
          this._drawXGridLine(i * distanceBetweenTicks + this.padding);
        }
      } else {
        this._drawXTick(
          i * distanceBetweenTicks + this.padding,
          this.minorTickSize
        );
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawXTick(lengthAlongAxis, tickSize) {
    this.pointGenerator;
    const startPoint = this.pointGenerator
      .xIs(lengthAlongAxis)
      .distanceFromBottomBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .xIs(lengthAlongAxis)
      .distanceFromBottomBorder(this.padding - tickSize)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawXGridLine(lengthAlongXAxis) {
    const startPoint = this.pointGenerator
      .xIs(lengthAlongXAxis)
      .distanceFromBottomBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .xIs(lengthAlongXAxis)
      .distanceFromTopBorder(this.padding)
      .generate();
    this.pen
      .setDashed()
      .startAt(startPoint)
      .lineTo(endPoint)
      .setSolid();
  }

  _drawYTicks() {
    const yAxisLength = this.height - 2 * this.padding;
    const numTicks = 28;
    const distanceBetweenTicks = yAxisLength / this.yTicks;
    for (let i = 0; i < this.yTicks + 1; i += 1) {
      if (i % 4 === 0) {
        this._drawYTick(
          i * distanceBetweenTicks + this.padding,
          this.majorTickSize
        );
        if (i !== 0 && i < this.yTicks) {
          this._drawYGridLine(i * distanceBetweenTicks + this.padding);
        }
      } else {
        this._drawYTick(
          i * distanceBetweenTicks + this.padding,
          this.minorTickSize
        );
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawYTick(lengthAlongAxis, tickSize) {
    this.pointGenerator;
    const startPoint = this.pointGenerator
      .distanceFromBottomBorder(lengthAlongAxis)
      .distanceFromLeftBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .distanceFromBottomBorder(lengthAlongAxis)
      .distanceFromLeftBorder(this.padding - tickSize)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawYGridLine(lengthAlongAxis) {
    const startPoint = this.pointGenerator
      .distanceFromBottomBorder(lengthAlongAxis)
      .distanceFromRightBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .distanceFromBottomBorder(lengthAlongAxis)
      .distanceFromLeftBorder(this.padding)
      .generate();

    this.pen
      .setDashed()
      .startAt(startPoint)
      .lineTo(endPoint)
      .setSolid();
  }
}
