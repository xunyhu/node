// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from '../../../common/js/rem'
import { post, get } from './utils/http'

Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
