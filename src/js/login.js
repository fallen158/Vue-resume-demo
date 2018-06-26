Vue.component('login', {
    data() {
        return {
            singUp: {
                email: "",
                passworld: ""
            },
        }
    },
    methods: {
        onSingUp(e) {
            var user = new AV.User();
            user.setUsername(this.singUp.email);
            user.setPassword(this.singUp.passworld);
            user.setEmail(this.singUp.email);
            user.signUp().then(
                (user) => {
                    alert("注册成功,已登陆");
                    user = user.toJSON()
                    this.$emit('login', user)
                },
                function(error) {
                    alert(error.rawMessage)
                }
            );
        },
        onClickSingUp() {
            this.$emit('gologin')
        }
    },
    template: `
        <div class="login"  v-cloak>
            <form @submit.prevent="onSingUp">
                <h2>注册</h2>
                <div>
                    <button type="button" @click="$emit('close')">关闭</button>
                </div>
                <div class="row">
                    <label>邮箱</label>
                    <input type="text" v-model="singUp.email">
                </div>
                <div class="row ">
                    <label>密码</label>
                    <input type="password" v-model="singUp.passworld">
                </div>
                <div>
                    <button type="submit">提交</button>
                    <button type="button" @click="onClickSingUp">登陆</button>
                </div>
            </form>
        </div>
    `
})