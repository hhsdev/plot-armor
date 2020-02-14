"use strict";

class PointGenerator {
  constructor(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.x = null;
    this.y = null;
  }

  xIs(x) {
    this.x = x;
    return this;
  }

  yIs(y) {
    this.y = y;
    return this;
  }

  distanceFromTopBorder(distance) {
    this.y = distance;
    return this;
  }

  distanceFromBottomBorder(distance) {
    this.y = this.y1 - distance;
    return this;
  }

  distanceFromRightBorder(distance) {
    this.x = this.x1 - distance;
    return this;
  }

  distanceFromLeftBorder(distance) {
    this.x = distance;
    return this;
  }

  generate() {
    const { x, y } = this;
    return { x, y };
  }

  fromTopLeftCorner(dx, dy) {
    this.x = dx;
    this.y = dy;
    return this;
  }

  fromBottomLeftCorner(dx, dy) {
    this.x = dx;
    this.y = this.y1 - dy;
    return this;
  }

  fromTopRightCorner(dx, dy) {
    this.x = this.x1 -dx;
    this.y = dy;
    return this;
  }

  fromBottomRightCorner(dx, dy) {
    this.x = this.x1 - dx;
    this.y = this.y1 - dy;
    return this;
  }
}
