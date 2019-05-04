import route from '../modules/conf';
import store from '../store';
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
        ]
      }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: '',
    renderMessage: false
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },

    SEND_MESSAGE (state, {recipientId, message}) {
      console.log('SEND_MESSAGE');
      for (let i = 0; i < state.sessions.length; ++i) {
        if (state.sessions[i].id === recipientId) {
          state.sessions[i].messages.push({
            content: message,
            self: true,
            date: now
          });
        }
      }
    },
    // 选择会话
    SELECT_SESSION (state, id) {
      state.currentSessionId = id;
    },
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    },

    renderMessage (state, payload) {
      state.renderMessage = payload;
    },

    getMessageRouteUpdate (state, {messages, recipientId, senderId}) {
      state.sessions = [];
      state.sessions.push({
        id: recipientId,
        user: {
          name: 'sosed',
          img: route.serverUrl + route.userAPIMethods.mediaGava + '/'
        },
        messages: []
      });
      for (let i = 0; i < state.sessions.length; ++i) {
        if (state.sessions[i].id === recipientId) {
          for (let j = 0; j < messages.length; ++j) {
            if (messages[j].senderId === senderId) {
              messages[j].self = true;
            }
            state.sessions[i].user.img = route.serverUrl + route.userAPIMethods.mediaGava + '/' + messages[j].recipientImage;
            state.sessions[i].messages.push(messages[j]);
          }
        }
      }
    },

    GET_MESSAGE (state, {messages, recipientId, senderId}) {
      let contains = false;
      let index = -1;
      for (let i = 0; i < state.sessions.length; ++i) {
        console.log('cycle  ', state.sessions[i].id);
        if (state.sessions[i].id === recipientId) {
          contains = true;
          index = i;
        }
      }
      if (!contains) {
        state.sessions.push({
          id: recipientId,
          user: {
            name: 'sosed',
            img: route.serverUrl + route.userAPIMethods.mediaGava + '/'
          },
          messages: []
        });
        for (let i = 0; i < state.sessions.length; ++i) {
          if (state.sessions[i].id === recipientId) {
            for (let j = 0; j < messages.length; ++j) {
              if (messages[j].senderId === senderId) {
                messages[j].self = true;
              }
              state.sessions[i].user.img = route.serverUrl + route.userAPIMethods.mediaGava + '/' + messages[j].recipientImage;
              state.sessions[i].messages.push(messages[j]);
            }
          }
        }
      } else {
        state.sessions[index].messages.push(messages);
        state.sessions[index].user.img = route.serverUrl + route.userAPIMethods.mediaGava + '/' + messages.recipientImage;
      }
    }
  },
  actions: {
    getMessageRouteUpdate ({commit}, payload) {
      commit('getMessageRouteUpdate', payload);
    },
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
    sessions: (state) => state.sessions,
    renderMessage: state => state.renderMessage,
    // user: state => state.user
  }
};
