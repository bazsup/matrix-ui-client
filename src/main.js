import Vue from 'vue'
// import App from './App.vue'
import MatrixUi from '@/MatrixUi.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(MatrixUi),
}).$mount('#app')
