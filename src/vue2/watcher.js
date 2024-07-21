import Dep from './dep.js';

function parsePath(path) {
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

export default class Watcher {

  deps = new Set();

  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = typeof expOrFn === 'function' ? expOrFn : parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  update() {
    const oldVal = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldVal)
  }

  addDep(dep) {
    if (!this.deps.has(dep)) {
      this.deps.add(dep);
      dep.addSub(this);
    }
  }
}
