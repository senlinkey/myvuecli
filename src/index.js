import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';
import '../statics/css/style.css';

// 给vue的每一个组件的实例添加添加属性, axios
Vue.use( function (Vue) {
  // use 方法中会自动调用这个函数
  // 约定，我们在这个回调函数中，
  // 添加到Vue的原型上的属性，会被底层统一添加给每一个vue组件的实例上。
  // 下面一行代码设置之后，每一个组件中的this会多出一个属性hello
  // 这里的$只是一个普通字符
  Vue.prototype.$axios = axios;

})

const vm = new Vue({
  el: '#app',
  router:router,
  render: function (handler) {
    return handler(App);
  }
})