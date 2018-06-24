import Vue from 'vue';
import Router from 'vue-router';
import General from '../components/General.vue';
import UserPage from '../components/UserPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        bodyWrap: General
      },
      children: [
        {
          path: '/:id',
          props: true,
          components: {
            leftWrap: UserPage
          }
        }
      ]
    }
  ],
  mode: 'history'
});
