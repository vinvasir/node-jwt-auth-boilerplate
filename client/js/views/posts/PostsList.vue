<template>
	<div>
		<post-detail v-for="post in posts" :post="post" :key="post.id"></post-detail>

		<post-form></post-form>
	</div>
</template>

<script type="text/javascript">
	import PostDetail from './PostDetail'
	import PostForm from './PostForm'

	export default {
		components: {
			PostDetail,
			PostForm
		},
		created() {
			this.$store.dispatch('fetchPosts');
		},
		computed: {
			posts() {
				return this.$store.getters.getPosts;
			}
		}
	}
</script>