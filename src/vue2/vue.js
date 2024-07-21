import { observe } from './observer.js'
import { proxy, mountComponent } from './others.js'

export default class Vue {
  constructor(options) {
    options.data = typeof options.data === 'function'
      ? options.data.call(this)
      : typeof options.data === 'object' ? options.data : {}
    this._data = options.data
    this.$options = options
    Object.keys(this._data).forEach(key => {
      proxy(this, '_data', key)
    })
    observe(this._data)
    mountComponent(this)
  }
}
