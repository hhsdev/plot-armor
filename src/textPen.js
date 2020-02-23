"use strict";
import Pen from "./pen";

//TODO: Shouldn't this class be able to write multiple texts with mutiple styles??
// refer to LinePen class for details
export default class TextPen extends Pen {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.transforms = [];
    this.text = "";
    this.point = { x: 0, y: 0 };
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  }

  setText(str) {
    this.text.innerHTML = str;
    return this;
  }

  setPostion(point) {
    this.point = point;
    return this;
  }

  rotate(angle, pivot) {
    if (pivot === undefined) pivot = { x: 0, y: 0 };
    this.transforms.push(`rotate(${angle}, ${pivot.x}, ${pivot.y}) `);
    return this;
  }

  translate(x, y) {
    this.transforms.push(`translate(${x}, ${y}) `);
  }

  _commit() {
    if (this.text === "") return;
    this.text.setAttribute("class", "text-pen");
    this.text.setAttribute("x", this.point.x);
    this.text.setAttribute("y", this.point.y);
    this.text.setAttribute(
      "transform",
      this.transforms.reduce((accu, curr) => accu + curr, "")
    );
  }

  drawOn(drawing) {
    this._commit();
    drawing.add(this.text);
    this.reset();
    return this;
  }
}
