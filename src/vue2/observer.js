import Dep from './dep.js'

export function defineReactive(obj, key, val) {
  /**
   * 管理当前属性的依赖
   * 通过 dep.depend() 加入到当前的 watcher 中
   */
  const dep = new Dep()
  const childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      observe(newVal)
      dep.notify()
    }
  })
}

export class Observer {

  /**
   * 管理当前对象的依赖
   * 主要有以下作用
   * 1. 当动态添加、删除属性时，立即派发通知 
   *  defineReactive(ob.value, key, val) / delete target[key]
   *  ob.dep.notify()
   * 2. 执行修改数组的方法是，立即派发更新
   *  ob.dep.notify()
   * 3. 收集依赖时，如果是对象，
   */
  dep = new Dep()

  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

export function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return
  return new Observer(obj)
}

// window.data = { message: 'Hello' };
// defineReactive(data, 'message', data.message);

// new Watcher(data, 'message', () => {
//   console.log('Message changed:', data.message);
// });

// data.message = 'Hello, Vue!';
