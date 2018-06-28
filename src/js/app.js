window.App = {
    props:['mode','resume','shareLink','previewResume'],
    template: `
        <div class="page" >
        <app-aside v-show="mode==='edit'" @click-save="onClickSave" @click-share="shareVisible = !shareVisible" @click-skin="skinVisible= !skinVisible"></app-aside>
        <main>
            <resume :mode="mode" :displayResume="displayResume" :resume='resume'></resume>
        </main>
        <login v-show="loginVisible"  @login="getLogin"></login>
        </login>
        <sing-up v-show="singUpVisible" @singUp="getSingUp"></sing-up>
        <share v-show="shareVisible" :shareLink='shareLink' @close="shareVisible = false"></share>
        <button class="exitPreview" v-if="mode === 'preview'" @click="mode='edit';exitPreview()" v-cloak>退出预览</button>
        <skin v-show="skinVisible" @close="skinVisible=false"></skin>
        </div>
    `,
    data() {
        return {
            editingName: false,
            loginVisible: false,
            singUpVisible: false,
            shareVisible: false,
            skinVisible: false,
            shareLink: '不知道',
            // mode: 'edit', //preview      
        }
        
    },
    computed: {
        displayResume() {
            return this.mode === "preview" ? this.previewResume : this.resume;
        }
    },
    methods: {
        exitPreview() {
            this.shareLink = location.origin + location.pathname
            location.href = this.shareLink
        },
        getSingUp(user) {
            this.loginVisible = false;
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
        },
        onClickSave() {
            var currentUser = AV.User.current();
            if (!currentUser) {
                this.showLogin();
            } else {
                this.saveResume();
            }
        },
        showLogin(e) {
            this.$router.push({path:'/singUp'});
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
    }
}
Vue.component('app', App)


