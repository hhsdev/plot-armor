"use strict";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";

export default class Ticks {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.pen = new LinePen().setThickness(1);
    this.rect = config.rect;
    this.pointGenerator = new PointGenerator(this.rect);
    this.ticks = 5;
    this.tickSize = 5;
  }

  draw() {
    const distanceBetweenTicks = this.rect.width / this.ticks;

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
}
