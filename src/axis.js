"use strict";

class Axis {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.label = config.label || "";

    this.drawing = config.drawing; // TODO: not having this is an error
    this.width = config.width || 600;
    this.height = config.height || 600;
    this.padding = config.padding || 30;
    this.fontSize = config.fontSize || 16;
    this.ticks = config.ticks || 28;
    this.minorTicksPerMajorTick = config.minorTicksPerMajorTick || 4;
    this.majorTickSize = config.majorTickSize || 10;
    this.minorTickSize = config.minorTickSize || 5;

    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.pointGenerator = new PointGenerator1D(this.orientation, 0, 0, this.width, this.height);
  }

  draw() {
    this._drawLine();
    this._drawLabel();
    this._drawTicks();
    this._drawGridLines();
  }

  _drawLine() {
    const startPoint = this.pointGenerator
      .fromBaseStartCorner(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromBaseEndCorner(this.padding)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
    this.pen.drawOn(this.drawing);
  }

  _drawLabel() {
    if (this.orientation === "horizontal") {
      this._drawLabelHorizonal();
    } else {
      this._drawLabelVertical();
    }
  }

  _drawLabelHorizonal() {
    const textMetrics = getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = -Math.round(textMetrics.width / 2);

    const textStartPoint = this.pointGenerator
      .fromHalfMajorAxis(offset)
      .fromBaseBorder(this.padding - this.fontSize - this.majorTickSize)
      .generate();

    new TextPen()
      .setText(this.label)
      .setPostion(textStartPoint)
      .drawOn(this.drawing)
  }

  _drawLabelVertical() {
    const textMetrics = getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = Math.round(textMetrics.width / 2);

    const textStartPoint = this.pointGenerator
      .fromHalfMajorAxis(offset)
      .fromBaseBorder(this.padding - this.fontSize)
      .generate();

    new TextPen()
      .setText(this.label)
      .setPostion(textStartPoint)
      .rotate(-90, textStartPoint)
      .drawOn(this.drawing);
  }

  _drawTicks() {
    const axisLength = this.width - 2 * this.padding;
    const distanceBetweenTicks = axisLength / this.ticks;

    for (let i = 0; i < this.ticks + 1; i += 1) {
      if (i % this.minorTicksPerMajorTick === 0) {
        this._drawTick(
          i * distanceBetweenTicks + this.padding, this.majorTickSize
        );
      } else {
        this._drawTick(
          i * distanceBetweenTicks + this.padding,
          this.minorTickSize
        );
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawTick(lengthAlongAxis, tickSize) {
    const startPoint = this.pointGenerator
      .fromStartBorder(lengthAlongAxis)
      .fromBaseBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromStartBorder(lengthAlongAxis)
      .fromBaseBorder(this.padding - tickSize)
      .generate();
    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawGridLines() {
    const axisLength = this.height - 2 * this.padding;
    const distanceBetweenTicks = axisLength / this.ticks;
    for (let i = 0; i < this.ticks; i += this.minorTicksPerMajorTick) {
      if (i !== 0) {
        this._drawGridLine(i * distanceBetweenTicks + this.padding);
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawGridLine(lengthAlongAxis) {
    const startPoint = this.pointGenerator
      .fromStartBorder(lengthAlongAxis)
      .fromBaseBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromStartBorder(lengthAlongAxis)
      .fromTopBorder(this.padding)
      .generate();

    this.pen
      .setDashed()
      .setLineColor("#666")
      .startAt(startPoint)
      .lineTo(endPoint)
      .setSolid()
      .setLineColor("black");
  }
}
