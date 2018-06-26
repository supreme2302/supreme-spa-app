<template>
  <v-app>
    <!--Navigation drawer-->
      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
      >
        <!--Avatar in drawer-->
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Supreme S.S</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <!--End of avatar in drawer-->

        <!--Links of drawer-->
        <v-list class="pt-0" dense>
          <v-divider/>
          <v-list-tile
            v-for="link in links"
            :key="link.title"
            @click="">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!--End of links of drawer-->
      </v-navigation-drawer>
    <!--End of navigation drawer-->

    <!--Navbar-->
    <v-toolbar app dark>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer"> Supreme </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon left> {{ link.icon }} </v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--End of navbar-->

    <v-content>
      <router-view name="bodyWrap"/>
    </v-content>
  </v-app>

</template>

<script>
export default {
  data () {
    return {
      drawer: false
    };
  },
  methods: {

  },
  computed: {
    links () {
      return [
        {
          title: 'Sign In',
          icon: 'lock',
          url: '/auth'
        },
        {
          title: 'Sign Up',
          icon: 'face',
          url: '/signup'
        },
        {
          title: 'Profile',
          icon: 'person',
          url: '/profile'
        }

      ];
    }
  }
};
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
