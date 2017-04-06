<template>
	<div>
		<app-navbar :currentUser="currentUser"></app-navbar>
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<div class="panel panel-default">
							<div class="panel-body">
								{{ message }}
								{{ count }}
								<button class="btn btn-primary" @click="increment">+</button>
								<button class="btn btn-danger" @click="decrement">-</button>
							</div>				
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<div class="panel panel-default">
						<router-view></router-view>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<div class="panel panel-default">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script type="text/javascript">
	import AppNavbar from './views/NavBar.vue';

	export default {
		components: {
			AppNavbar
		},
    created() {
      const token = localStorage.getItem("token")
      if(token) {
				this.$store.dispatch('setToken', token)
      }
      this.$store.dispatch('setCurrentUser');
    },		
		data() {
			return {
				message: 'Hello from Vue!',
				count: 0
			}
		},
		computed: {
			isAuthenticated() {
				return this.$store.getters.isAuthenticated
			},
			currentUser(){ 
				return this.$store.getters.getCurrentUser
			}
		},
		methods: {
			increment() {
				this.count++;
			},
			decrement() {
				this.count--;
			}
		}
	}
</script>