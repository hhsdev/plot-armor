import Pen from "./pen";

export default class PointPen extends Pen {
  constructor(drawing) {
    super(drawing);
    this.dots = [];
    this.color = "red";
    this.radius = 3;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setRadius(radius) {
    this.radius = radius;
    return this;
  }

  pointAt(point, flip = true) {
    let {x, y} = point;
    if (flip) y = this._flipY(y);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("fill", this.color);
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", this.radius);
    dot.setAttribute("stoke-width", "0");

    this._commitAttributes(dot);
    this._commitEvents(dot);
    this.dots.push(dot);
    return this;
  }

  drawOn(drawing) {
    for (const dot of this.dots) {
      drawing.add(dot);
    }
    return this;
  }
}