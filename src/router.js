// 1. 引入vue和vue-router引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由配置中所需要的组件
import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'

// 给每个路由规则中的组件实例(this)添加两个属性
// (this.$router)
// (this.$route)
Vue.use(VueRouter)

// 配置规则
const router = new VueRouter({
    routes: [
        {name: 'index', path: '/', redirect: '/home'},
        {name: 'signin', path: '/signin', component: SignIn},
        {name: 'home', path: '/home', component: Home}
    ]
})

export default router