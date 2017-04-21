<template>
	<div id="index">
		<div class="navbar-top">
			<div @click="toHome()" class="logo">
				<label>Ninh.Phim</label>
			</div>
			<div class="search">
				<input @keyup="searchFilm()" v-model="search.key" type="search">
				<i @click="toFilmSearch()" class="fa fa-search"></i>
				<div class="searchResult">
					<div v-if="search.listSearchFilmNewResult.length > 0">
						<h3><b>Phim mới</b></h3>
						<ul>
							<li v-for="(film, index) in search.listSearchFilmNewResult" @click="toFilmNewDetail(index)">
								<img :src="film.source.icon" width="30" height="30">
								{{film.title}}
							</li>
						</ul>						
					</div>
					<div v-if="search.listSearchFilmHotResult.length > 0">
						<h3><b>Phim hot</b></h3>
						<ul>
							<li v-for="(film, index) in search.listSearchFilmHotResult" @click="toFilmHotDetail(index)">
								<img :src="film.source.icon" width="30" height="30">
								{{film.title}}
							</li>
						</ul>						
					</div>
					<div v-else>...</div>
				</div>
			</div>
			<div class="category">
				<button>Thể loại</button>
				<div class="categoryResult">
					<ul>
						<li v-for="(category, index) in category.listCategory" @click="toFilmCategory(index)" v-if="category.name_category !== ''">
								Phim {{category.name_category}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="carousel">
			<div class="intro">
				<div v-for="(film, index) in film.listFilm" class="item">
					<img :src="film.banner" width="400" height="200">
					<div class="background"></div>
					<div class="title">{{film.title}}</div>
					<div class="source-name">{{film.source.name}}</div>
					<div class="title-inter">{{film.title_inter}}</div>
					<div class="description">{{film.description}}</div>
					<div class="icon">
						<img :src="film.source.icon" width="50" height="50">
					</div>
					<div @click="toDetail(index)" class="see-more">Chi tiết phim >></div>
				</div>
			</div>
			<div class="prev-next">
				<i @click="prevItem()" class="fa fa-chevron-left fa-3x prev"></i>
				<i @click="nextItem()" class="fa fa-chevron-right fa-3x next"></i>
			</div>
		</div>
		<div id="content">
			<router-view name="FilmNew"></router-view>
			<router-view name="FilmCategory" :titleCategory="category.titleCategory"></router-view>
			<router-view name="FilmDetail"></router-view>
			<router-view name="FilmSearch"></router-view>
		</div>
		<footer>
			<div class="col-md-6">
				<div class="logo">
					NINHPHIM.net
				</div>
				<div class="slogan">
					Tìm link thỏa thích
				</div>
			</div>
			<div class="contact col-md-6">
				<p>Liên hệ quảng cáo</p>
				<p>Email: longdeptrai@gmail.com</p>
			</div>
		</footer>
		<div id="scrollTop">
			<i @click="scrollTop()" class="fa fa-angle-double-up fa-4x"></i>
		</div>
		<div id="circleLoad" class="bound">
	      	<div class="boundpoint">
	        	<div class="point">
	        	</div>
	      	</div>      
	    </div>
	</div>
</template>

<script>
	import '../assets/custom/css/Index.css'
	export default {
		mounted: function () {
			var self = this
			self.setJS()
			self.getListCategory()
			self.getListFilm()
		},
		updated: function () {
			var self = this
			self.getPosition()
		},
		data: function () {
			return {
				category: {
					listCategory: [],
					titleCategory: ''
				},
				search: {
					listSearchFilmNewResult: [],
					listSearchFilmHotResult: [],
					key: ''
				},
				film: {
					listFilmByCategory: [],
					filmDetail: {},
					listFilmSearch: {},
					listFilm: []
				}
			}
		},
		methods: {
			searchFilm: function () {
				var self = this
				var page

				page = Math.floor(Math.random() * (100 - 0)) + 0
				var url = 'http://128.199.192.137:8000/v1/api/search_title_film/' + 
						  '?q=' + self.search.key +
						  '&page=' + page +
						  '&count=5'
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.search.listSearchFilmNewResult = res.body.data.films
					}
				})

				page = Math.floor(Math.random() * (10 - 0)) + 0
				var url = 'http://128.199.192.137:8000/v1/api/get_film_hot/' +
						  '?q=' + self.search.key +
						  '&page=' + page +
						  '&count=5'
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.search.listSearchFilmHotResult = res.body.data.films
					}
				})
			},
			getListCategory: function () {
				var self = this
				var url = 'http://128.199.192.137:8000/v1/api/get_all_category/'
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.category.listCategory = res.body.data.categories
					}
				})
			},
			toHome: function () {
				var self = this
				self.$router.push({
					name: 'index'
				})
			},
			toFilmCategory: function (index) {
				var self = this
				self.category.titleCategory = self.category.listCategory[index].name_category
				var categoryId = self.category.listCategory[index].id
				self.$router.push({
					name: 'film-category',
					params: { categoryId: categoryId }
				})
			},
			toDetail: function (index) {
				var self = this
				var filmId = self.film.listFilm[index].id
				self.$router.push({
					name: 'film-detail',
					params: { filmId: filmId }
				})
			},
			toFilmDetail: function (index) {
				var self = this
				var filmId = self.search.listSearchResult[index].id
				self.$router.push({
					name: 'film-detail',
					params: { filmId: filmId }
				})
			},
			toFilmSearch: function () {
				var self = this
				var key = self.search.key
				self.$router.push({
					name: 'film-search',
					params: { key: key }
				})
			},
			getListFilm: function () {
				var self = this
				var page = Math.floor(Math.random() * (100 - 0)) + 0
				var url = 'http://128.199.192.137:8000/v1/api/get_list_film/?page=' + page + '&count=7'
				self.$http.get(url).then(function (res) {
					self.film.listFilm = res.body.data.films
				})
			},
			setJS: function () {
				var self = this

				$("#index .navbar-top .search .searchResult").hide()
				$("#index .navbar-top .category .categoryResult").hide()

				$('#index .navbar-top .search input').focusin(function (event) {
					$("#index .navbar-top .search .searchResult").slideToggle()
					event.preventDefault()
				})
				$('#index .navbar-top .search input').focusout(function (event) {
					$("#index .navbar-top .search .searchResult").slideToggle()
					event.preventDefault()
				})
				$('#index .navbar-top .category button').focusin(function (event) {
					$("#index .navbar-top .category .categoryResult").slideToggle()
					event.preventDefault()
				})
				$('#index .navbar-top .category button').focusout(function (event) {
					$("#index .navbar-top .category .categoryResult").slideToggle()
					event.preventDefault()
				})

				$('#circleLoad').hide()

				$(window).resize(function () {
					self.getPosition()
				})
			},
			scrollTop: function () {
				$('body').animate(
					{ scrollTop: 0 },
					'slow'
				)
			},
			getPosition: function () {
				var self = this
				var listItem = $('#carousel .intro .item')
				var mid = Math.round(listItem.length / 2) - 1
				var positionMid = Math.round($(window).width() / 2) - 200

				$(listItem[mid]).css('left', positionMid)
				$(listItem[mid]).css('z-index', mid)
				$(listItem[mid]).css('transform', 'scale(1.2, 1.2)')

				var mmid = mid
				var i = 1
				while(mmid > 0) {
					mmid--
					i++
					$(listItem[mmid]).css('left', positionMid - (200 * i))
					$(listItem[mmid]).css('z-index', mid - i + 1)
					$(listItem[mmid]).css('transform', 'scale(0.8, 0.8)')
				}

				var mmid = mid
				var i = 1
				while(mmid < listItem.length) {
					mmid++
					i++
					$(listItem[mmid]).css('left', positionMid + (200 * i))
					$(listItem[mmid]).css('z-index', mid - i + 1)
					$(listItem[mmid]).css('transform', 'scale(0.8, 0.8)')
				}

				var mmid = mid - 1
				$(listItem[mmid]).css('left', positionMid - 250)
				$(listItem[mmid]).css('transform', 'scale(1, 1)')

				var mmid = mid + 1
				$(listItem[mmid]).css('left', positionMid + 250)
				$(listItem[mmid]).css('transform', 'scale(1, 1)')
			},
			prevItem: function () {
				var self = this
				var listItem = $('#carousel .intro .item')

				var left = $(listItem[0]).css('left')
				var zindex = $(listItem[0]).css('z-index')
				var transform = $(listItem[0]).css('transform')

				for (var i = 0; i < listItem.length - 1; i++) {
					$(listItem[i]).css('left', $(listItem[i + 1]).css('left'))
					$(listItem[i]).css('z-index', $(listItem[i + 1]).css('z-index'))
					$(listItem[i]).css('transform', $(listItem[i + 1]).css('transform'))
				}

				$(listItem[listItem.length - 1]).css('left', left)
				$(listItem[listItem.length - 1]).css('z-index', zindex)
				$(listItem[listItem.length - 1]).css('transform', transform)
			},
			nextItem: function () {
				var self = this
				var listItem = $('#carousel .intro .item')

				var left = $(listItem[listItem.length - 1]).css('left')
				var zindex = $(listItem[listItem.length - 1]).css('z-index')
				var transform = $(listItem[listItem.length - 1]).css('transform')

				for (var i = listItem.length - 1; i > 0; i--) {
					$(listItem[i]).css('left', $(listItem[i - 1]).css('left'))
					$(listItem[i]).css('z-index', $(listItem[i - 1]).css('z-index'))
					$(listItem[i]).css('transform', $(listItem[i - 1]).css('transform'))
				}

				$(listItem[0]).css('left', left)
				$(listItem[0]).css('z-index', zindex)
				$(listItem[0]).css('transform', transform)
			}
		}
	}
</script>