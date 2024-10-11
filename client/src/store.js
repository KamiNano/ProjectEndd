import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        token: null,
        user: null,
        userType: null,  // Add userType in state
        isUserLoggedIn: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        setUser(state, user) {
            state.user = user
        },
        setUserType(state, userType) {  // Add mutation for setting userType
            state.userType = userType
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        setUserType({ commit }, userType) {  // Add action for setting userType
            commit('setUserType', userType)
        }
    }
});
