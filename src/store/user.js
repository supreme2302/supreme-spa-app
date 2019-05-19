import User from '../modules/userModel';
import router from '../router';
import http from '../modules/http';
import Ws from '../modules/ws';
import bus from '../modules/bus';

export default {
  state: {
    users: [],
    user: null,
    userCard: null,
    page: 1,
    img: null,
    comments: [],
    allMessages: []
  },
  mutations: {
    setAllMessages (state, messages) {
      state.allMessages = messages;
    },
    setUser (state, user) {
      const ws = new Ws();
      state.user = user;
    },
    setConcatList (state, list) {
      state.users = state.users.concat(list);
    },
    setList (state, list) {
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
    },
    setImg (state, img) {
      console.log('setImg   ', img);
      state.img = img;
    },
    setComment (state, comments) {
      state.comments = comments;
    },
    addComment (state, comment) {
      state.comments.push(comment);
    }
  },
  actions: {
    loadImg ({commit}, payload) {
      User.loadImg(payload, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                commit('setError', resErr.message);
              }
            );
        } else {
          resp.then(
            img => {
              commit('setImg', img);
            }
          );
        }
      });
    },

    setImg ({commit}, payload) {
      commit('setImg', payload);
    },
    openCard ({commit}, id) {
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
            location.reload();
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
            location.reload();
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
    changeAva ({commit}, {img, id}) {
      commit('clearError');
      commit('setLoading', true);
      // const userData = JSON.stringify(payload);
      const formData = new FormData();
      formData.append('image', img);
      formData.append('id', id);
      User.changeAva(formData)
        .then(
          user => {
            console.log('changeee ava  ', user);
            commit('setLoading', false);
            commit('setUser', user);
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
    getNextPageOfList ({commit}, {page, params}) {
      commit('clearError');
      commit('setLoading', true);
      User.sendSkillFilter(page, params, (err, resp) => {
        if (!err) {
          resp.then(
            map => {
              Object.values(map).forEach((value, i) => {
                if (i === 0) {
                  commit('nextPage', value);
                } else {
                  commit('setConcatList', value);
                }
                commit('setLoading', false);
              });
            }
          );
        }
      });
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
                commit('setLoading', false);
              });
            }
          );
        }
      });
    },

    getCommentsOfUser ({commit}, {id, next}) {
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(id);
      User.getCommentsAboutUser(userData, (err, resp) => {
        if (!err) {
          resp.then(
            comments => {
              commit('setComment', comments);
              commit('setLoading', false);
              next();
            }
          );
        } else {
          console.log('getCommentsOfUserERROR __ ', err);
          commit('setLoading', false);
          next();
        }
      });
    },

    sendComment ({commit}, payload) {
      console.log('sendComment');
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      User.sendComment(userData)
        .then(
          () => {
            commit('addComment', payload);
            commit('renderPermission', true);
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

    loadAllMessages ({commit}, payload) {
      console.log('loadAllMessages');
      commit('clearError');
      commit('setLoading', true);
      const userData = JSON.stringify(payload);
      User.getAllMessages(userData, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                commit('setError', resErr.message);
                commit('setLoading', false);
              }
            );
        } else {
          resp.then(
            userData => {
              commit('setAllMessages', userData);
              commit('setLoading', false);
            }
          );
        }
      });
    },
    signUpTest ({ commit }, payload) {
      console.log('signup action');
      const userData = JSON.stringify(payload);
      http.post('http://178.128.138.0:8090/admin/register', userData, (err, resp) => {
        console.log('register done');
        if (err) {
          console.log(err);
        } else {
          console.log(resp);
          http.get('http://178.128.138.0:8090/admin/info', (er, res) => {
            console.log('info done');
            if (er) {
              console.log(er);
            }
            console.log(res);
          });
        }
      });
    }
  },
  getters: {
    users: state => state.users,
    user: state => state.user,
    isUserLoggedIn: state => state.user !== null,
    userCard: state => state.userCard,
    page: state => state.page,
    img: state => state.img,
    comments: state => state.comments,
    allMessages: state => state.allMessages
  }
};
