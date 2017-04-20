<template>
	<div>
		<div id="titileCategory">
			<div>Phim {{titleCategory}}</div>
		</div>
		<div id="filmCategory">
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
			<!-- <div class="modal fade" id="modal-film-category">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="background-blur"></div>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-8">
									<span>{{filmModal.title}}</span>
									<iframe src="https://www.youtube.com/embed/XGSy3_Czz8k"></iframe>
								</div>
								<div class="col-md-4">
									<div>
										<span>Số lượng: </span>
										<span>{{filmModal.episode}}</span>
									</div>
									<div>
										<span>Nguồn: </span>
										<span>{{filmModal.source.name}}</span>
									</div>
									<div>
										<span>Xuất xứ: </span>
										<span>{{filmModal.country[0].name}}</span>
									</div>
									<div>
										<span>Thời lượng: </span>
										<span>{{filmModal.length}}</span>
									</div>
									<div>
										<span>Chất lượng: </span>
										<span>{{filmModal.quality}}</span>
									</div>
									<div>
										<span>Năm: </span>
										<span>{{filmModal.year[0].name}}</span>
									</div>
									<div>
										<span>Lượt xem: </span>
										<span>{{filmModal.view_root}}</span>
									</div>
									<a :href="filmModal.url" target="_blank">
										<i class="fa fa-film"> Xem Phim >></i>
									</a>
									<br><br>
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
			</div> -->
		</div>
	</div>
</template>

<script>
	import '../assets/custom/css/filmCategory.css'
	export default {
		mounted: function () {
			var self = this
			self.getListFilm()
			self.loadScroll()
			self.setJS()
		},
		props: {
			titleCategory: String
		},
		data: function () {
			return {
				page: 0,
				count: 8,
				listFilm: [],
				filmModal: {},
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
			getListFilm: function () {
				var self = this
				if (self.categoryId !== self.$route.params.categoryId) {
					self.categoryId = self.$route.params.categoryId
					self.page = 0
					self.count = 8
					self.listFilm = []
				}
				var type = self.$route.params.categoryId
				var page = self.page
				var count = self.count
				var url = 'http://128.199.192.137:8000/v1/api/get_list_film?type=' + type
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
				self.filmModal = self.listFilm[index]
				$('#filmCategory .modal .modal-content .background-blur').css('background-image', 'url(' + this.filmModal.thumbnail + ')')
			},
			loadScroll: function () {
				var self = this
				$(window).scroll(function() {
				    if($(window).scrollTop() === $(document).height() - $(window).height()) {
				    	$('#circleLoad').fadeIn('slow')
				    	self.getListFilm()
				    }
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