<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs8>
        <router-view name="leftWrap"/>
      </v-flex>
      <v-flex xs4>
        <v-layout justify-center column>
          <v-card
            v-for="(message, i) in messages"
            :key="i"
            hover
            class="kaka"
            :to="'/' + i"
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
                  <strong v-html="message.name"></strong>
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
    data () {
      return {
        messages: [
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },{
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            color: 'red',
            icon: 'people',
            name: 'Social',
            new: 1,
            total: 3,
            title: 'Twitter'
          },
          {
            color: 'teal',
            icon: 'local_offer',
            name: 'Promos',
            new: 2,
            total: 4,
            title: 'Shop your way',
            exceprt: 'New deals available, Join Today'
          }
        ]
      };
    }
  };
</script>

<style scoped>
  .kaka:focus {
    background: gainsboro;
    transition: .5s;
  }
</style>
