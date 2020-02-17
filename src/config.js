"use strict";

class Config {
  constructor(data) {
    this.data = data;
  }

  setIfNotSet(key, value) {
    if (this.data[key] === undefined) {
      this.data[key] = value;
    }
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key, defaultValue) {
    const ret = this.data[key];
    return (ret !== undefined ? ret : defaultValue);
  }

  rename(oldKey, newKey) {
    if (this.data[oldKey] !== undefined) {
      this.data[newKey] == this.data[oldKey];
    }
    delete this.data[oldKey];
  }

  clone() {
    return new Config(Object.assign(this.data, {}));
  }
}