<template>
	<h1>{{ message }}</h1>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				message: ""
			}
		},
		created() {
			axios.get('/users/securedArea')
			 .then(({data}) => {
			 		console.log(data);
			 		this.message = data.msg;
			 })
			 .catch(err => {
			 		console.log(err);
			 		this.message = "You must be logged in to see this page";
			 })
		}
	}
</script>