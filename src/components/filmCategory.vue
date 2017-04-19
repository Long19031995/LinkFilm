<template>
	<div id="filmCategory">
		<div v-for="(film, index) in listFilm" class="frame">
			<div class="image">
				<img :src="film.image">
				<div class="background"></div>
				<button @click="getFilmModal(index)" data-toggle="modal" href="#modal-film">Xem chi tiết >></button>
			</div>
			<div class="content">
				<div class="volume">
					<span v-if="film.episodes !== null">{{film.episodes}}</span>
					<span v-else>1 Tập</span>
				</div>
				<div class="name">
					<span>{{film.title}}</span>					
				</div>
				<div class="source">
					<img src="http://static.hdonline.vn/template/frontend/images/favicon.ico">
					<span>{{film.source}}</span>					
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-film">
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
								<div v-if="filmModal.episodes !== null">
									<span>Số lượng: </span>
									<span>{{filmModal.episodes}}</span>
								</div>
								<div>
									<span>Nguồn: </span>
									<span>{{filmModal.source}}</span>
								</div>
								<div v-if="filmModal.country !== null">
									<span>Xuất xứ: </span>
									<span>{{filmModal.country}}</span>
								</div>
								<div v-if="filmModal.length !== null">
									<span>Thời lượng: </span>
									<span>{{filmModal.length}}</span>
								</div>
								<div v-if="filmModal.quality !== null">
									<span>Chất lượng: </span>
									<span>{{filmModal.quality}}</span>
								</div>
								<div v-if="filmModal.year !== null">
									<span>Năm: </span>
									<span>{{filmModal.year}}</span>
								</div>
								<div v-if="filmModal.view !== null">
									<span>Lượt xem: </span>
									<span>{{filmModal.view}}</span>
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
		</div>
	</div>
</template>

<script>
	import '../assets/custom/css/filmCategory.css'
	export default {
		props: {
			listFilm: Array,
			idCategory: ''			
		},
		mounted: function () {
			var self = this
			self.loadScroll()
			self.resetPagination()
			self.setJS()
		},
		data: function () {
			return {
				page: '',
				count: '',
				filmModal: {}
			}
		},
		methods: {
			getListFilm: function () {
				var self = this
				self.page = self.page + 1
				var url = 'http://139.59.116.17:8000/v1/api/get_list_film?type_film=' + self.idCategory +
						  '&page=' + self.page +
						  '&count=' + self.count
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						for (var i = 0; i < res.body.data.length; i++) {
							self.listFilm.push(res.body.data[i])
						}
						$('#circleLoad').fadeOut('slow')
					}
				})
			},
			getFilmModal: function (index) {
				var self = this
				self.filmModal = self.listFilm[index]
				$('#filmCategory .modal .modal-content .background-blur').css('background-image', 'url(' + this.filmModal.image + ')')
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
			resetPagination: function () {
				var self = this
				self.page = 0
				self.count = 8
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