<template>
  <v-container>
    <v-row class="justify-center">
      <v-col lg="8">
        <nav-bar @dateChange="handleGetPage()" />
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col lg="8">
        <v-card class="page-card">
          <v-row class="ma-4 no-flex">
            <v-col lg="12">
              <what-went-wrong />
            </v-col>
            <v-col lg="12">
              <what-went-right />
            </v-col>
            <v-col lg="12">
              <what-can-be-improved />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-footer class="page-footer" padless>
      <v-col class="d-flex justify-end" xs="12" md="10" lg="10">
        <v-btn :disabled="loading" color="success" @click="handleSave">
          Save &nbsp;
          <i class="fas fa-pen-fancy"></i>
        </v-btn>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import WhatWentWrong from '../components/page/editors/WhatWentWrong/index.vue';
import WhatWentRight from '../components/page/editors/WhatWentRight/index.vue';
import WhatCanBeImproved from '../components/page/editors/WhatCanBeImproved/index.vue';
import NavBar from '../components/page/NavBar/index.vue';
import http from '@/util/http';
import {
  GET_PAGE_URL,
  CREATE_PAGE_URL,
  UPDATE_PAGE_URL,
} from '@/constants/urls';
import { transformSections, deTransformSections } from '@/util/page';
import notification from '@/util/notification';

export default {
  name: 'PageView',
  components: {
    WhatWentWrong,
    WhatWentRight,
    WhatCanBeImproved,
    NavBar,
  },
  computed: {
    /** @type {string} YYYY-MM-DD */
    date() {
      return this.$route.query.date;
    },

    loading() {
      return this.$store.state.fetchState.loading;
    },
  },
  methods: {
    async handleGetPage() {
      // If the page has a line/lines empty them first
      this.$store.dispatch('emptyPage');

      const data = await http.get(GET_PAGE_URL(this.date));

      if (!data.success) {
        if (
          data.errors.includes('Your diary page for this date does not exist')
        ) {
          // Add 1 empty line for each section (to allow the user to begin typing)
          this.$store.dispatch('createBlankPage');
          // Save the future action as a POST action (will be used when user clicks save button)
          this.$store.commit('setPageAction', 'POST');
        } else {
          notification.showError();
        }

        return;
      }

      const { whatWentWrong, whatWentRight, whatCanBeImproved } =
        deTransformSections(data.details);

      // Populate the page with the fetched sections' data
      this.$store.dispatch('fillPageData', {
        whatWentWrong,
        whatWentRight,
        whatCanBeImproved,
      });

      // Save the future action as a PUT action (will be used when user clicks save button)
      this.$store.commit('setPageAction', 'PUT');
    },
    // "Save Button" onclick handler
    handleSave() {
      const { pageAction } = this.$store.state;

      if (pageAction === 'POST') {
        this.handleCreatePage();
      } else if (pageAction === 'PUT') {
        this.handleUpdatePage();
      }
    },

    // POST request to create a new page entity
    async handleCreatePage() {
      const date = this.date;

      const { whatWentWrong, whatWentRight, whatCanBeImproved } =
        transformSections(this.$store.state.page);

      const data = await http.post(CREATE_PAGE_URL, {
        date,
        whatWentWrong,
        whatWentRight,
        whatCanBeImproved,
      });

      if (!data.success) {
        notification.showError();

        return;
      }

      this.$store.commit('showSnackbar', {
        header: 'Page created',
        body: 'Your page has been created successfully',
        variant: 'success',
      });

      // Handle the case where IF the user follows up with a page edit (edits page immedieatly after creation)
      this.$store.commit('setPageAction', 'PUT');
    },

    // PUT request to update the page entity
    async handleUpdatePage() {
      const date = this.date;

      const { whatWentWrong, whatWentRight, whatCanBeImproved } =
        transformSections(this.$store.state.page);

      const data = await http.put(UPDATE_PAGE_URL, {
        date,
        whatWentWrong,
        whatWentRight,
        whatCanBeImproved,
      });

      if (!data.success) {
        notification.showError();

        return;
      }

      this.$store.commit('showSnackbar', {
        header: 'Page updated',
        body: 'Your page has been updated successfully',
        variant: 'success',
      });
    },
  },
};
</script>

<style scoped>
.page-footer {
  margin-top: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: white;
  color: white;
  text-align: center;
}
.footer {
  display: flex;
  flex-direction: row-reverse;
}

/* Some bug with v-row that doesn't obey the breakpoints (or maybe it's just me who's bugged...) */
.no-flex {
  display: inherit;
}

.page-card {
  margin-bottom: 75px;
}

@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
</style>
