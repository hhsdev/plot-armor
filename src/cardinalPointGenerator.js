"use strict";

export default class CardinalPointGenerator {
  constructor(rect) {
    this._rect = rect;
    this.x = 0;
    this.y = 0;
  }

  fromNorthBorder(offset = 0) {
    this.y = this._rect.y0 + offset;
    return this;
  }

  fromSouthBorder(offset = 0) {
    this.y = this._rect.y1 - offset;
    return this;
  }

  fromEastBorder(offset = 0) {
    this.x = this._rect.x1 - offset;
    return this;
  }

  fromWestBorder(offset = 0) {
    this.x = this._rect.x0 + offset;
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
    const centerX = (this._rect.x0 + this._rect.x1) / 2;
    const centerY = (this._rect.y0 + this._rect.y1) / 2;

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
