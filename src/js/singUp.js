window.singUp = {
    data() {
        return {
            login: {
                email: "",
                passworld: ""
            },
        }
    },
    methods: {
        onLogin() {
            AV.User.logIn(this.login.email, this.login.passworld).then(
                (user) => {
                    alert("登录成功");
                    user = user.toJSON()
                    this.$emit('singUp', user)
                    window.location.reload()
                },
                error => {
                    if (error.code === 211) {
                        alert("请输入正确的邮箱");
                    } else if (error.code === 210) {
                        alert("邮箱和密码不匹配");
                    }
                }
            );
        },
    },
    template: `
        <div class="singUp " v-cloak>
            <form @submit.prevent="onLogin">
                <h2>登陆</h2>
                <div>
                    <router-link to="/">关闭</router-link>
                </div>
                <div class="row ">
                    <label>邮箱</label>
                    <input type="text" v-model="login.email">
                </div>
                <div class="row ">
                    <label>密码</label>
                    <input type="password" v-model="login.passworld">
                </div>
                <div>
                    <button type="submit ">提交</button>
                   <router-link to="/login">注册</router-link>
                </div>
            </form>
        </div>
    `
}
Vue.component('sing-up', window.singUp)