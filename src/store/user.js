import User from '../modules/userModel';
import router from '../router';

export default {
  state: {
    users: [
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '1'
      },
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '2'
      },
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '3'
      },
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '0'
      },
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '5'
      },
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
        id: '4'
      }
    ],
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    autoSignIn ({commit}, payload) {
      commit('setUser', payload);
    },
    signIn ({commit}, payload) {
      commit('renderPermission', false);
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      User.signIn(userData)
        .then(
          user => {
            commit('setUser', user);
            commit('renderPermission', true);
            commit('setLoading', false);
            router.push('/');
          }
        )
        .catch(
          error => {
            commit('renderPermission', true);
            commit('setLoading', false);
            commit('setError', error);
          }
        );
    },
    signUpUser ({commit}, payload) {
      commit('renderPermission', false);
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      User.signUp(userData)
        .then(
          user => {
            commit('setUser', user);
            commit('renderPermission', true);
            commit('setLoading', false);
            router.push('/');
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('renderPermission', true);
            commit('setLoading', false);
            commit('setError', error);
          }
        );
    },
    logoutUser ({commit}) {
      commit('renderPermission', false);
      User.logout()
        .then(
          () => {
            commit('setUser', null);
            commit('renderPermission', true);
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('renderPermission', true);
          }
        );
    }
  },
  getters: {
    users: state => state.users,
    user: state => state.user,
    isUserLoggedIn: state => state.user !== null
  }
};
