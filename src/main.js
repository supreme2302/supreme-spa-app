// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import User from './modules/userModel';
import bus from './modules/bus';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(Vuetify, axios, VueAxios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  created () {
    this.$store.dispatch('renderPermission', false);
    User.auth()
      .then(
        user => {
          if (user) {
            this.$store.dispatch('autoSignIn', user);
            // bus.emit('onAuth', user);
          }
          this.$store.dispatch('renderPermission', true);
          bus.emit('onAuth', user);
        }
      );
    this.$store.dispatch('fetchUsers');
  }
});
// todo open card backend onpage
// todo не обновляются на горячую картинки в списке
// todo на бэке добавить обновление скила (delete insert)
// todo если обновить страницу на чате, то юзеркард 0
// todo не конкатить в список сообщений, а присваивать
