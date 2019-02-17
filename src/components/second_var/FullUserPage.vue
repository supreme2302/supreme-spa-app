<!--suppress ALL -->
<template>
  <div>
    <v-layout class="mt-5">
      <v-flex xs12 md3 offset-md1>
        <v-card flat>
          <v-card-media
            :src="img"
            height="250px"
          ></v-card-media>
          <v-card-title primary-title class="pb-0">
            <div>
              <p class="text--primary">Rating: </p>
            <!--</div>-->
            <!--<div>-->
              <p class="text--primary">Username: </p>
              <p class="text--primary">Email: </p>
              <p class="text--primary">Phone: </p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <v-card>
          <v-card-text>
            <div>Skills</div>
            <div>Genres</div>
            <div>About</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 offset-md1 class="mt-3">
        <v-card v-if="isUserLoggedIn">
          <v-card-text @keyup.enter="onSubmit" class="pb-0">
            <v-form ref="form" validate v-model="valid">
              <v-textarea
                name="feedback"
                label="Feedback"
                value=""
                auto-grow
                rows="1"
                hide-details
                solo
                flat
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-rating
              v-model="rating"
              length="5"
              hover
              color="red lighten-3"
              background-color="grey lighten-1"
            ></v-rating>
            <v-spacer></v-spacer>
            <v-btn
              color="grey darken-4 hover"
              :disabled="!valid || loading"
              @click="onSubmit"
              :loading="loading"
            >
              <span class="btn-color">Send</span>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-for="(user, i) in users"
          :key="i"
          class="mt-2"
        >
          <v-layout>
            <v-flex xs4 sm3>
              <v-card-title>
                <v-img
                  class="white--text"
                  height="120px"
                  :src="imgSrc + '/' + user.email"></v-img>
              </v-card-title>
            </v-flex>
            <v-flex xs8 sm9>
              <v-card-title>
                <div>
                  <v-rating
                    value="4"
                    length="5"
                    readonly
                    color="red lighten-3"
                    background-color="grey lighten-1"
                  ></v-rating>
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
    </v-layout>
  </div>

</template>

<script>
  import route from '../../modules/conf';
  export default {
    data () {
      return {
        rating: 0,
        img: 'http://www.setwalls.ru/pic/201312/1280x800/setwalls.ru-64687.jpg',
        imgSrc: route.serverUrl + route.userAPIMethods.userGava,
      };
    },
    computed: {
      users () {
        return this.$store.getters.users;
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
    }
  };
</script>

<style scoped>

</style>
