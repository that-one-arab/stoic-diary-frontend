<template>
  <v-container>
    <div class="d-flex justify-center align-center pb-10 h-100vh">
      <v-card class="pa-8" :loading="false" style="min-width: 50vw">
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="12" lg="12">
              <v-text-field
                v-model="newPassword"
                :rules="newPasswordRules"
                label="Enter your new password"
                required
                @keyup.enter="handleSubmit"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <v-text-field
                v-model="confirmNewPassword"
                :rules="confirmNewPasswordRules"
                label="Confirm your new password"
                required
                @keyup.enter="handleSubmit"
              ></v-text-field>
            </v-col>
            <v-col sm="12">
              <v-row justify="end">
                <v-col cols="12" sm="12" md="12" lg="4">
                  <v-btn
                    width="100%"
                    elevation="2"
                    @click="handleSubmit"
                    :disabled="!valid"
                    >Reset your password</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import http from '@/util/http';
import { RESET_PASSWORD_URL } from '@/constants/urls';
import { passwordRules } from '@/constants/rules';
import notification from '@/util/notification';

export default {
  name: 'EnterNewPasswordView',
  data() {
    return {
      valid: false,

      newPassword: '',
      newPasswordRules: passwordRules,

      confirmNewPassword: '',
      confirmNewPasswordRules: [
        (v) =>
          v === this.newPassword ||
          'Your input does not match your new password',
      ],

      secret: '',
      email: '',
    };
  },
  beforeMount() {
    // Store the secret and email values in component state
    this.secret = this.$route.query.secret;
    this.email = decodeURIComponent(this.$route.query.email); // email has encoded chars ('@' symbol)

    // Then remove them from the URL by emptying the URL query params
    history.pushState({}, '', this.$route.path);
  },
  methods: {
    async handleSubmit() {
      const { newPassword, email, secret } = this;

      // Attempt to log user in
      const data = await http.post(RESET_PASSWORD_URL, {
        newPassword,
        email,
        secret,
      });

      if (!data.success) {
        if (data.status_code === 403) {
          this.$store.commit('showSnackbar', {
            header: 'Password reset request has expired',
            body: 'Your password reset has expired, please try to reset your password again',
            variant: 'error',
          });
        } else {
          notification.showError();
        }

        this.$router.push('/');

        return;
      }

      // Push to dashboard
      this.$router.push('/');
    },
  },
};
</script>
