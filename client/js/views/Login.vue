<template>
	<div>
		<h1>Enter your credentials below:</h1>

		<form action="/auth/login" method="post">
			<div class="form-group">
				<label for="username">Username:</label>
				<input type="text" name="username" id="username" class="form-control">
			</div>

			<div class="form-group">
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" class="form-control">
			</div>

			<button type="submit" class="btn btn-default">Log In</button>
		</form>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			handleSubmit() {
				axios.post('/auth/login', {
					username: this.username,
					password: this.password
				}).then(({data}) => {
					this.$store.dispatch('setToken', data.token);
					this.username = "";
					this.password = "";
				}).catch(err => console.log(err));
			}
		}
	}
</script>