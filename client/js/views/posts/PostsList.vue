<template>
	<div>
		<post-detail v-for="post in posts" :post="post" :key="post.id"></post-detail>
	</div>
</template>

<script type="text/javascript">
	import PostDetail from './PostDetail'

	export default {
		components: {
			PostDetail
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