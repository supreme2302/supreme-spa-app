<!--suppress ALL -->

<template>
  <v-layout row>
    <v-flex sm2 fixed-2 class="my-hidden" id="checkbox">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <span> Skills </span>
        </v-card-title>
        <v-divider/>
        <v-card-text class="pt-0">
          <v-checkbox v-model="selected" @change="sendSkill" label="Guitar" value="Guitar"></v-checkbox>
          <v-checkbox v-model="selected" @change="sendSkill" label="Drums" value="Drums"></v-checkbox>
          <v-checkbox v-model="selected" @change="sendSkill" label="Piano" value="Piano"></v-checkbox>
        </v-card-text>
        <br>
        <v-card-title primary-title class="pb-0">
          <span> Hello </span>
        </v-card-title>
        <v-divider/>
        <v-card-text class="pt-0">
          <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
          <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md4 offset-md2 class="my-hidden">
      <v-card
        hover
        v-for="(user, i) in users"
        :key="i"
        :to="'/test/idd/' + user.id"
      >
        <v-layout>
          <v-flex xs4 sm3>
            <v-card-title>
              <v-img
                class="white--text"
                height="120px"
                :src="imgSrc + '/' + user.email"/>
            </v-card-title>
          </v-flex>
          <v-flex xs8 sm9>
            <v-card-title>
              <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
              </div>
            </v-card-title>
            <!--<v-card-actions>-->
              <!--<v-btn flat color="orange">Share</v-btn>-->
              <!--<v-btn flat color="orange">Explore</v-btn>-->
            <!--</v-card-actions>-->
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex fixed xs12>
      <router-view name="testWrap"/>
    </v-flex>

  </v-layout>
</template>

<script>
  import route from '../../modules/conf';
  import resizeCallback from '../../modules/util/resizeCallback.js';
  import computeSize from '../../modules/util/computeSize.js';
  export default {
    data () {
      return {
        imgSrc: route.serverUrl + route.userAPIMethods.userGava,
        selected: ['']
      }
    },
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
      },
      sendSkill () {
        console.log('skilss:  ', this.selected);
        let params = '?';
        for (let i = 0; i < this.selected.length; ++i) {
          if (this.selected[i] === '') continue;
          const and = (i === 0) ? '' : '&';
          params += and + 'skill=' + this.selected[i];
        }
        const page = this.$store.getters.page;
        this.$store.dispatch('sendSkillFilter', {page, params});
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path === '/test') {
        window.removeEventListener('resize', resizeCallback);
        const elements = document.getElementsByClassName('my-hidden');
        for (let i = 0; i < elements.length; ++i) {
          elements[i].style.display = '';
        }
        if (window.innerWidth <= 400) {
          const checkbox = document.getElementById('checkbox');
          checkbox.style.display = 'none';
        }
      }
      next();
    },
    mounted () {
      this.scroll();
      const checkbox = document.getElementById('checkbox');
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 400) {
          checkbox.style.display = 'none';
        } else {
          checkbox.style.display = '';
        }
      });
    }
  };
</script>

<style scoped>
  .fixed {
    position: fixed;
    right: 0;
    width: 49%;
  }
  .fixed-2 {
    position: fixed;
    left: 0;
    width: 16%;
  }
  @media(max-width: 960px) {
    .fixed {
      /*position: relative;*/
      /*right: 0;*/
      width: 100%;
    }
    .fixed-2 {
      position: relative;
    }
  }
  @media (max-width: 826px) {
    .fixed-2 {
      width: 130px;
    }
  }
</style>
