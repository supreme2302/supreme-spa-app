<template>
  <div>
    <v-card
      class="elevation-10 mb3 test hidden-xs-only"
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
    <v-card
      class="elevation-10 hidden-sm-and-up test"
      height="250px"
    >
      <v-layout row>
        <v-flex xs3 class="mt-4 ml-3">
          <v-card-media
            src="http://hotwalls.ru/thumbnails/lg/goluboglazaya_blondinka_v_svitere.jpg"
            height="170px"
          />
        </v-flex>
        <v-flex xs9 class="mt-1">
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
  </div>


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
  @media (max-width: 1100px) {
    .test {
      width: 64.5%;
    }
  }
  @media (max-width: 959px) {
    .test {
      width: 64.3%;
    }
  }
  @media (max-width: 900px) {
    .test {
      width: 64%;
    }
  }
  @media (max-width: 817px) {
    .test {
      width: 64%;
    }
  }
  @media (max-width: 740px) {
    .test {
      width: 63.5%;
    }
  }
  @media (max-width: 670px) {
    .test {
      width: 63%;
    }
  }
  @media (max-width: 599px) {
    .test {
      width: 92%;
    }
  }
  @media (max-width: 350px) {
    .test {
      width: 88%;
    }
  }
</style>
