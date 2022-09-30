<template>
  <v-container>
    <v-form v-model="valid">
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="30"
            label="Type your current password"
            required
            class="mb-4"
          ></v-text-field>
          <br />
          <v-row justify="center">
            <v-btn
              :disabled="!valid"
              color="error"
              class="mr-4 mt-5"
              @click="handleSubmit"
            >
              Delete my account
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { LOGIN_ROUTE } from '@/constants/routes';
import { DELETE_ACCOUNT_URL } from '@/constants/urls';
import http from '@/util/http';

export default {
  name: 'DeleteMyAccount',
  data() {
    return {
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 30 || 'Password must be less than 30 characters',
      ],
      messages: {
        incorrectPassword:
          'Your password is incorrect, please double check your password and try again',
      },
    };
  },
  methods: {
    async handleSubmit() {
      // Form values
      const { password } = this;

      const data = await http.post(DELETE_ACCOUNT_URL, {
        password,
      });

      if (!data.success) {
        if (
          data.errors.includes(
            'Your password is invalid, please double check your password'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot delete account',
            body: 'Your password is invalid, please double check your password',
            variant: 'error',
          });
        } else {
          this.$store.commit('showSnackbar', {
            header: 'Cannot delete account',
            body: 'An error occurred while deleting your account, please try again later.',
            variant: 'error',
          });
        }

        return;
      }

      this.$store.commit('showSnackbar', {
        header: 'Account deleted',
        body: 'Your account was deleted successfully, sad to see you go :(',
        variant: 'success',
      });

      this.$router.push(LOGIN_ROUTE);
    },
  },
};
</script>
