Vue.component('resume', {
    props: ['mode', 'displayResume', 'resume'],
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
                    console.log(result[keys[i]])
                } else {
                    result = result[keys[i]];
                }
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
        },

    },
    template: `
    <div class="resume ">
    <section class="character ">
        <h1>
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.name " @edit="onEdit( 'name',$event) "></eventale-span>
        </h1>
        <p>
            应聘职位：
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.title " @edit="onEdit( 'title',$event) "></eventale-span>
        </p>
        <p>
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.birthday " @edit="onEdit( 'birthday',$event) "></eventale-span>
            |
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.gender " @edit="onEdit( 'gender',$event) "></eventale-span>
            |
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.email " @edit="onEdit( 'email',$event) "></eventale-span>
            |
            <eventale-span :disabled="mode === 'preview'" :value="displayResume.phone " @edit="onEdit( 'phone',$event) "></eventale-span>
        </p>
    </section>
    <section class="skills">
        <h2>技能</h2>
        <ul>
            <li v-for="skill,index in displayResume.skills ">
                <div>
                    <eventale-span :disabled="mode === 'preview'" :resume='resume' :value="skill.name " @edit="onEdit('skills['+index+'].name', $event)"></eventale-span>
                </div>
                <div>
                    <eventale-span :disabled="mode === 'preview'" :value="skill.description " @edit="onEdit('skills['+index+'].description',$event)"></eventale-span>
                </div>
                <span class="removeSkill " @click="removeSkill " v-if="index>=4" v-show="mode==='edit'">x</span>
            </li>
            <li v-show="mode==='edit'" class="add">
                <span @click="addSkill()">添加</span>
            </li>
        </ul>
    </section>
    <section class="project">
        <h2>项目经历</h2>
        <ul>
            <li v-for="project,index in displayResume.projects">
                <div class="message">
                    <div>
                        <h3 class="name">
                            <eventale-span :disabled="mode === 'preview'" :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></eventale-span>
                        </h3>
                        <eventale-span :disabled="mode === 'preview'" :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></eventale-span>
                        <div @click="removeProject" v-if="index>=2" class="remove" v-show="mode==='edit'">x</div>
                    </div>
                    <eventale-span :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></eventale-span>
                </div>
                <eventale-span :disabled="mode === 'preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></eventale-span>
            </li>
            <li class="add" v-show="mode==='edit'">
                <span @click="addProject">添加</span>
            </li>
        </ul>
    </section>
</div>
    `
})