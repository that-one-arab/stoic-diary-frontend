<template>
  <body
    @click="handleFocusActiveElement"
    @keyup.enter="handleFocusActiveElement"
    @keyup.tab="handleFocusActiveElement"
  >
    <v-app>
      <app-nav-bar />
      <v-main class="grey lighten-3">
        <router-view />
      </v-main>
      <snack-bar />
    </v-app>
  </body>
</template>

<script>
import AppNavBar from './components/AppNavBar';
import SnackBar from '@/components/SnackBar';

export default {
  name: 'App',
  components: {
    AppNavBar,
    SnackBar,
  },
  data() {
    return {
      app: {
        activeElement: null,
      },
      drawer: false,
      group: null,
    };
  },
  methods: {
    /** There are sibling or children components that rely on knowing which input element is currently in focus. We
     * listen to all combination values (or the comb. values that I can think of) that re-focuses the selected element
     * and we provide/inject that value into our application so that components can listen to it. */
    handleFocusActiveElement() {
      // We only want to listen to either input elements or the body element...
      if (['INPUT', 'BODY'].includes(document.activeElement.tagName)) {
        this.app.activeElement = document.activeElement;
      }
    },
  },
  provide() {
    return {
      app: this.app,
    };
  },
};
</script>

<style>
/* Override */
.v-application {
  line-height: 0;
}

.h-100vh {
  height: 100vh;
}

.clickable {
  cursor: pointer;
}

.my-form-layout {
  width: 40%;
}

@media only screen and (max-width: 768px) {
  .login-form-layout {
    width: 85%;
  }
}

.error-text {
  color: red;
}
</style>
