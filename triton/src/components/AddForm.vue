<template>
    <div>
        <Top :msg="'ДОБАВЛЕНИЕ СОТРУДНИКА'" />
        <div class="registration center">
            <div class="registration__addition">
                <div class="registration__addition_data">
                    <input 
                        type="file"
                        @change="onFileSelected">
                    <input
                        class="registration__addition_data-form"
                        type="text"
                        placeholder="Фамилия"
                        v-model="surname">
                    <input
                        class="registration__addition_data-form"
                        type="text"
                        placeholder="Имя"
                        v-model="name">
                    <input
                        class="registration__addition_data-form"
                        type="text"
                        placeholder="Отчество"
                        v-model="patronymic">
                    <label class="registration__addition_data-form checkbox">
                        <input
                            type="checkbox">
                        <span>Руководитель</span>
                    </label>
                    <select
                        class="registration__addition_data-form"
                        v-model="selected"
                        required>
                            <option>Отдел продаж и обслуживания №1</option>
                            <option>Отдел продаж и обслуживания №2</option>
                            <option>Отдел продаж и обслуживания №3</option>
                            <option>Отдел технической поддержки №1</option>
                            <option>Отдел технической поддержки №2</option>
                            <option>Отдел разработки №1</option>
                            <option>Отдел разработки №2</option>
                            <option>Отдел документооборота</option>
                    </select>
                </div>
                <p v-if="error" class="registration__addition_error">Загрузите фотографию и заполните все поля</p>
                <button class="registration__addition_button" @click="addEmployee">
                    Добавить
                </button>
            </div>
            <img class="registration__image" :src=" selectedFile " />
        </div>
    </div>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Top from './Top.vue'

export default {
    components: {
        Top
    },
    data () {
        return {
            count: 1,
            dataOfEmployee: null,
            fullName: '',
            surname: null,
            name: null,
            patronymic: null,
            leader: null,
            selected: null,
            topManager: null,
            selectedFile: null,
            img: null,
            error: false,
            files: []
        }
    },
    methods: {
        ...mapActions([
            'loadEmployee',
            'onUpload'
        ]),
        addEmployee () {
            const check = this.checkData();
            if (check) {
                this.loadEmployee(this.dataOfEmployee);
            } else {
                console.log('Ошибка загрузки данных')
            }
        },
        checkData() {
            if (this.surname && this.name && this.patronymic && this.selected && this.img) {
                this.error = false;

                this.fullName = this.surname + ' ' + this.name + ' ' + this.patronymic;

                if (this.leader) {
                    this.dataOfEmployee = { name: this.fullName, position: "Руководитель", department: this.selected, leader: this.topManager, img: this.img };
                } else {
                    const leaderDepartments = this.lookForLeader(this.selected);
                    this.dataOfEmployee = { name: this.fullName, position: "Менеджер", department: this.selected, leader: leaderDepartments, img: this.img };
                }

console.log(this.files)
                this.onUpload(this.files)

                return true
            } else {
                this.error = true
                return false
            }
        },
        lookForLeader (selected) {
            let data = Object.values(this.getList);
            let result = data.filter(event => event.department == selected);
            return result[0].name;
        },
        onFileSelected(event) {
            this.img = './img/' + event.target.files[0].name;


            if (!event.target.files.length) {
                return
            }

            this.files = Array.from(event.target.files)

            this.files.forEach(file => {
                if (!file.type.match( 'image' )) {
                    return
                }

                const reader = new FileReader()
                
                reader.onload = event => {
                    this.selectedFile = event.target.result
                }

                reader.readAsDataURL(file)
            })
        }
    },
    computed: {
        ...mapGetters([
            'getData'
        ]),
        getList () {
            return this.getData;
        }
    }
}
</script>

<style>

</style>