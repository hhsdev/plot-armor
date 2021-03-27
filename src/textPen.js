"use strict";
import Pen from "./pen";
import Point from "./point";

//TODO: Shouldn't this class be able to write multiple texts with mutiple styles??
// refer to LinePen class for details
export default class TextPen extends Pen {
  constructor(drawing) {
    super();
    this.drawing = drawing;
    this.reset();
    this.color = "black";
  }

  reset() {
    this.transforms = [];
    this.text = "";
    this.point = new Point(0, this._flipY(0));
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  }

  setText(str) {
    this.text.innerHTML = str;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setPosition(point) {
    let { x, y } = point;
    y = this._flipY(y);
    this.point = new Point(x, y);
    return this;
  }

  rotate(angle, pivot = new Point(0, 0)) {
    let { x, y } = pivot;
    y = this._flipY(y);
    this.transforms.push(`rotate(${angle}, ${x}, ${y}) `);
    return this;
  }

  translate(point) {
    let {x, y} = point;
    y *= -1;
    this.transforms.push(`translate(${x}, ${y}) `);
    return this;
  }

  _commit() {
    if (this.text === "") return;
    this.text.setAttribute("class", "text-pen");
    this.text.setAttribute("x", this.point.x);
    this.text.setAttribute("y", this.point.y);
    this.text.style.fill = this.color;
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
