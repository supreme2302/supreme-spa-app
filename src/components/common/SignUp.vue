<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark >
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Sign In"
                type="text"/>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"/>
              <v-text-field
                prepend-icon="lock"
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn dark>Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
  };
</script>

<style scoped>

</style>
