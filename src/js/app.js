var app = new Vue({
    el: "#app",
    data: {
        editingName: false,
        loginVisible: false,
        singUpVisible: false,
        currentUser: {
            objectId: undefined,
            email: '',
        },
        resume: {
            name: "姓名",
            title: "前端开发工程师",
            birthday: "19909月9日",
            gender: "男",
            email: "79334424@qqcom",
            phone: "123456789"
        },
        singUp: {
            email: "",
            passworld: ""
        },
        login: {
            email: "",
            passworld: ""
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value;
        },
        showLogin(e) {
            this.loginVisible = true;
        },
        saveResume() {
            let { objectId } = AV.User.current().toJSON();
            var todo = AV.Object.createWithoutData("User", objectId);
            todo.set("resume", this.resume);
            todo.save().then(() => {
                alert("保存成功");
            });
        },
        onSingUp(e) {
            var user = new AV.User();
            user.setUsername(this.singUp.email);
            user.setPassword(this.singUp.passworld);
            user.setEmail(this.singUp.email);
            user.signUp().then(
                (user) => {
                    alert("注册成功,已登录");
                    this.loginVisible = false;
                    user = user.toJSON()
                    this.currentUser.objectId = user.objectId
                    this.currentUser.email = user.email
                },
                function(error) {
                    alert(error.rawMessage)
                }
            );
        },
        onLogin() {
            AV.User.logIn(this.login.email, this.login.passworld).then(
                (user) => {
                    alert("登录成功");
                    this.singUpVisible = false;
                    user = user.toJSON()
                    this.currentUser.objectId = user.objectId
                    this.currentUser.email = user.email
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
        logOut() {
            AV.User.logOut().then(() => {
                alert("登出成功");
                window.location.reload()
            });
        },
        onClickSave() {
            var currentUser = AV.User.current();
            if (!currentUser) {
                this.showLogin();
            } else {
                this.saveResume();
            }
        }
    }
});

let currentUser1 = AV.User.current()
if (currentUser1) {
    app.currentUser = currentUser1.toJSON()

}