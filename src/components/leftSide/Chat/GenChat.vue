<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <message/>
    <div class="kaka">
      <textarea placeholder="Wirte a message" class="kaka_70" v-model="content"></textarea>
      <v-btn @click="send" class="kaka_30">Send</v-btn>
    </div>
  </div>
</template>

<script>
  import Text from './text.vue';
  import Message from './message.vue';
  var ws;
  export default {
    created () {
      this.connect();
    },
    name: 'GenChat',
    components: {
      Text,
      Message
    },
    data () {
      return {
        content: ''
      };
    },
    methods: {
      connect () {
        const pathname = document.location.pathname;
        ws = new WebSocket('ws://localhost:5002' + pathname);
        let recipientId = pathname.split('/')[2];
        ws.onmessage = function (event) {
          console.log('on message  ');
          const messages = JSON.parse(event.data);
          console.log(messages.recipientImage);
          const senderId = this.$store.getters.user.id;
          this.$store.dispatch('getMessage', {messages, recipientId, senderId});
        }.bind(this);
      },
      send () {
        if (this.content.length > 0) {
          const content = this.content;
          let recipientId = document.location.pathname.split('/')[2];
          var json = JSON.stringify({
            'content': content,
            'recipientId': recipientId
          });
          ws.send(json);
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
