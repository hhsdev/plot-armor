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

  fromTopBorder(distance) {
    this.y = distance;
    return this;
  }

  fromBottomBorder(distance) {
    this.y = this.y1 - distance;
    return this;
  }

  fromRightBorder(distance) {
    this.x = this.x1 - distance;
    return this;
  }

  fromLeftBorder(distance) {
    this.x = distance;
    return this;
  }

  generate() {
    const { x, y } = this;
    return { x, y };
  }

  fromTopLeftCorner(dx, dy) {
    dy = dy || dx;
    this.x = dx;
    this.y = dy;
    return this;
  }

  fromBottomLeftCorner(dx, dy) {
    dy = dy || dx;
    this.x = dx;
    this.y = this.y1 - dy;
    return this;
  }

  fromTopRightCorner(dx, dy) {
    dy = dy || dx;
    this.x = this.x1 -dx;
    this.y = dy;
    return this;
  }

  fromBottomRightCorner(dx, dy) {
    dy = dy || dx;
    this.x = this.x1 - dx;
    this.y = this.y1 - dy;
    return this;
  }

  halfWidth() {
    this.x = (this.x0 + this.x1) / 2;
    return this;
  }

  halfHeight() {
    this.y = (this.y0 + this.y1) / 2;
    return this;
  }

  fromHalfHeight(offset) {
    this.y = (this.y0 + this.y1) / 2 + offset;
    return this;
  }

  fromHalfWidth(offset) {
    this.x = (this.x0 + this.x1) / 2 + offset;
    return this;
  }

}
