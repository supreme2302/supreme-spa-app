<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <template v-if="renderMessage">
      <message/>
    </template>
    <div class="kaka">
      <textarea placeholder="Wirte a message" class="kaka_70" v-model="content"></textarea>
      <v-btn @click="send" class="kaka_30">Send</v-btn>
    </div>
  </div>
</template>

<script>
  import Text from './text.vue';
  import Message from './message.vue';
  import Ws from '../../../modules/ws';
  import bus from '../../../modules/bus';
  export default {
    created () {
      this.connect();
      this.$store.commit('renderMessage', true);
    },
    beforeRouteUpdate (to, from, next) {
      const recipientId = to.params.id;
      const senderId = this.$store.getters.user.id;
      this.ws.send({class: 'GetMessagesRouteUpdate', senderId: senderId, recipientId: recipientId});
      this.$store.commit('renderMessage', false);
      bus.on('GetMessagesRouteUpdate', data => {
        console.log('GetMessagesRouteUpdate');
        const messages = data.payload.messages;
        console.log(messages);
        this.$store.dispatch('getMessageRouteUpdate', {messages, recipientId: recipientId, senderId})
          .then(() => {
            next();
            this.$store.commit('renderMessage', true);
          });
      });
    },
    name: 'GenChat',
    components: {
      Text,
      Message
    },
    data () {
      return {
        content: '',
        ws: new Ws()
      };
    },
    computed: {
      renderMessage () {
        return this.$store.getters.renderMessage;
      },
    },
    methods: {
      connect () {
        const senderId = this.$store.getters.user.id;
        bus.on('connected', data => {
          this.ws.send({class: 'GetMessages', senderId: senderId, recipientId: document.location.pathname.split('/')[2]});
          bus.on('GetMessages', data => {
            const messages = data.payload.messages;
            this.$store.dispatch('getMessage', {messages, recipientId: document.location.pathname.split('/')[2], senderId});
          });
          bus.on('ChatMessage', data => {
            const messages = data.payload;
            this.$store.dispatch('getMessage', {messages, recipientId: document.location.pathname.split('/')[2], senderId});
          });
        });
      },
      send () {
        if (this.content.length > 0) {
          const content = this.content;
          let recipientId = document.location.pathname.split('/')[2];
          this.ws.send({class: 'ChatMessage', content: content, recipientId: recipientId});
          const message = this.content;
          this.$store.dispatch('sendMessage', {recipientId, message});
          this.content = '';
        }
      }
    },
  };
</script>

<style lang="less" scoped>
  #app {
    margin: 20px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      width: 200px;
      color: #f4f4f4;
      background-color: #2e3238;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
    .kaka {
      width: 100%;
    }
    .kaka_30 {
      width: 20%;
      display: inline-block;
    }
    .kaka_70 {
      width: 70%;
      display: inline-block;
    }
    .message {
      height: 500px;
    }
  }
</style>
