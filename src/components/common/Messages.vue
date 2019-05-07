<!--suppress ALL -->
<template>
  <v-layout row>
    <v-flex xs12>
      <v-card
        hover
        v-for="(message, i) in messages"
        :key="i"
        :to="'/chat/' + message.senderId"
      >
        <v-layout>
          <v-flex xs1>
            <v-card-title>
              <v-img
                class="white--text"
                height="70px"
                :src="imgSrc + '/' + message.recipientImage"
              />
            </v-card-title>
          </v-flex>
          <v-flex xs8 sm9>
            <v-card-title>
              <div>
                <span class="grey--text">{{ message.senderEmail }}</span><br>
                <span>{{ message.content }}</span><br>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import route from '../../modules/conf';
  export default {
    data () {
      return {
        imgSrc: route.serverUrl + route.userAPIMethods.mediaGava,
      }
    },
    created() {
      this.$store.dispatch('loadAllMessages', this.user.id);
    },
    computed: {
      messages() {
        return this.$store.getters.allMessages;
      },
      user() {
        return this.$store.getters.user;
      }
    }
  };
</script>

<style scoped>

</style>
