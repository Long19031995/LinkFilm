// libraries
import Vue from 'vue'
import Resource from 'vue-resource'

// javascripts
import router from './router.js'

// vue components
import App from './app.vue'

// use
Vue.use(Resource)

Vue.config.productionTip = false

new Vue({
	el: '#root',
	router: router,
	template: '<app></app>',
	components: { App }
})
