import Vue from 'vue';
import Vuex from 'vuex';
import user from './user.js';
import common from './common.js';
import chat from './chat.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    common,
    chat
  },
});
