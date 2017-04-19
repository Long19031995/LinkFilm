<template>
	<div id="index">
		<div class="navbar-top">
			<div style="float: left" class="logo">
			</div>
			<div class="search">
				<input @keyup="searchFilm()" v-model="search.key" type="search">
				<router-link to="/film-search">
					<i @click="getFilmSearch()" class="fa fa-search"></i>
				</router-link>
				<div class="searchResult">
					<u><b>Phim mới</b></u>
					<ul v-if="search.listSearchResult.length > 0">
						<li v-for="(film, index) in search.listSearchResult" @click="getFilmDetail(index)">
							<router-link to="/film-detail">
								{{film.title}}								
							</router-link>
						</li>
					</ul>
					<div v-else>...</div>
				</div>
			</div>
			<div class="category">
				<button>Thể loại</button>
				<div class="categoryResult">
					<ul>
						<li v-for="(category, index) in category.listCategory" @click="loadFilmByCategory(index)" v-if="category.name_category !== ''">
							<router-link to="/film-category">
								{{category.name_category}}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="carousel">
			<div class="intro">
				<div v-for="film in film.listFilm" class="item">
					<img :src="film.image" width="400" height="200">
				</div>
			</div>
			<div class="prev-next">
				<i @click="prevItem()" class="fa fa-chevron-left fa-3x prev"></i>
				<i @click="nextItem()" class="fa fa-chevron-right fa-3x next"></i>
			</div>
		</div>
		<div id="content">
			<router-view name="FilmCategory" :listFilm="film.listFilmByCategory" :idCategory="category.idCategory"></router-view>
			<router-view name="FilmDetail" :film="film.filmDetail"></router-view>
			<router-view name="FilmSearch" :listFilm="film.listFilmSearch" :keySearch="search.key"></router-view>
		</div>
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
			self.searchFilm()
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
					idCategory: ''
				},
				search: {
					listSearchResult: [],
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
				var url = 'http://139.59.116.17:8000/v1/api/search_film?q=' + self.search.key
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.search.listSearchResult = res.body.data
					}
				})
			},
			getListCategory: function () {
				var self = this
				var url = 'http://139.59.116.17:8000/v1/api/get_all_category/'
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.category.listCategory = res.body.data.category
					}
				})
			},
			loadFilmByCategory: function (index) {
				var self = this
				self.category.idCategory = self.category.listCategory[index].id
				var url = 'http://139.59.116.17:8000/v1/api/get_list_film?type_film=' + self.category.idCategory + '&page=0&count=8'
				self.$http.get(url).then(function (res) {
					if (res.body.meta.code === 'OK') {
						self.film.listFilmByCategory = res.body.data
					}
				})
			},
			getFilmDetail: function (index) {
				var self = this
				self.film.filmDetail = self.search.listSearchResult[index]
			},
			getFilmSearch: function () {
				var self = this
				var url = 'http://139.59.116.17:8000/v1/api/search_film?q=' + self.search.key +
						  '&page=0&&count=8'
				self.$http.get(url).then(function (res) {
					self.film.listFilmSearch = res.body.data
				})
			},
			getListFilm: function () {
				var self = this
				var url = 'http://139.59.116.17:8000/v1/api/get_list_film?type_film=70&page=0&count=10'
				self.$http.get(url).then(function (res) {
					self.film.listFilm = res.body.data
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