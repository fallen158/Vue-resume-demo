var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        singUpVisible: false,
        resume: {
            name: '姓名',
            title: '前端开发工程师',
            birthday: '19909月9日',
            gender: '男',
            email: '79334424@qqcom',
            phone: '123456789',
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value
        },
        showLogin(e) {
            this.loginVisible = true
        },
        saveResume() {

        },
        onSubmit() {

        },
        onClickSave() {
            console.log(this.resume)
                // var User = AV.Object.extend('User');
                // var user = new User();
                // user.set('resume', this.resume);
                // user.save().then(function(user) {
                //     console.log(user);
                // }, function(error) {
                //     console.error(error);
                // });

            var currentUser = AV.User.current();
            if (!currentUser) {
                this.showLogin()
            } else {
                this.saveResume()
            }
        }
    }
})