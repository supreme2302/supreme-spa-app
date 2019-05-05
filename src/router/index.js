import Vue from 'vue';
import Router from 'vue-router';
import General from '../components/common/General.vue';
import UserPage from '../components/leftSide/UserPage.vue';
import Login from '../components/common/Login.vue';
import SignUp from '../components/common/SignUp.vue';
import Profile from '../components/common/Profile.vue';
import MainPage from '../components/leftSide/MainPage.vue';
import Chat from '../components/leftSide/Chat/GenChat.vue';
import Test from '../components/second_var/UserList.vue';
import TestCard from '../components/second_var/TestUserPage.vue';
import FullUserPage from '../components/second_var/FullUserPage.vue';
import Messages from '../components/common/Messages.vue';
import AuthGuardLoad from './auth-guard-load.js';
import AuthGuard from './auth-guard.js';
import AuthGuardFetch from './auth-guard-fetch.js';
import AuthGuardList from './auth-guard-list.js';
import AuthGuardFetchComments from './auth-guard-fetch-comments.js';
import AuthGuardChat from './auth-guard-chat.js';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      components: {
        bodyWrap: General
      },
      beforeEnter: AuthGuardFetch,
      children: [
        {
          path: '/id/:id',
          props: true,
          components: {
            leftWrap: UserPage
          },
          beforeEnter: AuthGuardLoad
        },
        {
          path: '',
          components: {
            leftWrap: MainPage
          }
        },
        {
          path: '/chat/:id',
          props: true,
          components: {
            leftWrap: Chat
          },
          beforeEnter: AuthGuardChat
        }
      ]
    },
    {
      path: '/test',
      components: {
        bodyWrap: Test
      },
      beforeEnter: AuthGuardList,
      children: [
        {
          path: '/test/idd/:id',
          props: true,
          components: {
            testWrap: TestCard
          },
          beforeEnter: AuthGuardLoad
        }
      ]
    },
    {
      path: '/test/:id',
      props: true,
      components: {
        bodyWrap: FullUserPage
      },
      beforeEnter: AuthGuardFetchComments
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
    },
    {
      path: '/messages',
      components: {
        bodyWrap: Messages
      },
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
});
