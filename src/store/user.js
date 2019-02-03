import User from '../modules/userModel';
import router from '../router';

export default {
  state: {
    users: [],
    user: null,
    userCard: null,
    page: 1
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setConcatList (state, list) {
      state.users = state.users.concat(list);
    },
    setList(state, list) {
      state.users = list;
    },
    addInList (state, user) {
      state.users.push(user);
    },
    setUserCard (state, userCard) {
      state.userCard = userCard;
    },
    nextPage (state, page) {
      state.page = page;
    }
  },
  actions: {
    openCard ({commit}, payload) {
      const id = payload.id;
      commit('clearError');
      const userId = JSON.stringify(id);
      User.getCard(userId, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                commit('setError', resErr.message);
              }
            );
        } else {
          resp.then(
            userData => {
              payload.next();
              commit('setUserCard', userData);
            }
          );
        }
      });
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload);
    },
    async signIn ({commit}, payload) {
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
        if (!err) {
          resp.then(
            map => {
              console.log(map);
              Object.values(map).forEach((value, i) => {
                if (i === 0) {
                  commit('nextPage', value);
                } else {
                  commit('setList', value);
                }
              });
            }
          );
        }
      });
    },
    getNextPageOfList ({commit}, page) {
      User.fetchUsers(page, (err, resp) => {
        if (!err) {
          resp.then(
            map => {
              Object.values(map).forEach((value, i) => {
                if (i === 0) {
                  commit('nextPage', value);
                } else {
                  commit('setConcatList', value);
                }
              });
            }
          );
        }
      });
    },

    changeAva ({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      // const userData = JSON.stringify(payload);
      const formData = new FormData();
      formData.append('image', payload);
      User.changeAva(formData)
        .then(
          () => {
            commit('setLoading', false);
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('setLoading', false);
            commit('setError', error);
          }
        );
    },
    changeProfile ({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      console.log('json:  ', userData);
      User.changeProfile(userData)
        .then(
          user => {
            commit('setUser', user);
            commit('setLoading', false);
            // commit('addInList', user);
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('setLoading', false);
            commit('setError', error);
          }
        );
    },
    sendSkillFilter ({commit}, {page, params}) {
      commit('clearError');
      commit('setLoading', true);
      User.sendSkillFilter(1, params, (err, resp) => {
        if (!err) {
          console.log('filter');
          resp.then(
            map => {
              Object.values(map).forEach((value, i) => {
                console.log('filter  ', i);
                if (i === 0) {
                  commit('nextPage', value);
                } else {
                  commit('setList', value);
                }
              });
            }
          );
        }
      });
    }
  },
  getters: {
    users: state => state.users,
    user: state => state.user,
    isUserLoggedIn: state => state.user !== null,
    userCard: state => state.userCard,
    page: state => state.page
  }
};
