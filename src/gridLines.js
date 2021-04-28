"use strict";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";
import utils from "./utils";
import Point from "./point";
import EventDispatcher from "./events/eventDispatcher";

export default class GridLines {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.rect = config.rect;
    this.labels = config.labels;
    this.viewBox = config.viewBox;
    this.tooltip = config.tooltip;
    this.pen = new LinePen(this.drawing);
    this.pointGenerator = new PointGenerator(this.rect);
    this.ticks = 5;
  }

  draw() {
    for (const index in this.labels) {
      this._drawGridLine(this.labels[index].at, index);
    }
    this.pen.drawOn(this.drawing);
  }

  _drawGridLine(lengthAlongAxis, lineNumber) {
    let startPoint, endPoint;
    if (this.orientation === "horizontal") {
      const { x } = utils.mapPoint(
        this.viewBox,
        new Point(lengthAlongAxis, 0),
        this.rect
      );
      startPoint = this.pointGenerator
        .fromLeftBorder(x - this.rect.x0)
        .fromBottomBorder()
        .generate();
      endPoint = this.pointGenerator
        .fromLeftBorder(x - this.rect.x0)
        .fromTopBorder()
        .generate();
      // bail if the grid line overlaps with x-axis
      if (startPoint.x === this.rect.x0) return;
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
        .fromRightBorder(0)
        .generate();
      // bail if the grid line overlaps with y-axis
      if (startPoint.y === this.rect.y0) return;
    }
    this.pen
      .setThickness(1.5)
      .setLineColor("#eee")
      .startAt(startPoint)
      .lineTo(endPoint);

    // We need a thicker, but transparent line on top of the
    // gridlines to attach hover/hoverout events to so that
    // users don't need to fiddle with their mouse.
    this.pen
      .setThickness(20)
      .setLineColor("rgba(0, 0, 0, 0)")
      .startAt(startPoint)
      .lineTo(endPoint);

    if (this.orientation === "horizontal") {
      this.pen.addEventListener("mouseenter", (e) => {
        const gridlineRect = e.target.getBoundingClientRect();
        const x = gridlineRect.x + gridlineRect.width / 2;
        EventDispatcher.instance().emitEvent("GRID_LINES_HOVER", {
          pos: new Point(x, e.clientY),
          index: lineNumber,
        });
      });
      this.pen.addEventListener("mouseleave", (e) => {
        EventDispatcher.instance().emitEvent("GRID_LINES_UNHOVER");
      });
    }
  }
}
