<template>
    <div>
        <div class="list" >
            <img class="list__photo" :src=" getItemData.img ">
            <router-link
                :to="{ name: 'details', params: { id: this.id } }"
                class="list__details">
                    Подробнее
            </router-link>
            <div class="list__data">
                <h3 class="list__data_name"> {{ getItemData.name }} </h3>
                <p class="list__data_position"> {{ getItemData.position }} </p>
                <p class="list__data_info"> {{ this.text }} </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        id: String
    },
    data () {
        return {
            text: ''
        }
    },
    computed: {
        ...mapGetters([
            'getData'
        ]),
        getItemData () {
            return this.getData[this.id]
        }
    },
    created() {
        this.getItemData;
        
        if (this.getItemData.position == 'Руководитель' || this.getItemData.position == 'Директор') {
            this.text = this.getItemData.department
        } else {
            this.text = this.getItemData.leader
        }
    }
}
</script>

<style module>
    
</style>