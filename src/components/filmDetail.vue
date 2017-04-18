<template>
	<div id="filmDetail">
		<div class="row">
			<div class="col-md-3">
				<img :src="film.image">
				<a :href="film.url" target="_blank">Xem phim >></a>
			</div>
			<div class="col-md-3">
				<div v-if="film.episodes !== null">
					<span>Số lượng: </span>
					<span>{{film.episodes}}</span>
				</div>
				<div>
					<span>Nguồn: </span>
					<span>{{film.source}}</span>
				</div>
				<div v-if="film.country !== null">
					<span>Xuất xứ: </span>
					<span>{{film.country}}</span>
				</div>
				<div v-if="film.length !== null">
					<span>Thời lượng: </span>
					<span>{{film.length}}</span>
				</div>
				<div v-if="film.quality !== null">
					<span>Chất lượng: </span>
					<span>{{film.quality}}</span>
				</div>
				<div v-if="film.year !== null">
					<span>Năm: </span>
					<span>{{film.year}}</span>
				</div>
				<div v-if="film.view !== null">
					<span>Lượt xem: </span>
					<span>{{film.view}}</span>
				</div>
				<a :href="getShare('facebook', film.url)" target="_blank">
					<i class="fa fa-facebook-official fa-3x"></i>
				</a>
				<a :href="getShare('twitter', film.url)" target="_blank">
					<i class="fa fa-twitter fa-3x"></i>
				</a>
				<a :href="getShare('googleplus', film.url)" target="_blank">
					<i class="fa fa-google-plus-official fa-3x"></i>
				</a>
			</div>
			<div class="col-md-6">
				<iframe src="https://www.youtube.com/embed/XGSy3_Czz8k"></iframe>
			</div>
		</div>
		<div class="row">
			<p>Nội dung</p>
			<p>{{film.description}}</p>
		</div>
	</div>
</template>

<script>
	import '@/assets/custom/css/filmDetail.css'
	export default {
		props: {
			film: {}
		},
		data: function () {
			return {

			}
		},
		methods: {
			getShare(typeShare, link) {
				var href
				if (typeShare === 'facebook') {
					href = 'https://www.facebook.com/sharer/sharer.php?u=' + link
				} else if (typeShare === 'twitter') {
					href = 'https://twitter.com/share?url=' + link
				} else if (typeShare === 'googleplus') {
					href = 'https://plus.google.com/share?url=' + link
				}
				return href
			},
		}
	}
</script>