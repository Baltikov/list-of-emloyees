import Vue from 'vue'
import Router from 'vue-router'

import List from "./components/List.vue"
import AddForm from './components/AddForm.vue'
import Details from './components/Details.vue'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'list',
            component: List,
            props: true
        },
        {
            path: '/adding-employee',
            name: 'form',
            component: AddForm,
            props: true
        },
        {
            path: '/:id',
            name: 'details',
            component: Details,
            props: true
        }
    ]
})

export default router;