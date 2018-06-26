Vue.component('skin', {
    methods: {
        replaceSkin(name) {
            document.body.className = name
        }
    },
    template: `
    <div class="skinVisible">
            <div class="removeSkin" @click="$emit('close')">x</div>
            <button @click="replaceSkin('defult')">默认</button>
            <button @click="replaceSkin('pink')">粉色</button>
            <button @click="replaceSkin('black')">黑色</button>
            <button @click="replaceSkin('green')">绿色</button>
    </div>
    `
})