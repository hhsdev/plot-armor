let _singleton = null;
export default class EventDispatcher {
  static instance() {
    if (!_singleton) _singleton = new EventDispatcher();
    return _singleton;
  }

  constructor() {
    this._callbacks = {};
  }

  subscribeToEvent(eventName, callback) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName].push(callback);
    } else {
      this._callbacks[eventName] = [callback];
    }
  }

  emitEvent(eventName, payload) {
    const callbacksForEvent = this._callbacks[eventName];
    if (!callbacksForEvent) return;
    for (const callback of callbacksForEvent) {
      callback(payload);
    }
  }
}
