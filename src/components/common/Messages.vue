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
          <v-flex xs4 sm3>
            <v-card-title>
              <!--<v-img-->
                <!--class="white&#45;&#45;text"-->
                <!--height="120px"-->
                <!--:src="imgSrc + '/' + user.image"-->
              <!--/>-->
            </v-card-title>
          </v-flex>
          <v-flex xs8 sm9>
            <v-card-title>
              <div>
                <span class="grey--text">{{ message.recipientImage }}</span><br>
                <span>{{ message.senderId }}</span><br>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
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
    },
    data() {
      return {
      }
    }
  };
</script>

<style scoped>

</style>
