import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes,faPlusCircle,faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes)
library.add(faPlusCircle)
library.add(faImage)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
  })
  .$mount('#app')
