let currentRunner;

export class Observable {
  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = new Set();
  }

  get() {
    if (currentRunner) {
      this.subscribers.add(currentRunner);
    }

    return this.value;
  }

  set(v) {
    this.value = v;
    this.subscribers.forEach(sub => sub());
  }
}

export function effect(runner) {
  currentRunner = runner;
  runner();
  currentRunner = null;
}
