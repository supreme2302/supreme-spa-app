<!--suppress ALL -->
<template>
  <v-layout>
    <v-flex xs12 sm5 md4 lg3 offset-sm1 class="mt-5 xs-size">
      <v-card class="color" flat>
        <v-card-media
          :src="imgSrc"
          height="250px"
          class="pict-size"
        >
        </v-card-media>
        <v-card-title primary-title class="pb-0">
          <div>
            <p class="text--primary">E-mail: {{user.email}}</p>
            <p class="text--primary">Phone: {{user.phone}}</p>
            <p class="text--primary">Skills: {{user.skills}}</p>
            <p class="text--primary">About: {{user.about}}</p>
          </div>
        </v-card-title>
        <div class="hidden-sm-and-up">
          <v-card-text class="pb-0 pt-0">
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="phone"
                name="phone"
                placeholder="Phone"
                type="text"
                class="pt-0"
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
                :rules="[v => !!v || 'Description is required']"
                v-model="about"
              />
              <v-flex xs12>
                <v-autocomplete
                  prepend-icon="info"
                  v-model="skills"
                  :disabled="isUpdating"
                  :items="skillTips"
                  chips
                  label="Skills"
                  item-text="name"
                  item-value="name"
                  multiple
                  hide-selected
                >
                  <template
                    slot="selection"
                    slot-scope="data"
                  >
                    <v-chip
                      :selected="data.selectedSkills"
                      close
                      class="chip--select-multi"
                      @input="remove(data.item)"
                    >
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template
                    slot="item"
                    slot-scope="data"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              dark
              class="offsets"
              @click="triggerUpload"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            />
          </v-card-actions>
          <v-layout row class="overflow-hidden">
            <v-flex xs12>
              <v-switch
                class="mt-3 offsets inline"
                color="grey darken-4"
                label="Add to main page?"
                v-model="add"
              />
              <v-btn
                color="grey darken-4"
                class="offsets hover"
                v-bind:disabled="!valid || loading"
                @click="onSubmit"
                :loading="loading"
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
              prepend-icon="phone"
              name="phone"
              placeholder="Phone"
              type="text"
              class="pt-0"
              :rules="phoneRules"
              v-model="phone"
            />
            <v-text-field
              prepend-icon="info"
              multi-line
              name="about"
              label="About"
              type="text"
              :rules="[v => !!v || 'Description is required!']"
              v-model="about"/>

            <v-flex xs12>
              <v-autocomplete
                prepend-icon="info"
                v-model="skills"
                :disabled="isUpdating"
                :items="skillTips"
                chips
                label="Skills"
                item-text="name"
                item-value="name"
                multiple
                hide-selected
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selectedSkills"
                    close
                    class="chip--select-multi"
                    @input="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
            </v-flex>

            <v-flex xs12>
              <v-autocomplete
                prepend-icon="info"
                v-model="genres"
                :disabled="isUpdating"
                :items="genreTips"
                chips
                label="Genres"
                item-text="name"
                item-value="name"
                multiple
                hide-selected
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selectedGenres"
                    close
                    class="chip--select-multi"
                    @input="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
            </v-flex>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            class="offsets"
            @click="triggerUpload"
          >
            Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <input
            id="inputId"
            ref="fileInput"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFileChange"
          />
        </v-card-actions>
        <!--<img-->
          <!--:src="imageSrc"-->
          <!--v-if="imageSrc"-->
          <!--height="100"-->
          <!--class="offset-img"-->
        <!--/>-->
      </v-card>
      <v-layout row>
        <v-flex xs12>
          <v-switch
            class="mt-3 offsets inline"
            color="grey darken-4"
            label="Add to main page?"
            v-model="add"
          />
          <v-btn
            color="grey darken-4"
            class="offsets hover"
            v-bind:disabled="!valid || loading"
            @click="onSubmit"
            :loading="loading"
          >
            <span class="btn-color">Save</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import conf from '../../modules/conf/index.js';
  export default {
    data () {
      return {
        phone: '',
        about: '',
        valid: false,
        add: false,
        image: null,
        imgSrc: conf.serverUrl + conf.userAPIMethods.mediaGava + '/' + this.$store.getters.user.image,
        skillsRules: [
          v => !!v || 'Skills are required'
        ],
        phoneRules: [
          v => !!v || 'Password is required',
          v => /^[0-9]+$/.test(v) || 'In field must be only numbers'
        ],
        // imageSrc: 'http://localhost:5002/users/gava/',

        autoUpdate: true,
        skills: [],
        genres: [],
        isUpdating: false
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const data = {
            genres: this.genres,
            skills: this.skills,
            phone: this.phone,
            about: this.about,
            onpage: this.add,
            id: this.user.id
          };
          this.$store.dispatch('changeProfile', data);
        }
      },
      onFileChange (event) {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
          console.log(reader.result);
          this.imgSrc = reader.result;
        };
        reader.readAsDataURL(file);
        const input = document.getElementById('inputId');
        this.image = input.files[0];
        const img = this.image;
        const id = this.user.id;
        this.$store.dispatch('changeAva', {img, id});
      },
      triggerUpload () {
        this.$refs.fileInput.click();
      },
      remove (item) {
        const index = this.skills.indexOf(item.name)
        if (index >= 0) this.skills.splice(index, 1)
      }
    },
    computed: {
      user () {
        return this.$store.getters.user;
      },
      loading () {
        return this.$store.getters.loading;
      },
      skillTips () {
        return this.$store.getters.skills.map(skill => ({name: skill}));
      },
      genreTips () {
        return this.$store.getters.genres.map(genre => ({name: genre}));
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
