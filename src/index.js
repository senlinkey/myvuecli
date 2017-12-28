
import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';
import NProgress from 'nprogress';



import 'nprogress/nprogress.css';
import '../statics/css/style.css';

//由于跨域,每次请求浏览器都不会携带cookie
//为了每次请求都携带cookie,要设置withCredentials为true
//axios的拦截器
//每次用axios发请求,这个方法都会执行
axios.interceptors.request.use(
	config => {
		NProgress.start();
		config.withCredentials = true;
		console.log('有请求发出了');
		return config;
	}
);
axios.interceptors.response.use(function(res) {
	//响应回来前会执行的一个回调
	NProgress.done();
	return res; //将相应进行返回
});

// 给vue的每一个组件的实例添加添加属性, axios
Vue.use( function (Vue) {
	//这里给Vue的原型上添加属性,会被底层统一添加给每一个vue组件的实例
	//每个组件的this属性上会多出这个属性
	Vue.prototype.$axios = axios;
	//这里配置这个是每个页面都可能会发请求,多次引入axios比较麻烦
})

const vm = new Vue({
  el: '#app',
  router:router,
  render: hander => hander(App)
})