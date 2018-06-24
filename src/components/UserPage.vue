<template>
  <v-card
    class="elevation-10 mb3 test"
    height="500px"
  >
    <v-layout row>
      <v-flex xs3 class="mt-5 ml-3">
        <v-card-media
          src="http://hotwalls.ru/thumbnails/lg/goluboglazaya_blondinka_v_svitere.jpg"
          height="200px"
        />
      </v-flex>
      <v-flex xs9 class="mt-4">
        <v-card-text>
          <h2 class="text--primary">Lorem ipsum.</h2>
          <v-divider/>
          <p>Some descr1: Lorem ipsum dolor.</p>
          <v-divider/>
          <p>Some descr2: Lorem ipsum dolor.</p>
          <v-divider/>
          <p>Some descr3: Lorem ipsum dolor.</p>
          <v-divider/>
          <p>Some descr4: Lorem ipsum dolor.</p>
          <v-divider/>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {

  };
</script>

<style scoped>
  .test {
    position: fixed;
    width: 65%;
  }
</style>
