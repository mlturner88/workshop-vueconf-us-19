let currentRunner;

export class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (currentRunner) {
      this.subscribers.add(currentRunner);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

export function effect(runner) {
  currentRunner = runner;
  runner();
  currentRunner = null;
}

export function observable(obj) {
  Object.keys(obj).forEach(key => {
    let realValue = obj[key];
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return realValue;
      },

      set(value) {
        realValue = value;
        dep.notify();
      }
    });
  });

  return obj;
}
