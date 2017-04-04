import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	token: null
};

const getters = {
  isAuthenticated: state => {
    return state.token != null
  }
};

const mutations = {
  'SET_TOKEN'(state, payload) {
    state.token = payload
    localStorage.setItem("token", payload)
  },
  'CLEAR_TOKEN'(state) {
    state.token = null
    localStorage.removeItem("token")
  }
}

const actions = {
	setToken({commit}, token) {
		commit('SET_TOKEN', token);
	},
	clearToken({commit}) {
		commit('CLEAR_TOKEN', token);
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});