<!--suppress ALL -->

<template>
  <v-layout row>
    <v-flex xs2 fixed-2 class="my-hidden" id="checkbox">
      <v-card>
        <v-card-title primary-title class="pb-0">
          <span> Skills </span>
        </v-card-title>
        <v-divider/>
        <v-card-text class="pt-0">
          <v-checkbox
            hide-details
            v-for="(skill, i) in skills"
            :key="i"
            v-model="selectedSkills"
            @change="sendSkill"
            :label="skill.toString()"
            :value="skill"></v-checkbox>
        </v-card-text>
        <v-card-title primary-title class="pb-0">
          <span> Genres </span>
        </v-card-title>
        <v-divider/>
        <v-card-text class="pt-0">
          <v-checkbox
            hide-details
            v-for="(genre, i) in genres"
            :key="i"
            @change="sendSkill"
            v-model="selectedGenres"
            :label="genre.toString()"
            :value="genre"></v-checkbox>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs10 md4 offset-sm2 my-list class="my-hidden">
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
                :src="imgSrc + '/' + user.image"></v-img>
            </v-card-title>
          </v-flex>
          <v-flex xs8 sm9>
            <v-card-title>
              <div>
                <span class="grey--text">{{ user.username }}</span><br>
                <span>{{ user.about }}</span>
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
        imgSrc: route.serverUrl + route.userAPIMethods.mediaGava,
        selectedSkills: [''],
        selectedGenres: [''],
      }
    },
    computed: {
      users () {
        console.log('users ', this.$store.getters.users);
        return this.$store.getters.users;
      },

      skills () {
        return this.$store.getters.skills;
      },

      genres () {
        return this.$store.getters.genres;
      },
    },
    methods: {
      scroll () {
        window.addEventListener('scroll', () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            let params = '?';
            let existSkills = false;
            for (let i = 0; i < this.selectedSkills.length; ++i) {
              if (this.selectedSkills[i] === '') continue;
              const and = (i === 0) ? '' : '&';
              params += and + 'skill=' + this.selectedSkills[i];
            }
            params += existSkills ? '&' : '';
            for (let i = 0; i < this.selectedGenres.length; ++i) {
              if (this.selectedGenres[i] === '') continue;
              const and = (i === 0) ? '' : '&';
              params += and + 'genre=' + this.selectedGenres[i];
            }
            const page = this.$store.getters.page;
            this.$store.dispatch('getNextPageOfList', {page, params});
          }
        });
      },
      sendSkill () {
        console.log('skilss:  ', this.selectedSkills);
        let params = '?';
        let existSkills = false;
        for (let i = 0; i < this.selectedSkills.length; ++i) {
          if (this.selectedSkills[i] === '') continue;
          const and = (i === 0) ? '' : '&';
          params += and + 'skill=' + this.selectedSkills[i];
        }
        params += existSkills ? '&' : '';
        for (let i = 0; i < this.selectedGenres.length; ++i) {
          if (this.selectedGenres[i] === '') continue;
          const and = (i === 0) ? '' : '&';
          params += and + 'genre=' + this.selectedGenres[i];
        }
        const page = this.$store.getters.page;
        this.$store.dispatch('sendSkillFilter', {page, params});
      },

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
      this.$store.dispatch('fetchUsers');
      console.log('test-list mounted');
      this.scroll();
      // this.deleteDivByClassName('v-messages');
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
      /*position: relative;*/
    }
  }
  @media (max-width: 826px) {
    .fixed-2 {
      max-width: 130px!important;
      width: 130px!important;
    }
    .my-list {
      margin-left: 130px;
    }
  }
  @media (max-width: 400px) {
    .my-list {
      margin-left: 0!important;
      width: 100% !important;
      max-width: 100%!important;
      flex-grow: 1!important;
    }
  }
</style>
