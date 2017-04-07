import App from './App.vue'

import store from './store/store.js';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import router from './routes';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

new Vue({
	el: '#app',
	components: {App},
	router,
	store
});