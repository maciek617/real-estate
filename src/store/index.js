import {createStore} from 'vuex'

export default createStore({
    state: {
        searchLocationTerm: '',
        price: 10000000,
        propertyType: 'All',
        sortBy: '',
        showToastModal: false,
        myTimeout: 0
    },
    getters: {},
    mutations: {
        setTimer(state) {
            state.showToastModal = true;
            state.myTimeout = setTimeout(() => {
                state.showToastModal = false;
            }, 10000)
        },

        stopTimer(state) {
            clearTimeout(state.myTimeout)
            state.myTimeout = null;
            state.showToastModal = false;
        }

    },
    actions: {
        startTimer({commit}) {
            commit('setTimer')
        }
    },
    modules: {}
})
