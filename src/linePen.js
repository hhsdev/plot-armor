"use strict";
import Pen from "./pen";

export default class LinePen extends Pen {
  constructor() {
    super();
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
    this.actions.push(`M ${point.x}, ${point.y} `);
    return this;
  }

  lineTo(point) {
    this.actions.push(`L ${point.x},${point.y} `);
    return this;
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
