// libraries
import Vue from 'vue'
import Resource from 'vue-resource'

// javascripts
import router from './router.js'

// vue components
import App from './App.vue'

// use
Vue.use(Resource)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
	if (to.path === '/') {
		next({
			path: '/film-new'
		})
	}
	next()
})

new Vue({
	el: '#root',
	router: router,
	template: '<App></App>',
	components: { App }
})
