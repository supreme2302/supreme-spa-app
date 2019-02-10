import User from '../modules/userModel';

export default {
  state: {
    renderPermission: false,
    loading: false,
    error: null,
    skills: [],
    genres: []
  },
  mutations: {
    renderPermission (state, permission) {
      state.renderPermission = permission;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    },
    setSkills (state, payload) {
      state.skills = payload;
    },
    setGenres (state, payload) {
      state.genres = payload;
    }
  },
  actions: {
    renderPermission ({commit}, payload) {
      commit('renderPermission', payload);
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload);
    },
    setError ({commit}, payload) {
      commit('setError', payload);
    },
    clearError ({commit}) {
      commit('clearError');
    },
    getAllSkills ({commit}) {
      console.log('getAllskills');
      commit('clearError');
      commit('setLoading', true);
      User.getAllSkills((err, resp) => {
        if (err) {
          commit('setLoading', false);
          commit('setError', err);
        } else {
          resp
            .then(skills => {
              commit('setLoading', false);
              console.log('skills_common:  ', skills);
              commit('setSkills', skills);
            });
        }
      });
    },
    getAllGenres ({commit}) {
      console.log('getAllGenres');
      commit('clearError');
      commit('setLoading', true);
      User.getAllGenres((err, resp) => {
        if (err) {
          commit('setLoading', false);
          commit('setError', err);
        } else {
          resp
            .then(genres => {
              commit('setLoading', false);
              commit('setGenres', genres);
            });
        }
      });
    }
  },
  getters: {
    renderPermission: state => state.renderPermission,
    loading: state => state.loading,
    error: state => state.error,
    skills: state => state.skills,
    genres: state => state.genres
  }
};
