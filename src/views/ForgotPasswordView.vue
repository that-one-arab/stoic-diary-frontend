<template>
  <v-container>
    <div class="d-flex justify-center align-center pb-10 h-100vh">
      <v-card class="pa-8" :loading="loading">
        <enter-email v-if="step === 0" @submit="handleSendPassResetEmail" />
        <email-sent v-if="step === 1" />
      </v-card>
    </div>
  </v-container>
</template>

<script>
import http from '@/util/http';
import { REQUEST_RESET_PASSWORD_URL } from '@/constants/urls';
import EnterEmail from '@/components/ForgotPassword/EnterEmail.vue';
import EmailSent from '@/components/ForgotPassword/EmailSent.vue';

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      step: 0,
      loading: false,
    };
  },
  methods: {
    async handleSendPassResetEmail(email) {
      this.loading = true;

      const data = await http.post(REQUEST_RESET_PASSWORD_URL, {
        email,
      });

      if (!data.success) {
        this.$store.commit('showSnackbar', {
          header: 'Cannot login',
          body: 'An error occurred while attempting to reset your password, please try again later.',
          variant: 'error',
        });
        return;
      }

      this.loading = false;

      // Show the "email successfully sent" step
      this.step = 1;
    },
  },
  components: { EnterEmail, EmailSent },
};
</script>
