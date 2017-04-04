import App from './App.vue'

import store from './store/store.js';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import router from './routes';

new Vue({
	el: '#app',
	components: {App},
	router,
	store
});