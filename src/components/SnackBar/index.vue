/** This component uses 3 fields from store.state.snackbar: header, body and
variation. All of them are strings */

<template>
  <v-snackbar
    v-model="isOn"
    :multi-line="true"
    :timeout="timeout"
    :color="variant"
  >
    {{ header }} <br />
    {{ body }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="black"
        text
        v-bind="attrs"
        @click="$store.commit('hideSnackbar')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
// Color types
export const snackbarColors = {
  error: 'red accent-2',
};

export default {
  name: 'SnackBar',

  computed: {
    isOn: {
      // compute "is snackbar on" using variables from store
      get() {
        const { snackbar } = this.$store.state;
        if (snackbar.header || snackbar.body || snackbar.variation) return true;
        return false;
      },
      // Hide the snackbar using "hideSnackbar" mutation (resets the state.snackbar fields to an empty string)
      set(newVal) {
        if (newVal === false) this.$store.commit('hideSnackbar');
        return newVal;
      },
    },

    header() {
      return this.$store.state.snackbar.header;
    },
    body() {
      return this.$store.state.snackbar.body;
    },
    variant() {
      return this.$store.state.snackbar.variant;
    },
    timeout() {
      return this.$store.state.snackbar.timeout;
    },
  },
};
</script>

<style></style>
