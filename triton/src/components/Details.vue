<template>
    <div>
        <Top :msg="'ПОДРОБНАЯ ИНФОРМАЦИЯ'" />
        <div class="employees center">
            <img class="employees__photo" :src=" getList[this.id].img ">
            <div class="employees__data">
                <h2 class="employees__data_name"> {{ getList[this.id].name }} </h2>
                <p class="employees__data_position"><span class="employees__data_text">Должность: </span><br> {{ getList[this.id].position }} </p>
                <p v-if="leader"><span class="employees__data_text">Руководитель: </span><br> {{ getList[this.id].leader }} </p>
                <p class="employees__data_department"> {{ getList[this.id].department }} </p>
                <p><span class="employees__data_text">Информация об отделе: </span><br> {{ getList[this.id].info }} </p>
                
                <ul v-if="people">
                    <p class="employees__data_position">Список сотрудников в отделе:</p>
                    <li
                        v-for="value in result"
                        v-bind:key="value.id"
                        class="employees__data_people">
                            {{ value.name }}
                    </li>
                </ul>
            </div>
            <div class="employees__action">
                <button class="employees__action_button" @click="editData">&#9998;</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Top from './Top.vue'

export default {
    props: ['id'],
    data() {
        return {
            result: [],
            people: false,
            leader: true
        }
    },
    components: {
        Top
    },
    computed: {
        ...mapGetters([
            'getData'
        ]),
        getList () {
            return this.getData;
        }
    },
    methods: {
        editData() {
            console.log("Редактирование/удаление сотрудника")
        }
    },
    created() {
        this.getList;
    },
    watch: {
        id: {
            immediate: true,

            handler() {
                if (this.getList[this.id].position == 'Руководитель' || this.getList[this.id].position == 'Директор') {
                    this.people = true;
                    this.leader = false;
                    let data = Object.values(this.getList);
                    this.result = data.filter(event => event.department == this.getList[this.id].department && event.name != this.getList[this.id].name);
                } else {
                    this.result = [];
                    this.people = false;
                    this.leader = true;
                }
            }
        }
    }
}
</script>

<style module>

</style>