<template>
	<div id="app">
		<router-view name="Index"></router-view>
	</div>
</template>

<script>
	export default {
		methods: {
			getIdFromLinkYoutube: function (link) {
				link = link.split('?v=')[1]
				link = link.split('&')[0]
				return link
			}
		}
	}
</script>