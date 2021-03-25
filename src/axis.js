"use strict";
import LinePen from "./linePen";
import TextPen from "./textPen";
import CardinalPointGenerator from "./cardinalPointGenerator";
import utils from "./utils";

class Axis {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.label = config.label || "";
    this.lables = config.lables || [];

    this.drawing = config.drawing; // TODO: not having this is an error
    this.width = config.width || 600;
    this.height = config.height || 600;

    this.padding = config.padding || 30;
    this.fontSize = config.fontSize || 16;
    this.ticks = config.ticks || 28;
    this.minorTicksPerMajorTick = 5;
    this.majorTickSize = 5;
    this.minorTickSize = 0;

    this.spaceForTickText = 30;

    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.pointGenerator = new CardinalPointGenerator(
      this.padding + this.spaceForTickText,
      this.padding,
      this.width - this.padding,
      this.height - (this.padding + this.spaceForTickText)
    );
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
      startPoint = this.pointGenerator.fromSouthWestCorner().generate();
      endPoint = this.pointGenerator.fromSouthEastCorner().generate();
    } else {
      startPoint = this.pointGenerator.fromSouthWestCorner().generate();
      endPoint = this.pointGenerator.fromNorthWestCorner().generate();
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
      .fromSouthBorder(-this.fontSize - this.majorTickSize)
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
      .fromWestBorder(-this.fontSize)
      .generate();

    new TextPen()
      .setText(this.label)
      .setPostion(textStartPoint)
      .rotate(-90, textStartPoint)
      .drawOn(this.drawing);
  }

  _drawTicks() {
    const axisLength = this.width - (2 * this.padding + this.spaceForTickText);
    const distanceBetweenTicks = axisLength / this.ticks;

    for (let i = 0; i < this.ticks + 1; i += 1) {
      if (i % this.minorTicksPerMajorTick === 0) {
        this._drawTick(i * distanceBetweenTicks, this.majorTickSize);
      } else {
        this._drawTick(i * distanceBetweenTicks, this.minorTickSize);
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawTick(lengthAlongAxis, tickSize) {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      startPoint = this.pointGenerator
        .fromWestBorder(lengthAlongAxis)
        .fromSouthBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromWestBorder(lengthAlongAxis)
        .fromSouthBorder(-tickSize)
        .generate();
    } else {
      startPoint = this.pointGenerator
        .fromSouthBorder(lengthAlongAxis)
        .fromWestBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromSouthBorder(lengthAlongAxis)
        .fromWestBorder(-tickSize)
        .generate();
    }
    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawGridLines() {
    const axisLength = this.width - (2 * this.padding + this.spaceForTickText);
    const distanceBetweenTicks = axisLength / this.ticks;
    for (let i = 0; i < this.ticks; i += this.minorTicksPerMajorTick) {
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
        .fromWestBorder(lengthAlongAxis)
        .fromSouthBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromWestBorder(lengthAlongAxis)
        .fromNorthBorder(0)
        .generate();
    } else {
      startPoint = this.pointGenerator
        .fromSouthBorder(lengthAlongAxis)
        .fromWestBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromSouthBorder(lengthAlongAxis)
        .fromEastBorder(0)
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
