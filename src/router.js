import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/index.vue'
import FilmCategory from './components/filmCategory.vue'
import FilmDetail from './components/filmDetail.vue'
import FilmSearch from './components/filmSearch.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			name: 'index',
			components: { Index },
			children: [
				{
					path: 'film-category/:categoryId',
					name: 'film-category',
					components: { FilmCategory }
				},
				{
					path: 'film-detail/:filmId',
					name: 'film-detail',
					components: { FilmDetail }
				},
				{
					path: 'film-search/:key',
					name: 'film-search',
					components: { FilmSearch }
				}
			]
		}
	]	
})