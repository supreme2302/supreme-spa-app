<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark >
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text @keyup.enter="onSubmit">
            <v-form validate v-model="valid" ref="form">
              <v-text-field
                autofocus
                v-model="email"
                :rules="emailRules"
                prepend-icon="email"
                name="email" label="E-mail"
                type="email"
              />
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                prepend-icon="person"
                name="username" label="Username"
                type="text"
                :counter="3"
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="8"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"/>
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                :counter="8"
                prepend-icon="lock"
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"/>
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
        username: '',
        password: '',
        confirmPassword: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => v.length >= 3 || 'Username must be not less than 3 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be not less than 8 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be not less than 8 characters',
          v => v === this.password || 'Password do not match'
        ]
      };
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const data = {
            email: this.email,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
          }
          this.$store.dispatch('signUpUser', data);
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
