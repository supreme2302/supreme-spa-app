<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark >
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text @keyup.enter="onSubmit">
            <v-form ref="form" validate v-model="valid">
              <v-text-field
                autofocus
                v-model="email"
                :rules="emailRules"
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="E-mail"/>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="8"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="grey darken-4 hover"
              :disabled="!valid"
              @click="onSubmit"
            >
              <span class="btn-color">Sign in</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be not less than 8 characters'
        ]
      };
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const data = {
            email: this.email,
            password: this.password
          };
          this.$store.dispatch('signIn', data);
        }
      }
    }
  };
</script>

<style scoped>
  .btn-color {
    color: #fff;
  }
  .hover:hover {
    background: #424242!important;
  }
</style>
