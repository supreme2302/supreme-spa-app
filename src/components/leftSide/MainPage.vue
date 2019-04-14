<template>
  <div>
    <h1>Main Page</h1>
    <input
      v-model="email"
    />
    <input
      v-model="password"
    />
    <v-btn @click="sendTest">Test</v-btn>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      sendTest () {
        const payload = {
          email: this.email,
          password: this.password
        };

        this.$store.dispatch('signUpTest', payload);
      }
    }
  };
</script>

<style scoped>

</style>
