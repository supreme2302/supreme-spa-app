<template>
  <v-layout>
    <v-flex xs12 sm5 md4 lg3 offset-sm1 class="mt-5 xs-size">
      <v-card class="color" flat>
        <v-card-media
          src="http://hotwalls.ru/thumbnails/lg/goluboglazaya_blondinka_v_svitere.jpg"
          height="250px"
          class="pict-size"
        >
        </v-card-media>
        <v-card-title primary-title class="pb-0">
          <div>
            <p class="text--primary">E-mail: supreme@s.s</p>
            <p class="text--primary">Phone: +7-777-777-77-77</p>
            <p class="text--primary">Skills: Js, Java, Postgresql, C++</p>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex sm6 md8 lg9 class="hidden-xs-only mt-5">
      <v-card class="color">
        <v-card-text class="pb-0">
          <v-form>
            <v-text-field
              prepend-icon="mail"
              name="email"
              label="E-mail"
              type="email"/>
            <v-text-field
              prepend-icon="phone"
              name="phone"
              label="Phone"
              type="text"/>
            <v-text-field
              prepend-icon="info"
              multi-line
              name="about"
              label="About"
              type="text"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            class="offsets"
          >
            Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <img :src="imageSrc" height="100" v-if="imageSrc"/>
        </v-card-actions>
      </v-card>
      <v-layout row>
        <v-flex xs12>
          <v-switch
            class="mt-3 offsets inline"
            color="grey darken-4"
            label="Add to main page?"
            v-model="promo"
          />
          <v-btn
            dark
            class="offsets"
          >
            Save
          </v-btn>
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
  };
</script>

<style scoped>
  .offsets {
    margin-left: 50px;
  }
  .color {
    background: #fafafa;
  }
  .inline {
    width: 90%;
  }
  @media (max-width: 599px) {
    .xs-size {
      margin-top: 0!important;
    }
    .pict-size {
      height: 120px!important;
    }
  }
</style>
