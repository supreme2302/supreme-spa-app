import User from '../modules/userModel';
import router from '../router';

export default {
  state: {
    users: [],
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setList (state, list) {
      state.users = list;
    },
    addInList (state, user) {
      state.users.push(user);
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
    },
    fetchUsers ({commit}) {
      User.fetchUsers(1, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                commit('setError', resErr.message);
              }
            );
        } else {
          resp.then(
            list => {
              commit('setList', list);
            }
          );
        }
      });
    },

    changeProfile ({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      User.changeProfile(userData)
        .then(
          user => {
            commit('setUser', user);
            commit('setLoading', false);
            commit('addInList', user);
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('setLoading', false);
            commit('setError', error);
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
