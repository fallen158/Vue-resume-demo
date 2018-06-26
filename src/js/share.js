Vue.component('share', {
    props: ['shareLink'],
    template: `
    <div class="share" v-cloak>
            <h2>将下面连接分享给面试官</h2>
            <textarea readonly>{{shareLink}}</textarea>
            <div class="closeShare" @click="$emit('close')">x</div>
    </div>
    `
})