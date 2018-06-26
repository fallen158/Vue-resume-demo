var app = new Vue({
    el: "#app",
    data: {
        editingName: false,
        loginVisible: false,
        singUpVisible: false,
        shareVisible: false,
        skinVisible: false,
        currentUser: {
            objectId: undefined,
            email: '',
        },
        previewUser: {
            objectId: undefined,
        },
        previewResume: {},
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
        shareLink: '不知道',
        mode: 'edit', //preview
    },
    computed: {
        displayResume() {
            return this.mode === "preview" ? this.previewResume : this.resume;
        }
    },
    watch: {
        'currentUse.objectId': function(newValue, oldValue) {
            console.log(newValue)
            if (newValue) {
                this.getResume(this.currentUser)
            }
        }
    },
    methods: {
        getLogin(user) {
            this.singUpVisible = false;
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            let { objectId } = AV.User.current().toJSON();
            var todo = AV.Object.createWithoutData("User", objectId);
            todo.set("resume", this.resume);
            todo.save().then(() => {
                window.location.reload()
            });
        },
        getSingUp(user) {
            this.loginVisible = false;
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
        },

        exitPreview() {
            this.shareLink = location.origin + location.pathname
            location.href = this.shareLink
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
        getResume(user) {
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
            }, function(error) {});
        },
        onClickSave() {
            var currentUser = AV.User.current();
            if (!currentUser) {
                this.showLogin();
            } else {
                this.saveResume();
            }
        },
    }
});

//获取当前用户
let currentUser1 = AV.User.current()
if (currentUser1) {
    app.currentUser = currentUser1.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then((resume) => {
        app.resume = resume
    })
}

//获取预览用户
let search = location.search
let regex = /user_id=([^&]+)/
let metches = search.match(regex)
let userId
if (metches) {
    userId = metches[1]
    app.mode = 'preview'
    app.getResume({ objectId: userId }).then((resume) => {
        app.previewResume = resume
    })
}