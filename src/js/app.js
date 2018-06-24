var app = new Vue({
    el: "#app",
    data: {
        editingName: false,
        loginVisible: false,
        singUpVisible: false,
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
            email: '',
            passworld: ''
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
            let { id } = AV.User.current()
            var todo = AV.Object.createWithoutData('User', id);
            todo.set('resume', this.resume);
            todo.save().then(() => {
                alert('保存成功')
            })
        },
        onSingUp(e) {
            console.log(this.singUp);
            var user = new AV.User();
            user.setUsername(this.singUp.email);
            user.setPassword(this.singUp.passworld);
            user.setEmail(this.singUp.email);
            user.signUp().then(
                function(user) {
                    alert('注册成功');
                },
                function(error) {
                    if (error.code === 125) {
                        alert('请输入正确邮箱')
                    }
                }
            );
        },
        onLogin() {
            AV.User.logIn(this.login.email, this.login.passworld).then(function(user) {
                console.log(user);
            }, function(error) {
                if (error.code === 211) {
                    alert('请输入正确的邮箱')
                } else if (error.code === 210) {
                    alert('邮箱和密码不匹配')
                }
            });
        },
        logOut() {
            AV.User.logOut();
            var currentUser = AV.User.current();
        },
        onClickSave() {
            var currentUser = AV.User.current();
            console.log(currentUser)
            if (!currentUser) {
                this.showLogin();
            } else {
                this.saveResume();
            }
        }
    }
});