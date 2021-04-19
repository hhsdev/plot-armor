"use strict";
import utils from "./utils";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";
import { Rect } from "./rect";
import Point from "./point";
import { calculateSplinedPath } from "./bezier.js";
import PointPen from "./pointPen";

export default class PlotLine {
  constructor(config) {
    this.srcRect = config.viewBox;
    this.destRect = config.rect;

    this.dataset = config.dataset || [];
    this.dataset = this.dataset.map(({x, y}) => new Point(x, y));
    this.drawing = config.drawing; // TODO: not having a drawing is an error


    this.color = config.color || utils.randomColor();
    this.pen = new LinePen(this.drawing).setThickness(4).setLineColor(this.color);
    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
  }

  draw() {
    if (this.dataset.length === 0) return;
    const pointPen = new PointPen(this.drawing).setColor(this.color).setRadius(5);
    const controlPoints = calculateSplinedPath(this.dataset);
    const startingPoint = this.fitOnGraph(this.dataset[0])
    this.pen.startAt(startingPoint);
    pointPen.pointAt(startingPoint);
    for (let i = 1; i < this.dataset.length; ++i) {
      const coordinate = this.fitOnGraph(this.dataset[i]);
      if (coordinate.isNaN()) {
        continue;
      }
      pointPen.pointAt(coordinate);
      let { p0, p1 } = controlPoints[i - 1];

      if (i === 1) {
        p1 = utils.mapPoint(this.srcRect, p1, this.destRect);
        this.pen.splineBezierCurveTo(coordinate, p1);
      } else if  (i === this.dataset.length - 1) {
        p0 = utils.mapPoint(this.srcRect, p0, this.destRect);
        this.pen.splineBezierCurveTo(coordinate, p0);
      } else {
        p0 = utils.mapPoint(this.srcRect, p0, this.destRect);
        p1 = utils.mapPoint(this.srcRect, p1, this.destRect);
        this.pen.cubicBezierCurveTo(coordinate, p0, p1);
      }
    }

    this.pen.drawOn(this.drawing);
    pointPen.drawOn(this.drawing);
  }

  fitOnGraph(point) {
    if (point.isOutsideOf(this.srcRect)) return new Point(NaN, NaN);
    let destPoint = utils.mapPoint(this.srcRect, point, this.destRect);
    return destPoint;
  }

  addData(newData) {
    this.pen.removeAllPaths(true);
    this.dataset.push(new Point(newData.x, newData.y));
    this.draw();
  }
}
