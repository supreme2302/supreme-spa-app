

const now = new Date();
export default {
  state: {
    // 当前用户
    user: {
      name: 'coffce',
      img: 'dist/images/1.jpg'
    },
    // 会话列表
    sessions: [
      {
        id: 1,
        user: {
          name: 'sosed',
          img: 'dist/images/2.png'
        },
        messages: [
          {
            content: 'Hello，iam id1',
            date: now
          }, {
            content: 'onemore id1',
            date: now,
            self: true
          }
        ]
      }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    // 发送消息
    SEND_MESSAGE (state, content) {
      state.sessions[0].messages.push({
        content: content,
        date: new Date(),
        self: true
      });
    },
    // 选择会话
    SELECT_SESSION (state, id) {
      state.currentSessionId = id;
    },
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    },
    GET_MESSAGE (state, content) {
      state.sessions[0].messages.push({
        content: content,
        date: new Date()
      });
    }
  },
  actions: {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    // sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content)
    sendMessage ({commit}, payload) {
      commit('SEND_MESSAGE', payload);
    },
    getMessage ({commit}, payload) {
      commit('GET_MESSAGE', payload);
    },
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
  },
  getters: {
    session: state => state.sessions[0],
    // user: state => state.user
  }
};
