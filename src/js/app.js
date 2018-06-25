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
            phone: "123456789",
            skills: [
                { name: '请填写技能名称', description: '请填写技能描述' },
                { name: '请填写技能名称', description: '请填写技能描述' },
                { name: '请填写技能名称', description: '请填写技能描述' },
                { name: '请填写技能名称', description: '请填写技能描述' }
            ],
            projects: [
                { name: '请填写项目名称', link: 'http://...', keywords: '技能', description: '技能描述' },
                { name: '请填写项目名称', link: 'http://...', keywords: '技能', description: '技能描述' }
            ],
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
            let reg = /\[(\d+)\]/g
            key = key.replace(reg, (match, number) => {
                return '.' + number
            })
            keys = key.split(".");
            let result = this.resume;
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value;
                } else {
                    result = result[keys[i]];
                }
            }
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
        getResume() {
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user) => {
                user = user.toJSON()
                this.resume = user.resume
            }, function(error) {

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
        },
        removeSkill(index) {
            this.resume.skills.splice(index, 1)
        },
        addSkill() {
            this.resume.skills.push({
                name: '请填写技能名称',
                description: '请填写技能描述'
            })
        },
        removeProject(index) {
            this.resume.projects.splice(index, 1)
        },
        addProject() {
            this.resume.projects.push({
                name: '请填写项目名称',
                link: 'http://...',
                keywords: '技能',
                description: '技能描述'
            })
        }
    }
});

let currentUser1 = AV.User.current()
if (currentUser1) {
    app.currentUser = currentUser1.toJSON()
    app.getResume()
}