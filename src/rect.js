import Point from "./point";

export class Rect {
  constructor({ x0, y0, x1, y1 }) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  get width() {
    return this.x1 - this.x0;
  }

  get height() {
    return this.y1 - this.y0;
  }

  get a() {
    return new Point(this.x0, this.y0);
  }

  get b() {
    return new Point(this.x0, this.y1);
  }

  get c() {
    return new Point(this.x1, this.y1);
  }

  get d() {
    return new Point(this.x1, this.y0);
  }
}
