"use strict";
import utils from "./utils";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";
import { Rect } from "./rect";
import Point from "./point";
import { calculateSplinedPath } from "./bezier.js";
import PointPen from "./pointPen";
import EventDispatcher from "./events/eventDispatcher";

export default class PlotLine {
  constructor(config) {
    this.srcRect = config.viewBox;
    this.destRect = config.rect;

    this.dataset = config.dataset || [];
    this.dataset = this.dataset.map(({ x, y }) => new Point(x, y));
    this.drawing = config.drawing; // TODO: not having a drawing is an error

    this.color = config.color || utils.randomColor();
    this.pen = new LinePen(this.drawing)
      .setThickness(4)
      .setLineColor(this.color);
    this.pen.setAttribute("class", "pa-plot-line");
    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
  }

  draw() {
    if (this.dataset.length === 0) return;
    this._drawPlotLine();
    this._drawGhostHitboxes();
  }

  _drawPlotLine() {
    const pointPen = new PointPen(this.drawing)
      .setColor(this.color)
      .setRadius(5)
      .setAttribute("class", "pa-plot-point");
    const controlPoints = calculateSplinedPath(this.dataset);
    const startingPoint = this.fitOnGraph(this.dataset[0]);
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
      } else if (i === this.dataset.length - 1) {
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

  _drawGhostHitboxes() {
    // We need a transparent vertical line on top of each data point
    // which will enable us to catch mouse events so that we can
    // show the y-values at that point on hover.
    const pen = new LinePen(this.drawing)
      .setThickness(20)
      .setLineColor("rgba(0, 0, 0, 0)");
    const pointGenerator = new PointGenerator(this.srcRect);
    for (const i in this.dataset) {
      const coordinate = this.dataset[i];
      const startPoint = this.fitOnGraph(
        pointGenerator
          .fromBottomBorder(0)
          .fromLeftBorder(coordinate.x)
          .generate()
      );
      const endPoint = this.fitOnGraph(
        pointGenerator.fromTopBorder(0).fromLeftBorder(coordinate.x).generate()
      );

      pen.startAt(startPoint).lineTo(endPoint);
      pen.addEventListener("mouseenter", (e) => {
        console.log("mouse entered");
        const gridlineRect = e.target.getBoundingClientRect();
        const x = gridlineRect.x + gridlineRect.width / 2;
        EventDispatcher.instance().emitEvent("GRID_LINES_HOVER", {
          pos: new Point(x, e.clientY),
          index: i,
        });
      });
      pen.addEventListener("mouseleave", (e) => {
        EventDispatcher.instance().emitEvent("GRID_LINES_UNHOVER");
      });
      pen.drawOn(this.drawing);
    }
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
