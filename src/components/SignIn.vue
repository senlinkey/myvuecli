<template>
    <div>
        <h1>我是SignIn.vue组件</h1>
        <form>
            <input v-model="username" type="text" placeholder="用户名">
            <input v-model="password" type="text" placeholder="密码">
            <button @click.prevent="sub">登陆</button>
        </form>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            username: 'admin',
            password: '123456'
        }
    },
    created() {
        console.log(this.hello)
        console.log(this.$axios)
    },
    methods: {
        sub() {
            console.log(this.username, this.password)
            // http://127.0.0.1:8080/signin
            // 发请求时，当请求地址中的协议+ 域名/ip + 端口与当前页面地址栏中的一致时可以省略
            this.$axios.post('http://127.0.0.1:8080/signin', {
                username: this.username,
                password: this.password
            }).then(
                res => {
                    console.log(res.data)
                    if (res.data.errcode !== 0) {
                        return alert(res.data.errmsg)
                    }
                    this.$router.push({ name: 'home' })
                },
                res => {
                    console.log("SignIn页面请求数据出错!");
                }
            )
        }
    }
}
</script>