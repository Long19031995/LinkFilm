<template>
	<div>
		<div id="titileCategory">
			<div>Phim Mới</div>
		</div>
		<div id="filmNew">
			<div v-for="(film, index) in listFilm" class="frame">
				<div class="image">
					<img :src="film.thumbnail">
					<div class="background"></div>
					<button @click="getFilmModal(index)" data-toggle="modal" href="#modal-film-category">Xem chi tiết >></button>
				</div>
				<div class="content">
					<div class="volume">
						<span v-if="film.episode !== null">{{film.pre_episode}}/{{film.episode}} Tập</span>
						<span v-else>1 Tập</span>
					</div>
					<div class="name">
						<span>{{film.title}}</span>				
					</div>
					<div class="view">
						<span>{{film.view_root}} </span><i class="fa fa-eye"></i>
					</div>
					<div class="source">
						<img :src="film.source.icon">
						<span>{{film.source.name}}</span>
					</div>
				</div>
			</div>
			<div class="modal fade" id="modal-film-category">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="background-blur"></div>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-8">
									<div class="title">{{filmModal.title}}</div>
									<iframe :src="'https://www.youtube.com/embed/' + getIdFromLinkYoutube(filmModal.trailer)"></iframe>
								</div>
								<div class="col-md-4">
									<div v-if="categoryId === 2">
										<span>Số lượng: </span>
										<span>{{filmModal.pre_episode}}/{{filmModal.episode}}</span>
									</div>
									<div>
										<span>Nguồn: </span>
										<span>{{filmModal.source}}</span>
									</div>
									<div>
										<span>Xuất xứ: </span>
										<span>{{filmModal.country}}</span>
									</div>
									<div v-if="filmModal.length !== null">
										<span>Thời lượng: </span>
										<span>{{filmModal.length}}</span>
									</div>
									<div>
										<span>Chất lượng: </span>
										<span>{{filmModal.quality}}</span>
									</div>
									<div>
										<span>Năm: </span>
										<span>{{filmModal.year}}</span>
									</div>
									<div>
										<span>Lượt xem: </span>
										<span>{{filmModal.view}}</span>
									</div>
									<a :href="filmModal.url" target="_blank">
										<i class="fa fa-film"> Xem Phim >></i>
									</a>
									<br><br>
									<span class="textShare">Chia sẻ: </span>
									<a :href="getShare('facebook', filmModal.url)" target="_blank">
										<i class="fa fa-facebook-official fa-3x"></i>
									</a>
									<a :href="getShare('twitter', filmModal.url)" target="_blank">
										<i class="fa fa-twitter fa-3x"></i>
									</a>
									<a :href="getShare('googleplus', filmModal.url)" target="_blank">
										<i class="fa fa-google-plus-official fa-3x"></i>
									</a>
								</div>
							</div>
							<div class="row">
								<p>Nội dung</p>
								<p>{{filmModal.description}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="load-more">
			<div @click="getListFilm()">Thêm phim >></div>
		</div>
	</div>
</template>

<script>
	import '../assets/custom/css/filmNew.css'
	export default {
		mounted: function () {
			var self = this
			self.getListFilm()
			// self.loadScroll()
			self.setJS()
		},
		props: {
			titleCategory: String
		},
		data: function () {
			return {
				page: 1,
				count: 8,
				listFilm: [],
				filmModal: {
					thumbnail: '',
					title: '',
					episode: '',
					source: '',
					country: '',
					length: '',
					quality: '',
					year: '',
					view: '',
					description: '',
					url: '',
					trailer: ''
				},
				categoryId: ''
			}
		},
		watch: {
	      	$route: function () {
	        	var self = this
	        	self.getListFilm()
	      	}
	    },
		methods: {
			getIdFromLinkYoutube: function (link) {
				var self = this
				if (link !== '') {
					return self.$parent.$parent.getIdFromLinkYoutube(link)
				}
			},
			getListFilm: function () {
				$('#circleLoad').fadeIn('slow')
				var self = this
				var page = self.page
				var count = self.count
				var url = 'http://128.199.192.137:8000/v1/api/get_list_film/' +
						  '?page=' + self.page +
						  '&count=' + self.count
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						for (var i = 0; i < res.body.data.films.length; i++) {
							self.listFilm.push(res.body.data.films[i])
							self.page++
						}
						$('#circleLoad').fadeOut('slow')
					}
				})
			},
			getFilmModal: function (index) {
				var self = this

				if (self.categoryId === 2) {
					self.filmModal.episode = self.listFilm[index].episode
					self.filmModal.pre_episode = self.listFilm[index].pre_episode
				}
				self.filmModal.banner = self.listFilm[index].banner
				self.filmModal.title = self.listFilm[index].title
				self.filmModal.source = self.listFilm[index].source.name
				self.filmModal.country = self.listFilm[index].country[0].name
				self.filmModal.length = self.listFilm[index].length
				self.filmModal.quality = self.listFilm[index].quality
				self.filmModal.year = self.listFilm[index].year[0].year
				self.filmModal.view = self.listFilm[index].view_root
				self.filmModal.description = self.listFilm[index].description
				self.filmModal.url = self.listFilm[index].url
				self.filmModal.trailer = self.listFilm[index].trailer[0].url_trailer

				$('#filmNew .modal .modal-content .background-blur').css('background-image', 'url(' + self.filmModal.banner + ')')
			},
			// loadScroll: function () {
			// 	var self = this
			// 	$(window).scroll(function() {
			// 	    if($(window).scrollTop() === $(document).height() - $(window).height()) {
			// 	    	$('#circleLoad').fadeIn('slow')
			// 	    	self.getListFilm()
			// 	    }
			// 	})
			// },
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
			setJS: function () {
				var self = this
				$('#circleLoad').hide()
			},
			isLinkFilm: function (link) {
				if (link !== undefined) {
					if (link.includes('http')) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		}
	}
</script>