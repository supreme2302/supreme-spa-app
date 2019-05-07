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
import Ws from './modules/ws';
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
    const ws = new Ws();
    bus.on('connected', () => {
      this.$store.dispatch('renderPermission', false);
      User.auth()
        .then(
          user => {
            if (user) {
              // bus.on('connected', () => {
              this.$store.dispatch('autoSignIn', user);
              // });
            }
            this.$store.dispatch('renderPermission', true);
            bus.emit('onAuth', user);
          }
        );
      this.$store.dispatch('fetchUsers');
    });
  }
});

// todo можно пофиксить все гарды. уйти от bus

// todo проверить будет ли работать GET_MESSAGE без условия if при получении одного сообщения
// todo подумать над тем, чтобы соединение не открывалось без логина
