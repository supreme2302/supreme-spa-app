
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
        id: '',
        user: {
          name: 'sosed',
          img: 'dist/images/2.png'
        },
        messages: [
          // {
          //   content: 'Hello，iam id1',
          //   date: now
          // }, {
          //   content: 'onemore id1',
          //   date: now,
          //   self: true
          // }
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
    GET_MESSAGE (state, {messages, sessionId, curUserEmail}) {
      let contains = false;
      let index = -1;
      for (let i = 0; i < state.sessions.length; ++i) {
        console.log('cycle  ', state.sessions[i].id);
        if (state.sessions[i].id === sessionId) {
          contains = true;
          index = i;
        }
      }
      console.log('cont   ', contains);
      if (!contains) {
        state.sessions.push({
          id: sessionId,
          user: {
            name: 'sosed',
            img: 'dist/images/2.png'
          },
          messages: []
        });
        for (let i = 0; i < state.sessions.length; ++i) {
          if (state.sessions[i].id === sessionId) {
            for (let j = 0; j < messages.length; ++j) {
              if (messages[j].sender === curUserEmail) {
                messages[j].self = true;
              }
              state.sessions[i].messages.push(messages[j]);
            }
          }
        }
      } else {
        for (let i = 0; i < messages.length; ++i) {
          if (messages[i].sender === curUserEmail) {
            messages[i].self = true;
            state.sessions[index].messages.push(messages[i]);
          }
        }
      }
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
    sessions: (state) => state.sessions
    // user: state => state.user
  }
};
