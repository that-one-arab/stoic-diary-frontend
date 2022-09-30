<template>
  <v-row>
    <v-col cols="12" md="12" lg="12" align="center">
      <p class="text-h5 mb-8">This link is invalid or has expired</p>
      <p>
        If you tried to reset your password, either the link was an invalid
        link, or it has passed its expiry date. You can try to reset your
        password again by clicking
        <a :href="routes.FORGOT_PASSWORD_ROUTE">here</a>
      </p>
      <a class="caption mb-8" :href="routes.LOGIN_ROUTE"
        >Or go back to login page
      </a>
    </v-col>
  </v-row>
</template>

<script>
import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE } from '@/constants/routes';

export default {
  name: 'VerifyResetPasswordSecretView',
  data() {
    return {
      routes: {
        LOGIN_ROUTE,
        FORGOT_PASSWORD_ROUTE,
      },
    };
  },
};
</script>
