import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
// Assign the delete key alias to only target the delete keyboard button (by default it also targets backspace button)
Vue.config.keyCodes.delete = 46;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
