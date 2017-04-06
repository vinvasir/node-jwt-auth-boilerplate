<template>
	<div class="well">
		<h2>{{ post.title }}</h2>
		<p>{{ post.body }}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			post: {
				type: Object,
				required: true
			}
		}
	}
</script>