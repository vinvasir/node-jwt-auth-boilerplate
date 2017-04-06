import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	token: null,
	currentUser: null,
	posts: null
};

const getters = {
  isAuthenticated: state => {
    return state.token != null
  },
  getCurrentUser: state => {
  	return state.currentUser;
  },
  getPosts: state => {
  	return state.posts;
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
  },
  'SET_POSTS'(state, payload) {
  	state.posts = payload;
  },
  'ADD_POST'(state, payload) {
  	state.posts.push(payload);
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
	},
	fetchPosts({commit}) {
		let posts = null;

		axios.get('/posts')
			.then(({data}) => {
				posts = data.posts;
				commit('SET_POSTS', posts);
			}).catch(err => posts = null);
	},
	addPost({commit}, payload) {
		commit('ADD_POST', payload.data);
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});