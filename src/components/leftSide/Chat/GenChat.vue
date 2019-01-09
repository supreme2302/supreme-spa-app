<template>
  <!--<div id="app">-->
    <!---->
  <!--</div>-->
  <div>
    <message/>
    <div class="kaka">
      <textarea placeholder="Wirte a message" class="kaka_70" v-model="content"></textarea>
      <v-btn @click="sendd" class="kaka_30">Send</v-btn>
      <!--<v-btn @click="connect">connect</v-btn>-->
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
      send () {
        if (this.content.length > 0) {
          this.$store.dispatch('sendMessage', this.content);
          // this.sendMessage(this.content);
          this.content = '';
        }
      },
      connect () {
        var pathname = document.location.pathname;
        ws = new WebSocket('ws://localhost:5002' + pathname);
        let sessionId = pathname.split('/')[2];
        ws.onmessage = function (event) {
          // var log = document.getElementById('log');
          console.log(event.data);
          var messages = JSON.parse(event.data);
          const curUserEmail = this.$store.getters.user.email;
          this.$store.dispatch('getMessage', {messages, sessionId, curUserEmail});
        }.bind(this);
      },
      sendd () {
        if (this.content.length > 0) {
          var content = this.content;
          const to = this.$store.getters.userCard.email;
          var json = JSON.stringify({
            'content': content,
            // 'from': from
            'recipient': to
          });

          ws.send(json);
          this.$store.dispatch('sendMessage', this.content);
          // this.sendMessage(this.content);
          this.content = '';
        }
      }
    }
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
