import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import particles from "particles.vue";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(particles)

new Vue({
  render: h => h(App),
}).$mount('#app')
