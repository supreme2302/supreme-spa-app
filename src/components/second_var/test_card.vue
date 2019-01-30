<!--suppress HtmlUnknownTag -->
<template>
  <v-card>
    <v-img
      :src="imgSrc"
      height="300px"
    >
      <v-layout
        column
        fill-height
      >
        <v-card-title>
          <v-btn dark icon
                 :to="'/test'"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn dark icon class="mr-3">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{userCard.username}}</div>
        </v-card-title>
      </v-layout>
    </v-img>

    <v-list two-line>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <!--<v-list-tile-title>(650) 555-1234</v-list-tile-title>-->
          <v-list-tile-title>{{userCard.phone}}</v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider inset></v-divider>

      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="indigo">mail</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{userCard.email}}</v-list-tile-title>
          <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>


      <v-divider inset></v-divider>

      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{userCard.skills}}</v-list-tile-title>
          <v-list-tile-sub-title>Skills</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider inset></v-divider>

      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{userCard.about}}</v-list-tile-title>
          <v-list-tile-sub-title>About</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <!--<v-text-field>-->
        <!--<p>{{userCard.about}}}</p>-->
        <!--<v-list-tile-sub-title>About</v-list-tile-sub-title>-->
      <!--</v-text-field>-->

    </v-list>
  </v-card>
</template>

<script>
  import conf from '../../modules/conf';
  import resizeCallback from '../../modules/util/resizeCallback.js';
  import computeSize from '../../modules/util/computeSize.js';
  export default {
    data () {
      return {};
    },
    methods: {
      resize () {
        // bus.emit('payloadForResize', {elements, displayStyle});
        window.addEventListener('resize', resizeCallback);
      },
    },
    computed: {
      userCard () {
        return this.$store.getters.userCard;
      },
      user () {
        return this.$store.getters.user;
      },
      imgSrc () {
        return conf.serverUrl + conf.userAPIMethods.userGava + '/' + this.$store.getters.userCard.email;
      }
    },
    beforeRouteUpdate (to, from, next) {
      const id = Number(to.params.id);
      this.$store.dispatch('openCard', {id, next});
    },
    mounted () {

      computeSize();
    },
    created () {
      this.resize();
    }
  };
</script>

<style scoped>
</style>
