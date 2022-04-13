import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueNumberFormat from 'vue-number-format'

Vue.use(VueNumberFormat, {prefix: 'Rp ', decimal: ',', thousand: '.', precision: 0})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
