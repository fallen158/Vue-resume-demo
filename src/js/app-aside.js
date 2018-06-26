Vue.component('app-aside', {
    props: [],
    methods: {
        showClick() {
            this.$emit('click-save')
        },
        showShare() {
            this.$emit('click-share')
        },
        showPrint() {
            window.print()
        },
        showSkin() {
            this.$emit('click-skin')
        },
        logOut() {
            if (app.currentUser.objectId === undefined) {
                alert('请先登陆')
            } else {
                AV.User.logOut().then(() => {
                    alert("登出成功");
                    window.location.reload()
                });
            }
        },
    },
    template: `
        <aside>
            <div class="uper ">
                <button @click="showClick">保存简历</button>
                <button @click="showShare">分享简历</button>
                <button @click="showPrint">打印简历</button>
                <button @click="showSkin">风格设置</button>
            </div>
            <div class=down>
                <button @click="logOut">登出账户</button>
            </div>
        </aside>
    `
})