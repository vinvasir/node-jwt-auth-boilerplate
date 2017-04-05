import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	token: null,
	currentUser: null
};

const getters = {
  isAuthenticated: state => {
    return state.token != null
  },
  getCurrentUser: state => {
  	return state.currentUser;
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
  },
  'SET_CURRENT_USER'(state, payload) {
  	state.currentUser = payload;
  }
}

const actions = {
	setToken({commit}, token) {
		commit('SET_TOKEN', token);
	},
	clearToken({commit}) {
		commit('CLEAR_TOKEN', token);
	},
	setCurrentUser({commit}) {
		let user = null;

		axios.get('/current_user')
			.then(({data}) => {
				console.log(data.user);
				user = data.user;
				commit('SET_CURRENT_USER', user);
			}).catch(err => user = null);
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});