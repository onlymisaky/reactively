export default class Dep {
  static target = null;

  subs = new Set();

  constructor() { }

  addSub(sub) {
    this.subs.add(sub);
  }
  removeSub(sub) {
    this.subs.delete(sub);
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

}
