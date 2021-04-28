"use strict";
import Pen from "./pen";

export default class LinePen extends Pen {
  constructor(drawing) {
    super(drawing);

    this._drawingActions = [];
    this.paths = [];

    this.setThickness(1);
    this.setLineColor("black");
    this.currentPath = this._newPath();
  }

  _commitDrawingActions(path) {
    path.setAttribute(
      "d",
      this._drawingActions.reduce((accu, curr) => (accu += curr))
    );
  }

  _newPath() {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "transparent");
    return path;
  }

  removeAllPaths(removeFromDrawing) {
    if (removeFromDrawing) {
      for (let path of this.paths) {
        const parent = path.parentNode;
        parent.removeChild(path);
      }
    }
    this.paths = [];
  }

  drawBorder(rect) {
    this._commitCurrentPath();
    this.startAt(rect.a);
    this.lineTo(rect.b);
    this.lineTo(rect.c);
    this.lineTo(rect.d);
    this.connect();
    return this;
  }

  setThickness(thickness) {
    this._commitCurrentPath();
    this._attributes["stroke-width"] = thickness;
    return this;
  }

  setLineColor(color) {
    this._commitCurrentPath();
    this._attributes["stroke"] = color;
    return this;
  }

  setDashed() {
    this._commitCurrentPath();
    this._attributes["stroke-dasharray"] = "5,5";
    return this;
  }

  setDotted() {
    this._commitCurrentPath();
    this._attributes["stroke-dasharray"] = "2,2";
    return this;
  }

  setSolid() {
    this._commitCurrentPath();
    this._attributes["stroke-dasharray"] = "";
    return this;
  }

  startAt(point) {
    let { x, y } = point;
    y = this._flipY(y);
    this._drawingActions.push(`M ${x}, ${y} `);
    return this;
  }

  lineTo(point) {
    let { x, y } = point;
    y = this._flipY(y);
    this._drawingActions.push(`L ${x}, ${y} `);
    return this;
  }

  cubicBezierCurveTo(point, controlPoint0, controlPoint1) {
    let { x, y } = point;
    let { x: cp0x, y: cp0y } = controlPoint0;
    let { x: cp1x, y: cp1y } = controlPoint1;
    y = this._flipY(y);
    cp0y = this._flipY(cp0y);
    cp1y = this._flipY(cp1y);
    this._drawingActions.push(`C ${cp0x} ${cp0y}, ${cp1x} ${cp1y}, ${x} ${y} `);
    return this;
  }

  splineBezierCurveTo(point, controlPoint) {
    let { x, y } = point;
    let { x: cpx, y: cpy } = controlPoint;
    y = this._flipY(y);
    cpy = this._flipY(cpy);
    this._drawingActions.push(`S ${cpx} ${cpy}, ${x} ${y} `);
  }

  connect() {
    this._drawingActions.push("Z ");
    return this;
  }

  _commitCurrentPath() {
    if (this._drawingActions.length === 0) return;
    this._commitAttributes(this.currentPath);
    this._commitEvents(this.currentPath);
    this._commitDrawingActions(this.currentPath);
    this.paths.push(this.currentPath);

    this._drawingActions = [];
    this.currentPath = this._newPath();
  }

  drawOn(drawing) {
    this._commitCurrentPath();
    for (const path of this.paths) {
      drawing.add(path);
    }
    return this;
  }
}
