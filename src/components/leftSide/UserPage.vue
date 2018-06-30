<template>
  <v-card
    class="elevation-10 mb3 test"
    height="500px"
  >
    <v-layout row>
      <v-flex xs3 class="mt-5 ml-3">
        <v-card-media
          src="http://hotwalls.ru/thumbnails/lg/goluboglazaya_blondinka_v_svitere.jpg"
          height="200px"
        />
      </v-flex>
      <v-flex xs9 class="mt-4">
        <v-card-text>
          <h2 class="text--primary">{{userCard.username}}</h2>
          <v-divider/>
          <p>E-mail: {{userCard.email}}</p>
          <v-divider/>
          <p>Phone: {{userCard.phone}}</p>
          <v-divider/>
          <p>Skills: {{userCard.skills}}</p>
          <v-divider/>
          <p>About: {{userCard.about}}</p>
          <v-divider/>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    computed: {
      userCard () {
        return this.$store.getters.userCard;
      }
    },
    beforeRouteUpdate (to, from, next) {
      const id = Number(to.params.id);
      this.$store.dispatch('openCard', {id, next});
    }
  };
</script>

<style scoped>
  .test {
    position: fixed;
    width: 65%;
  }
</style>
