"use strict";
import LinePen from "./linePen";
import TextPen from "./textPen";
import PointGenerator from "./pointGenerator";
import utils from "./utils";
import { Rect } from "./rect";

class Axis {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.label = config.label || "";
    this.labels = config.labels || [];

    this.drawing = config.drawing; // TODO: not having this is an error
    this.canvasWidth = config.width || 600;
    this.canvasHeight = config.height || 600;

    this.padding = config.padding || 30;
    this.fontSize = config.fontSize || 16;
    this.ticks = this.labels.length;
    this.tickSize = config.tickSize || 5;

    this.spaceForLables = 50;

    this.pen = new LinePen().setThickness(1).setLineColor("black");
    const rect = new Rect({
      x0: this.padding + this.spaceForLables,
      y0: this.padding,
      x1: this.canvasWidth - this.padding,
      y1: this.canvasHeight - (this.padding + this.spaceForLables)
    });

    this.pointGenerator = new PointGenerator(rect);
    this.width = this.canvasWidth - (2 * this.padding + this.spaceForLables);
    this.height = this.canvasHeight - (2 * this.padding + this.spaceForLables);
  }

  draw() {
    this._drawAxisLine();
    this._drawLabel();
    this._drawTicks();
    this._drawTickTexts();
    this._drawGridLines();
  }

  _drawAxisLine() {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      startPoint = this.pointGenerator.fromBottomLeftCorner().generate();
      endPoint = this.pointGenerator.fromBottomRightCorner().generate();
    } else {
      startPoint = this.pointGenerator.fromBottomLeftCorner().generate();
      endPoint = this.pointGenerator.fromTopLeftCorner().generate();
    }
    this.pen.startAt(startPoint).lineTo(endPoint).drawOn(this.drawing);
  }

  _drawLabel() {
    if (this.orientation === "horizontal") {
      this._drawLabelHorizonal();
    } else {
      this._drawLabelVertical();
    }
  }

  _drawLabelHorizonal() {
    const textMetrics = utils.getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = -Math.round(textMetrics.width / 2);
    const textStartPoint = this.pointGenerator
      .fromCenter(offset, 0)
      .fromBottomBorder(-(this.fontSize + this.tickSize + 20))
      .generate();

    new TextPen()
      .setText(this.label)
      .setColor("orange")
      .setPostion(textStartPoint)
      .drawOn(this.drawing);
  }

  _drawLabelVertical() {
    const textMetrics = utils.getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = Math.round(textMetrics.width / 2);

    const textStartPoint = this.pointGenerator
      .fromCenter(0, offset)
      .fromLeftBorder(- this.fontSize - 20)
      .generate();

    new TextPen()
      .setText(this.label)
      .setColor("purple")
      .setPostion(textStartPoint)
      .rotate(-90, textStartPoint)
      .drawOn(this.drawing);
  }

  _drawTicks() {
    const distanceBetweenTicks = this.width / this.ticks;

    for (let i = 0; i < this.ticks + 1; i += 1) {
      this._drawTick(i * distanceBetweenTicks, this.tickSize);
    }

    this.pen.drawOn(this.drawing);
  }

  _drawTick(lengthAlongAxis, tickSize) {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      startPoint = this.pointGenerator
        .fromLeftBorder(lengthAlongAxis)
        .fromBottomBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromLeftBorder(lengthAlongAxis)
        .fromBottomBorder(-tickSize)
        .generate();
    } else {
      startPoint = this.pointGenerator
        .fromBottomBorder(lengthAlongAxis)
        .fromLeftBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromBottomBorder(lengthAlongAxis)
        .fromLeftBorder(-tickSize)
        .generate();
    }
    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawGridLines() {
    const distanceBetweenTicks = this.width / this.ticks;
    for (let i = 0; i < this.ticks; ++i) {
      if (i !== 0) {
        this._drawGridLine(i * distanceBetweenTicks);
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawGridLine(lengthAlongAxis) {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      startPoint = this.pointGenerator
        .fromLeftBorder(lengthAlongAxis)
        .fromBottomBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromLeftBorder(lengthAlongAxis)
        .fromTopBorder(0)
        .generate();
    } else {
      startPoint = this.pointGenerator
        .fromBottomBorder(lengthAlongAxis)
        .fromLeftBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromBottomBorder(lengthAlongAxis)
        .fromRightBorder(0)
        .generate();
    }
    this.pen
      .setDashed()
      .setLineColor("#aaa")
      .startAt(startPoint)
      .lineTo(endPoint)
      .setSolid()
      .setLineColor("black");
  }

  _drawTickTexts() {}
}

export default Axis;
