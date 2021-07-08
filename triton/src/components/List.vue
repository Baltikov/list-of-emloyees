<template>
    <div>
        <Top :msg="'СПИСОК СОТРУДНИКОВ'" />
        <div class="content center">
            <div class="content__list">
                <Item
                    v-for="id in paginatedUsers"
                    :id="id"
                    :key="id"
                />
            </div>
        </div>
        <div class="pages center">
            <div
            v-for="page in pages"
            :key="page"
            class="pages__number"
            :class="{'pages__number_selected': page === pageNumber}"
            @click="pageClick(page)">
                {{ page }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import Item from './Item.vue'
import Top from './Top.vue'

export default {
    data () {
        return {
            usersPerPage: 16,
            pageNumber: 1
        }
    },
    components: {
        Item,
        Top
    },
    methods: {
        ...mapActions([
            'requestData'
        ]),
        pageClick(page) {
            this.pageNumber = page
        }
    },
    computed: {
        ...mapGetters([
            'getItemsOnPage'
        ]),
        pages() {
            return Math.ceil(this.getItemsOnPage.length / this.usersPerPage)
        },
        paginatedUsers() {
            let from = (this.pageNumber - 1) * this.usersPerPage;
            let to = from + this.usersPerPage;
            return this.getItemsOnPage.slice(from, to)
        }
    },
    created () {
        this.requestData()
    },
}
</script>

<style module>

</style>