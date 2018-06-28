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
        <div class="hidden-sm-and-up">
          <v-card-text class="pb-0 pt-0">
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="mail"
                name="email"
                placeholder="E-mail"
                type="email"
                class="pt-0"
                required
                :rules="emailRules"
                v-model="email"
              />
              <v-text-field
                prepend-icon="phone"
                name="phone"
                placeholder="Phone"
                type="text"
                class="pt-0"
                required
                :rules="phoneRules"
                v-model="phone"
              />
              <v-text-field
                prepend-icon="info"
                multi-line
                name="about"
                placeholder="About"
                type="text"
                class="pt-0"
                required
                :rules="[v => !!v || 'Description is required']"
                v-model="about"
              />
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
          </v-card-actions>
          <img
            src="http://classpic.ru/wp-content/uploads/ulybchivaya-blondinka.jpg"
            height="100"
            class="offset-img"
          />
          <v-layout row class="overflow-hidden">
            <v-flex xs12>
              <v-switch
                class="mt-3 offsets inline"
                color="grey darken-4"
                label="Add to main page?"
              />
              <v-btn
                color="grey darken-4"
                class="offsets hover"
                v-bind:disabled="!valid"
                @click="onSubmit"
              >
                <span class="btn-color">Save</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>

      </v-card>
    </v-flex>
    <v-flex sm6 md8 lg9 class="hidden-xs-only mt-5">
      <v-card class="color">
        <v-card-text class="pb-0">
          <v-form v-model="valid" ref="form" validation>
            <v-text-field
              prepend-icon="mail"
              name="email"
              label="E-mail"
              type="email"
              required
              :rules="emailRules"
              v-model="email"
            />
            <v-text-field
              prepend-icon="phone"
              name="phone"
              label="Phone"
              type="text"
              required
              :rules="phoneRules"
              v-model="phone"
            />
            <v-text-field
              prepend-icon="info"
              multi-line
              name="about"
              label="About"
              type="text"
              required
              :rules="[v => !!v || 'Description is required!']"
              v-model="about"/>
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
        </v-card-actions>
        <img
          src="http://classpic.ru/wp-content/uploads/ulybchivaya-blondinka.jpg"
          height="100"
          class="offset-img"
        />
      </v-card>
      <v-layout row>
        <v-flex xs12>
          <v-switch
            class="mt-3 offsets inline"
            color="grey darken-4"
            label="Add to main page?"
          />
          <v-btn
            color="grey darken-4"
            class="offsets hover"
            v-bind:disabled="!valid"
            @click="onSubmit"
          >
            <span class="btn-color">Save</span>
          </v-btn>
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        about: '',
        email: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        phoneRules: [
          v => !!v || 'Password is required',
          v => /^[0-9]+$/.test(v) || 'In field must be only numbers',
        ]
      };
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const data = {
            email: this.email,
            phone: this.phone,
            about: this.about
          };
          console.log(data);
        }
      }
    }
  };
</script>

<style scoped>
  .offset-img {
    margin-left: 54px;
  }
  .offsets {
    margin-left: 50px;
  }
  .color {
    background: #fafafa;
  }
  .inline {
    width: 90%;
  }
  .btn-color {
    color: #fff;
  }
  .hover:hover {
    background: #424242!important;
  }

  @media (max-width: 599px) {
    p {
      margin-bottom: 4px;
    }
    .xs-size {
      margin-top: 0!important;
    }
    .pict-size {
      height: 120px!important;
    }
  }
</style>
