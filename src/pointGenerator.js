"use strict";

import Point from "./point";

export default class PointGenerator {
  constructor(rect) {
    const { x0, y0, x1, y1 } = rect;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.x = null;
    this.y = null;
  }

  generate() {
    const { x, y } = this;
    return new Point(x, y);
  }

  xIs(x) {
    this.x = x;
    return this;
  }

  yIs(y) {
    this.y = y;
    return this;
  }

  fromTopBorder(distance = 0) {
    this.y = this.y1 - distance;
    return this;
  }

  fromBottomBorder(distance = 0) {
    this.y = this.y0 + distance;
    return this;
  }

  fromRightBorder(distance = 0) {
    this.x = this.x1 - distance;
    return this;
  }

  fromLeftBorder(distance = 0) {
    this.x = this.x0 + distance;
    return this;
  }

  fromTopLeftCorner(offset = 0) {
    return this.fromTopBorder(offset).fromLeftBorder(offset);
  }

  fromBottomLeftCorner(offset = 0) {
    return this.fromBottomBorder(offset).fromLeftBorder(offset);
  }

  fromTopRightCorner(offset = 0) {
    return this.fromTopBorder(offset).fromRightBorder(offset);
  }

  fromBottomRightCorner(offset = 0) {
    return this.fromBottomBorder(offset).fromRightBorder(offset);
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

  fromCenter(offsetX, offsetY) {
    const centerX = (this.x0 + this.x1) / 2;
    const centerY = (this.y0 + this.y1) / 2;

    this.x = centerX + offsetX;
    this.y = centerY + offsetY;
    return this;
  }
}
