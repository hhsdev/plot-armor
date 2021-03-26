"use strict";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";

class Axis {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.pen = new LinePen(this.drawing).setThickness(1).setLineColor("black");
    this.rect = config.rect;
    this.pointGenerator = new PointGenerator(this.rect);
  }

  draw() {
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
}

export default Axis;
