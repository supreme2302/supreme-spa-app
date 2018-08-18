<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8>
        <router-view name="leftWrap"/>
      </v-flex>
      <v-flex sm4 class="hidden-xs-only">
        <v-layout justify-center column>
          <v-card
            v-for="(user, i) in users"
            :key="i"
            hover
            class="kaka"
            :to="'/id/' + user.id"
          >
            <v-layout row>
              <v-flex xs3 md2>
                <v-card-media
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  height="45px"
                  class="round mb-1 mt-1 ml-1"
                />
              </v-flex>
              <v-flex xs9 md10>
                <v-card-text>
                  <strong v-html="user.username"></strong>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      row
      class="hidden-sm-and-up mtop"
    >
      <v-flex xs12>
        <v-layout justify-center column id="scrollDiv">
          <v-card
            v-for="(user, i) in users"
            :key="i"
            hover
            class="kaka"
            :to="'/id/' + user.id"
          >
            <v-layout row>
              <v-flex xs2>
                <v-card-media
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  height="45px"
                  class="round mb-1 mt-1 ml-3 pict-size"
                />
              </v-flex>
              <v-flex xs10>
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
      scroll () {
        window.addEventListener('scroll', () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            this.$store.dispatch('getNextPageOfList', this.$store.getters.page);
          }
        });
      }
    },
    mounted () {
      this.scroll();
      // const div = document.getElementById('scrollDiv');
      // this.scrollDiv(div);
    }
  };
</script>

<style scoped>
  .kaka:focus {
    background: gainsboro;
    transition: .5s;
  }
  .focus {
    background: gainsboro;
    transition: .5s;
  }
  .mtop {
    position: fixed;
    height: 250px;
    width: 88%;
    overflow-y: scroll; /* прокрутка по вертикали */
    margin-top: 253px;
  }
  @media (max-width: 350px) {
    .pict-size {
      margin-left: 0!important;
    }
  }

</style>
