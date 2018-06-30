<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs8>
        <router-view name="leftWrap"/>
      </v-flex>
      <v-flex xs4>
        <v-layout justify-center column>
          <v-card
            v-for="(user, i) in users"
            :key="i"
            hover
            class="kaka"
            :to="'/id/' + user.id"
          >
            <v-layout row>
              <v-flex xs4 sm3 md2>
                <v-card-media
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  height="45px"
                  class="round mb-1 mt-1 ml-1"
                />
              </v-flex>
              <v-flex xs8 sm9 md10>
                <v-card-text>
                  <strong v-html="user.username"></strong>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      users () {
        return this.$store.getters.users;
      }
    },
    methods: {
      // onOpenCard (id) {
      //   this.$store.dispatch('openCard', id);
      // }
    }
  };
</script>

<style scoped>
  .kaka:focus {
    background: gainsboro;
    transition: .5s;
  }

</style>
