import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAatgzNyO0P3WiZgcLzpBTztWd2EGvqPEc",
    authDomain: "content-upload-2ae8b.firebaseapp.com",
    projectId: "content-upload-2ae8b",
    storageBucket: "content-upload-2ae8b.appspot.com",
    messagingSenderId: "140695409361",
    appId: "1:140695409361:web:9bc10aff664acade382bf0"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

const storageRef = storage.ref();

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: {},
        itemsOnPage: []
    },
    mutations: {
        // список сотрудников
        setData (state, payload) {
            state.data = { ...state.data, ...payload.newData };
            state.itemsOnPage.push(...Object.keys(payload.newData))
        }
    },
    getters: {
        getData: state => state.data,
        getItemsOnPage: state => state.itemsOnPage
    },
    actions: {
        // получить данные с сервера
        async requestData({commit}) {
            try {
                const info = (await firebase.database().ref('/data').once('value')).val()
                commit('setData', { newData: info })
            } catch (e) {
                console.log(e)
            }
        },
        // добавить нового сотрудника
        loadEmployee ({commit}, data) {
            try {
                const info = firebase.database().ref('/data')
                info.push(data)
                commit('setData', { newData: data })
                alert('Сотрудник добавлен')
            } catch (e) {
                console.log(e)
            }
        },
        // загрузить изображение
        onUpload({commit}, files) {
            files.forEach(file => {
                const ref = storage.ref(`img/${file.name}`)
                ref.put(file)
            })
        }
    }
})

export default store