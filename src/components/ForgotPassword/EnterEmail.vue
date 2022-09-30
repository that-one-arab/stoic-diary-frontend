<template>
  <v-form v-model="valid">
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Enter your email"
          required
          v-on:keydown.enter.prevent="handleSubmit"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-btn
          width="100%"
          elevation="2"
          @click="handleSubmit"
          :disabled="!valid"
          >Reset your password</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { emailRules } from '@/constants/rules';

export default {
  name: 'EnterEmailView',
  data() {
    return {
      valid: false,
      email: '',
      emailRules,
    };
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.email);
    },
  },
};
</script>
