"use strict";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";
import utils from "./utils";
import Point from "./point";


export default class Ticks {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.viewBox = config.viewBox;
    this.rect = config.rect;
    this.labels = config.labels;

    this.pen = new LinePen(this.drawing).setThickness(1);
    this.pointGenerator = new PointGenerator(this.rect);
    this.tickSize = 5;
  }

  draw() {
    for (const { at } of this.labels) {
      this._drawTick(at, this.tickSize);
    }
    this.pen.drawOn(this.drawing);
  }

  _drawTick(lengthAlongAxis, tickSize) {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      const { x } = utils.mapPoint(
        this.viewBox,
        new Point(lengthAlongAxis, 0),
        this.rect
      );
      startPoint = this.pointGenerator
        .fromLeftBorder(x - this.rect.x0)
        .fromBottomBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromLeftBorder(x - this.rect.x0)
        .fromBottomBorder(-tickSize)
        .generate();
    } else {
      const { y } = utils.mapPoint(
        this.viewBox,
        new Point(0, lengthAlongAxis),
        this.rect
      );
      startPoint = this.pointGenerator
        .fromBottomBorder(y - this.rect.y0)
        .fromLeftBorder(0)
        .generate();
      endPoint = this.pointGenerator
        .fromBottomBorder(y - this.rect.y0)
        .fromLeftBorder(-tickSize)
        .generate();
    }
    this.pen.startAt(startPoint).lineTo(endPoint);
  }
}
