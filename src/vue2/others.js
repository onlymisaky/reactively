import Watcher from './watcher.js'

export const noop = () => { }

export function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return this[sourceKey][key]
    },
    set(val) {
      this[sourceKey][key] = val;
    }
  });
}


export function getVal(data, key) {
  return key.split('.').reduce((prev, curr) => prev[curr], data)
}

export function compileTemplate(template, data) {
  return template.replace(/{{\s*(.*?)\s*}}/g, (match, p1) => {
    return getVal(data, p1)
  });
}


export function mountComponent(vm) {
  let render = noop
  if (typeof vm.$options.render === 'function') {
    render = vm.$options.render
  } else if (typeof vm.$options.template === 'string') {
    render = function () {
      if (typeof vm.$options.el === 'string' && document.querySelector(vm.$options.el)) {
        const container = document.querySelector(vm.$options.el)
        console.log(this);
        container.innerHTML = compileTemplate(vm.$options.template, this)
      }
    }
  }
  const updateComponent = () => {
    render.call(vm)
  }

  if (typeof vm.$options.el === 'string' && document.querySelector(vm.$options.el)) {
    new Watcher(vm, updateComponent, noop)
  }

  return vm
}
