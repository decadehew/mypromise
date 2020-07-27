const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  status = PENDING;
  value = undefined;
  reason = undefined;
  onFulfilled = [];
  onRejected = [];

  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    // this.onFulfilled && this.onFulfilled(this.value);
    while (this.onFulfilled.length) {
      this.onFulfilled.shift()();
    }
  }

  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    // this.onRejected && this.onRejected(this.reason);
    while (this.onRejected.length) {
      this.onRejected.shift()();
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = onFulfilled ? onFulfilled : value => value;
    onRejected = onRejected ? onRejected : reason => { throw reason };

    let promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    
    return promise;
  }
}

// helpers
function resolvePromise (beforePromise, x, resolve, reject) {
  if (beforePromise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
