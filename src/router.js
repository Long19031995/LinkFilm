import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index.vue'
import FilmCategory from '@/components/filmCategory.vue'
import FilmDetail from '@/components/filmDetail.vue'
import FilmSearch from '@/components/filmSearch.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			components: { Index },
			children: [
				{
					path: 'film-category',
					components: { FilmCategory }
				},
				{
					path: 'film-detail',
					components: { FilmDetail }
				},
				{
					path: 'film-search',
					components: { FilmSearch }
				}
			]
		}
	]	
})