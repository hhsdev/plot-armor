"use strict";

export default class CardinalPointGenerator {
  constructor(x0, y0, x1, y1) {
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;

    this.x = 0;
    this.y = 0;
  }

  fromNorthBorder(offset = 0) {
    this.y = this._y0 + offset;
    return this;
  }

  fromSouthBorder(offset = 0) {
    this.y = this._y1 - offset;
    return this;
  }

  fromEastBorder(offset = 0) {
    this.x = this._x1 - offset;
    return this;
  }

  fromWestBorder(offset = 0) {
    this.x = this._x0 + offset;
    return this;
  }

  fromNorthEastCorner(offset = 0) {
    return this.fromNorthBorder(offset).fromEastBorder(offset);
  }

  fromNorthWestCorner(offset = 0) {
    return this.fromNorthBorder(offset).fromWestBorder(offset);
  }

  fromSouthEastCorner(offset = 0) {
    return this.fromSouthBorder(offset).fromEastBorder(offset);
  }

  fromSouthWestCorner(offset = 0) {
    return this.fromSouthBorder(offset).fromWestBorder(offset);
  }

  fromCenter(deltaX, deltaY) {
    const centerX = (this._x0 + this._x1) / 2;
    const centerY = (this._y0 + this._y1) / 2;

    this.x = centerX + deltaX;
    this.y = centerY + deltaY;
    return this;
  }

  generate() {
    const { x, y } = this;
    this.x = 0;
    this.y = 0;
    return { x, y };
  }
}
