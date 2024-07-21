// import Vue from 'https://unpkg.com/browse/vue@2.6.14/dist/vue.esm.js'
// import Vue from './vue.esm.browser.js'
import Vue from './vue.js'

window.app = new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Vue!',
      info: {
        name: '张三',
        age: 18,
        address: {
          country: '中国',
          city: '北京'
        }
      }
    }
  },
  template: `
      <div>
        <p>{{message}}</p>
        <p>{{info.name}}</p>
        <p>{{info.age}}</p>
        <p>{{info.address.country}} - {{info.address.city}}</p>
      </div>
  `,
})
