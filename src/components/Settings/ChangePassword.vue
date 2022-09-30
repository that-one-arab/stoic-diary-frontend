<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="currentPassword"
            :rules="passwordRules"
            :counter="30"
            label="Type your current password"
            required
            class="mb-4"
          ></v-text-field>
          <br />
          <v-text-field
            v-model="newPassword"
            :rules="newPasswordRules"
            :counter="30"
            label="Type your new password"
            required
            class="mb-4"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmNewPassword"
            :rules="confirmPasswordRules"
            :counter="30"
            label="Confirm your new password"
            required
            class="mb-4"
            type="password"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="handleSubmit"
          >
            Change Password
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { passwordRules } from '@/constants/rules';
import { CHANGE_PASSWORD_URL } from '@/constants/urls';
import http from '@/util/http';

export default {
  name: 'ChangePassword',
  data() {
    return {
      valid: false,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordRules,
      newPasswordRules: passwordRules,
      confirmPasswordRules: [
        (v) =>
          v === this.newPassword ||
          'Your input does not match your new password',
      ],
    };
  },
  methods: {
    resetForm() {
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
      this.$refs.form.resetValidation();
    },
    async handleSubmit() {
      // Form values
      const { currentPassword, newPassword } = this;

      const data = await http.post(CHANGE_PASSWORD_URL, {
        password: currentPassword,
        newPassword,
      });

      if (!data.success) {
        if (
          data.errors.includes(
            'Your password is invalid, please double check your password'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot change password',
            body: 'Your current password is invalid, please double check your current password',
            variant: 'error',
          });
        } else {
          this.$store.commit('showSnackbar', {
            header: 'Cannot change password',
            body: 'An error occurred while changing your password, please try again later.',
            variant: 'error',
          });
        }

        return;
      }

      this.resetForm();

      this.$store.commit('showSnackbar', {
        header: 'Password changed!',
        body: 'Your password was successfully changed',
        variant: 'success',
      });
    },
  },
};
</script>
