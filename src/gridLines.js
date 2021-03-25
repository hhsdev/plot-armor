"use strict";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";

export default class GridLines {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.pen = new LinePen().setThickness(1);

    this.rect = config.rect;
    this.pointGenerator = new PointGenerator(this.rect);
    this.ticks = 5;
  }

  draw() {
    const distanceBetweenTicks = this.rect.width / this.ticks;
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
}
