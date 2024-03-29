import {createStore} from 'vuex'

export default createStore({
    state: {
        searchLocationTerm: '',
        price: 999999999999999,
        propertyType: {
            term: 'All'
        },
        sortBy: '',
        showToastModal: false,
        myTimeout: 0,
        navOpen: false,
        showNav: false,
        housesToCompare: []
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
