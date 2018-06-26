<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark >
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="E-mail"/>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn dark>Sign In</v-btn>
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
