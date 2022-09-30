<template>
  <v-row>
    <v-col cols="12" md="12" lg="12" align="center">
      <p class="text-h3 mb-8">We sent you an email</p>
      <p class="text-h5 mb-8">
        If your email is correct, you will be receiving one shortly. Please
        check your email to continue resetting your password
      </p>
      <p class="caption mb-8">
        If your message was not delivered, please check your spam folder. If you
        still can't find it within 10 minutes please reset your password again
      </p>
      <a :href="routes.LOGIN_ROUTE">Back to login page </a>
    </v-col>
  </v-row>
</template>

<script>
import { LOGIN_ROUTE } from '@/constants/routes';

export default {
  name: 'EmailSentView',
  data() {
    return {
      routes: {
        LOGIN_ROUTE,
      },
    };
  },
};
</script>
