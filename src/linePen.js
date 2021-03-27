"use strict";
import Pen from "./pen";

export default class LinePen extends Pen {
  constructor(drawing) {
    super(drawing);

    this.actions = [];
    this.thickness = 0;
    this.lineColor = "black";
    this.strokeDashArray = "";

    this.paths = [];
    this.currentPath = this.newPath();
  }

  newPath() {
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
    this.commitCurrentPath();
    this.startAt(rect.a);
    this.lineTo(rect.b);
    this.lineTo(rect.c);
    this.lineTo(rect.d);
    this.connect();
    return this;
  }

  setPathAttributes() {
    this.currentPath.setAttribute("stroke-width", this.thickness);
    this.currentPath.setAttribute("stroke", this.lineColor);
    this.currentPath.setAttribute("stroke-dasharray", this.strokeDashArray);
    this.currentPath.setAttribute(
      "d",
      this.actions.reduce((accu, curr) => (accu += curr))
    );
  }

  setThickness(thickness) {
    this.commitCurrentPath();
    this.thickness = thickness;
    return this;
  }

  setLineColor(color) {
    this.commitCurrentPath();
    this.lineColor = color;
    return this;
  }

  setDashed() {
    this.commitCurrentPath();
    this.strokeDashArray = "5,5";
    return this;
  }

  setDotted() {
    this.commitCurrentPath();
    this.strokeDashArray = "2,2";
    return this;
  }

  setSolid() {
    this.commitCurrentPath();
    this.strokeDashArray = "";
    return this;
  }

  startAt(point) {
    let { x, y } = point;
    y = this._flipY(y);
    this.actions.push(`M ${x}, ${y} `);
    return this;
  }

  lineTo(point) {
    let { x, y } = point;
    y = this._flipY(y);
    this.actions.push(`L ${x}, ${y} `);
    return this;
  }

  cubicBezierCurveTo(point, controlPoint0, controlPoint1) {
    let { x, y } = point;
    let { x: cp0x, y: cp0y } = controlPoint0;
    let { x: cp1x, y: cp1y } = controlPoint1;
    y = this._flipY(y);
    cp0y = this._flipY(cp0y);
    cp1y = this._flipY(cp1y);
    this.actions.push(`C ${cp0x} ${cp0y}, ${cp1x} ${cp1y}, ${x} ${y} `);
    return this;
  }

  splineBezierCurveTo(point, controlPoint) {
    let { x, y } = point;
    let { x: cpx, y: cpy } = controlPoint;
    y = this._flipY(y);
    cpy = this._flipY(cpy);
    this.actions.push(`S ${cpx} ${cpy}, ${x} ${y} `);
  }

  connect() {
    this.actions.push("Z ");
    return this;
  }

  commitCurrentPath() {
    if (this.actions.length === 0) return;
    this.setPathAttributes();
    this.actions = [];
    this.paths.push(this.currentPath);

    this.currentPath = this.newPath();
  }

  drawOn(drawing) {
    this.commitCurrentPath();
    for (const path of this.paths) {
      drawing.add(path);
    }
    return this;
  }
}
