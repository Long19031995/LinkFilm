<template>
	<div id="filmDetail">
		<div class="row">
			<div class="youtube col-md-6">
				<div class="sr">Xin thứ lỗi, chúng tôi sẽ cập nhật video sớm nhất có thể <i class="fa fa-smile-o"></i></div>
				<iframe src="https://www.youtube.com/embed/FN7ALfpGxiI"></iframe>
			</div>
			<div class="detail col-md-6">
				<div class="row">
					<div class="image col-md-6">
						<img :src="film.thumbnail">
						<a :href="film.url" target="_blank">Xem phim >></a>
					</div>
					<div class="content col-md-6">
						<div v-if="film.episode !== null">
							<span>Số lượng: </span>
							<span>{{film.episode}}</span>
						</div>
						<div>
							<span>Nguồn: </span>
							<span>{{film.source.name}}</span>
						</div>
						<div>
							<span>Xuất xứ: </span>
							<span>{{film.country[0].name}}</span>
						</div>
						<div v-if="film.length !== null">
							<span>Thời lượng: </span>
							<span>{{film.length}}</span>
						</div>
						<div>
							<span>Chất lượng: </span>
							<span>{{film.quality}}</span>
						</div>
						<div v-if="film.year.length !== 0">
							<span>Năm: </span>
							<span>{{film.year}}</span>
						</div>
						<div>
							<span>Lượt xem: </span>
							<span>{{film.view_root}}</span>
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
				</div>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-md-6">
				<div class="fb-comments" :data-href="url" data-width="480" data-numposts="5"></div>
			</div>
			<div class="description col-md-6">
				<p>{{film.description}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import '../assets/custom/css/filmDetail.css'
	export default {
		mounted: function () {
			var self = this
			self.stopScroll()
			self.getUrl()
			self.getFilm()
		},
		data: function () {
			return {
				film: {},
				url: ''
			}
		},
		watch: {
			$route: function () {
				var self = this
				self.getFilm()
				self.getUrl()
			}
		},
		methods: {
			getUrl: function () {
				var self = this
				self.url = 'http://localhost:8080/#/' + self.$route.fullPath
			},
			getFilm: function () {
				var self = this
				var filmId = self.$route.params.filmId
				var url = 'http://128.199.192.137:8000/v1/api/get_film_detail?film_id=' + filmId
				self.$http.get(url).then(function (res) {
					self.film = res.body.data.film[0]
				})
			},
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
			stopScroll: function () {
				var self = this
			}
		}
	}
</script>