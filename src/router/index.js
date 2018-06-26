import Vue from 'vue';
import Router from 'vue-router';
import General from '../components/common/General.vue';
import UserPage from '../components/leftSide/UserPage.vue';
import Login from '../components/common/Login.vue';
import SignUp from '../components/common/SignUp.vue';
import Profile from '../components/common/Profile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      components: {
        bodyWrap: General
      },
      children: [
        {
          path: '/id/:id',
          props: true,
          components: {
            leftWrap: UserPage
          }
        }
      ]
    },
    {
      path: '/auth',
      components: {
        bodyWrap: Login
      }
    },
    {
      path: '/signup',
      components: {
        bodyWrap: SignUp
      }
    },
    {
      path: '/profile',
      components: {
        bodyWrap: Profile
      }
    }
  ],
  mode: 'history'
});
