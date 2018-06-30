import Vue from 'vue';
import Router from 'vue-router';
import General from '../components/common/General.vue';
import UserPage from '../components/leftSide/UserPage.vue';
import Login from '../components/common/Login.vue';
import SignUp from '../components/common/SignUp.vue';
import Profile from '../components/common/Profile.vue';
import AuthGuard from './auth-guard.js';
import AuthGuardLoad from './auth-guard-load.js';
// import AuthGuardBeforeLogin from './auth-guard-before-login.js';
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
          },
          beforeEnter: AuthGuardLoad
        }
      ]
    },
    {
      path: '/auth',
      components: {
        bodyWrap: Login
      }
      // beforeEnter: AuthGuardBeforeLogin
    },
    {
      path: '/signup',
      components: {
        bodyWrap: SignUp
      }
      // beforeEnter: AuthGuardBeforeLogin
    },
    {
      path: '/profile',
      components: {
        bodyWrap: Profile
      },
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
});
