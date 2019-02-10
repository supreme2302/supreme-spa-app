<!--suppress ALL -->

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
        <v-list class="pt-0" dense v-if="renderPermission">
          <v-divider/>
          <v-list-tile
            v-for="link in links"
            :key="link.title"
            :to="link.url"
            @click="">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="onLogout"
            v-if="isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'Logout'"/>
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
        <router-link to="/test" tag="span" class="pointer"> Supreme </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <transition
        name="fade"
      >
        <v-toolbar-items class="hidden-sm-and-down" v-if="renderPermission">
          <v-btn
            v-for="link in links"
            :key="link.title"
            :to="link.url"
            flat
          >
            <v-icon left> {{ link.icon }} </v-icon>
            {{ link.title }}
          </v-btn>
          <v-btn
            @click="onLogout"
            v-if="isUserLoggedIn"
            flat
          >
            <v-icon left>exit_to_app</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
      </transition>

    </v-toolbar>
    <!--End of navbar-->

    <v-content>
      <router-view name="bodyWrap"/>

    </v-content>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn flat dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>

</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
      };
    },
    methods: {
      closeError () {
        this.$store.dispatch('clearError');
      },
      onLogout () {
        this.$store.dispatch('logoutUser')
          .then(
            () => {
              this.$router.push('/');
            }
          );
      },
    },
    computed: {
      error () {
        return this.$store.getters.error;
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
      renderPermission () {
        return this.$store.getters.renderPermission;
      },
      links () {
        if (this.isUserLoggedIn) {
          return [
            {
              title: 'Profile',
              icon: 'person',
              url: '/profile'
            }
          ];
        }
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
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-enter {
    transform: translateX(50px);
    opacity: 0;
  }
</style>
