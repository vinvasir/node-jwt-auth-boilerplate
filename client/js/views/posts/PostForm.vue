<template>
	<form @click.prevent="handleSubmit">
		<div class="form-group">
			<label for="title">Title</label>
			<input id="title" v-model="newPost.title" type="text" class="form-control">
		</div>

		<div class="form-group">
			<label for="body">Body</label>
			<textarea id="body" class="form-control" v-model="newPost.body"></textarea>
		</div>

		<button type="submit" class="btn btn-default">Add Post</button>
	</form>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				newPost: {},
				csrfToken: "",
				error: ""
			}
		},
		created() {
			axios.get('/posts/new')
				.then(({data}) => {
					this.csrfToken = data.csrfToken;
				}).catch(err => console.log(err));
		},
		methods: {
			handleSubmit() {
				axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken;
				axios.post('/posts', this.newPost)
					.then(({data}) => {
						this.$store.dispatch('addPost', data)
					}).catch(err => {
						console.log(err);
					});
			}
		}
	}
</script>