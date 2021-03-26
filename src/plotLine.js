"use strict";
import utils from "./utils";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";
import { Rect } from "./rect";
import Point from "./point";

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
    this.pen.startAt(this.fitOnGraph(this.dataset[0]));
    for (let i = 1; i < this.dataset.length; ++i) {
      const coordinate = this.fitOnGraph(this.dataset[i]);
      if (coordinate.isNaN()) {
        continue;
      }
      this.pen.lineTo(coordinate);
    }

    this.pen.drawOn(this.drawing);
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
