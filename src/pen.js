"use strict";

export default class Pen {
  constructor(drawing) {
    this.drawing = drawing;
    this._attributes = {};
    this._eventListeners = {};
  }

  drawOn(drawing) {}

  _flipY(y) {
    const newY = this.drawing.height - y;
    return newY;
  }

  setAttribute(name, value) {
    this._attributes[name] = value;
    return this;
  }

  addEventListener(eventType, callback) {
    this._eventListeners[eventType] = callback;
    return this;
  }

  _commitAttributes(path) {
    for (const attr of Object.keys(this._attributes)) {
      path.setAttribute(attr, this._attributes[attr]);
    }
  }

  _commitEvents(path) {
    for (const eventName of Object.keys(this._eventListeners)) {
      path.addEventListener(eventName, this._eventListeners[eventName]);
    }
  }

}
