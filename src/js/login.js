window.login = {
  data() {
    return {
      singUp: {
        email: "",
        passworld: ""
      }
    };
  },
  methods: {
    onSingUp(e) {
      var user = new AV.User();
      user.setUsername(this.singUp.email);
      user.setPassword(this.singUp.passworld);
      user.setEmail(this.singUp.email);
      user.signUp().then(
        user => {
          alert("注册成功,已登陆");
          this.$router.push({ path: "/" });
          if(location.hash === '#/'){
            this.$emit("login", user);
            user = user.toJSON();
          }
        },
        function(error) {
          alert(error.rawMessage);
        }
      );
    }
  },
  template: `
        <div class="login"  v-cloak>
            <form @submit.prevent="onSingUp">
                <h2>注册</h2>
                <div>
                <router-link to="/" >关闭</router-link>
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
                    <router-link to="/singUp">登陆</router-link>
                </div>
            </form>
        </div>
    `
};
Vue.component("login", window.login);
