
export default {
  state: {
    renderPermission: false,
    loading: false,
    error: null
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
    }
  },
  getters: {
    renderPermission: state => state.renderPermission,
    loading: state => state.loading,
    error: state => state.error
  }
};
