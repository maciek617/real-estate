import {createStore} from 'vuex'

export default createStore({
    state: {
        searchLocationTerm: '',
        price: 999999999999999,
        propertyType: 'All',
        sortBy: '',
        showToastModal: false,
        myTimeout: 0,
        navOpen: false,
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
