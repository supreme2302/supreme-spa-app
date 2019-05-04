<!--suppress ALL -->
<template>
  <div>
    <v-layout class="mt-5">
      <v-flex xs12 md3 offset-md1>
        <v-card flat>
          <v-card-media
            :src="imgSrc + '/' + userCard.image"
            height="255px"
          />
          <v-card-action>
            <v-btn
              block
              color="grey darken-4 hover"
              dark
              :to="'/chat/' + userCard.id"
            >Write a message</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <v-card>
          <v-card-text>
            <p>Rating: {{userCard.rating}}</p>
            <v-divider ></v-divider>
            <p>Username: {{userCard.username}}</p>
            <v-divider ></v-divider>
            <p>Email: {{userCard.email}}</p>
            <v-divider ></v-divider>
            <p>Phone: {{userCard.phone}}</p>
            <v-divider ></v-divider>
            <p>Skills: {{userCard.skills | arrayFilter}}</p>
            <v-divider ></v-divider>
            <p>Genres: {{userCard.genres | arrayFilter}}</p>
            <v-divider></v-divider>
            <p>About: {{userCard.about}}</p>
            <v-divider></v-divider>
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
                v-model="commentVal"
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
              @click="onSubmit"
            >
              <span style="color: #fff">Send</span>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-for="(comment, i) in comments"
          :key="i"
          class="mt-2"
        >
          <v-layout>
            <v-flex xs4 sm3>
              <v-card-title>
                <v-img
                  class="white--text"
                  height="120px"
                  :src="imgSrc + '/' + comment.fromImage"></v-img>
              </v-card-title>
            </v-flex>
            <v-flex xs8 sm9>
              <v-card-title>
                <div>
                  <v-rating
                    :value="comment.rating"
                    length="5"
                    readonly
                    color="red lighten-3"
                    background-color="grey lighten-1"
                  ></v-rating>
                  <span>{{comment.fromUsername}}</span><br>
                  <span>{{comment.commentVal}}</span>
                </div>
              </v-card-title>
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
        imgSrc: route.serverUrl + route.userAPIMethods.mediaGava,
        commentVal: ''
      };
    },
    filters: {
      arrayFilter (data) {
        let str = '';
        for (let i = 0; i < data.length; ++i) {
          str += data[i];
          if (i !== data.length - 1) {
            str += ', ';
          }
        }
        return str;
      }
    },
    computed: {
      userCard() {
        return this.$store.getters.userCard;
      },
      comments() {
        return this.$store.getters.comments;
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
    },
    methods: {
      onSubmit () {
        if (this.commentVal !== '') {
          const data = {
            commentVal: this.commentVal,
            fromEmail: this.$store.getters.user.email,
            rating: this.rating,
            fromUsername: this.$store.getters.user.username,
            toUserId: this.userCard.id,
            fromImage: this.$store.getters.user.image
          };
          this.$store.dispatch('sendComment', data);
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
      const id = Number(to.params.id);
      this.$store.dispatch('openCard', {id, next});
      store.dispatch('getCommentsOfUser', {id, next});
    }
  };
</script>

<style scoped>

</style>
