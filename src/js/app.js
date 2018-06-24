var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
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
        }
    }
})