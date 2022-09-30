<template>
  <div>
    <v-app-bar v-if="isNavbarDisplayed" app color="white">
      <v-container fluid class="py-0 fill-height">
        <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->

        <div class="box">
          <v-app-bar-nav-icon
            v-if="screenWidth < 900"
            @click="drawer = true"
          ></v-app-bar-nav-icon>
          <span>
            <p v-if="screenWidth > 900" class="text-subtitle-1 welcome-text">
              Welcome &nbsp;
            </p>
            <strong>{{ username }}</strong>
          </span>
        </div>

        <!-- <v-spacer></v-spacer> -->
        <div v-if="screenWidth > 900" class="box">
          <!-- <div> -->
          <span>
            <v-btn
              v-for="link in links"
              :key="link"
              text
              @click="handleRouterPush(link)"
            >
              {{ link }}
            </v-btn>
          </span>
          <!-- </div> -->
        </div>

        <!-- <v-spacer></v-spacer> -->

        <div v-if="screenWidth > 900" class="box">
          <span>
            <v-responsive max-width="260" class="log-out-icon-container">
              <v-icon
                color="red"
                light
                large
                class="log-out-icon"
                @click="handleLogout"
              >
                mdi-power
              </v-icon>
            </v-responsive>
          </span>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="link in links"
            :key="link"
            @click="handleRouterPush(link)"
          >
            <v-list-item-title> {{ link }} </v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleLogout">
            <v-list-item-title> Log out </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import http from '@/util/http';
import { SIGNOUT_URL } from '@/constants/urls';
import { LOGIN_ROUTE } from '@/constants/routes';

export default {
  name: 'AppNavBar',

  data() {
    return {
      links: [
        /** Not implemented */
        // 'Dashboard',
        'Page',
        'Settings',
        'Help',
      ],
      drawer: false,
      group: null,

      isNavbarDisplayed: false,
      screenWidth: window.innerWidth,
    };
  },

  computed: {
    username() {
      return this.$store.state.user.username;
    },
  },

  methods: {
    handleRouterPush(link) {
      // This is to avoid console error that might happen if user attempts to go to the same route they're currently on
      this.$route.name !== link && this.$router.push(`/${link.toLowerCase()}`);
    },
    async handleLogout() {
      await http.get(SIGNOUT_URL);

      this.$router.push(LOGIN_ROUTE);
    },
    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },

  created() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  watch: {
    // On each route change
    $route(value) {
      // If the route is one of the following routes, remove the navbar; else display the navbar
      if (
        value.name.search(
          /(Login|Register|Forgot Password|Verify Reset Password Secret|Enter New Password)/i
        )
      )
        this.isNavbarDisplayed = true;
      else this.isNavbarDisplayed = false;
    },
  },
};
</script>

<style scoped>
.log-out-icon-container {
  flex: none;
}
.log-out-icon {
  font-size: 40px;
}
.welcome-text {
  /* (v-application) class applies margin-bottom to all <p> tags so we discard that by setting margin to 0 */
  margin-bottom: 0;
  font-weight: 400 !important;
}

.box {
  flex: 1;
  display: flex;
  justify-content: center;
}

.box:first-child > span {
  margin-right: auto;
  display: flex;
  align-items: center;
}

.box:last-child > span {
  margin-left: auto;
}

@media only screen and (max-width: 900px) {
  .box {
    justify-content: space-between;
  }

  .box:first-child > span {
    margin-right: 0;
  }

  .box:last-child > span {
    margin-left: 0;
  }
}
</style>
