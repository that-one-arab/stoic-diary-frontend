<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="20"
            label="Type in your new Username"
            :placeholder="currentUsername"
            required
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Type your current password"
            required
            class="mb-4"
          ></v-text-field>
          <br />
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="handleSubmit"
          >
            Change Username
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { usernameRules, passwordRules } from '@/constants/rules';
import { CHANGE_USERNAME_URL, GET_USER_URL } from '@/constants/urls';
import { willUpdateUserCache } from '@/router';
import http from '@/util/http';

export default {
  name: 'ChangeUsername',
  data() {
    return {
      valid: false,
      username: '',
      nameRules: [
        ...usernameRules,
        (v) =>
          v !== this.currentUsername ||
          'Your new username cannot be your current username',
      ],

      password: '',
      passwordRules,
    };
  },
  computed: {
    currentUsername() {
      return this.$store.state.user.username;
    },
  },
  methods: {
    resetForm() {
      this.username = '';
      this.password = '';
      this.$refs.form.resetValidation();
    },
    async handleSubmit() {
      // Form values
      const { username, password } = this;

      const data = await http.post(CHANGE_USERNAME_URL, {
        newUsername: username,
        password,
      });

      if (!data.success) {
        if (
          data.errors.includes(
            'Your password is invalid, please double check your password'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot change username',
            body: 'Your password is invalid, please double check your password',
            variant: 'error',
          });
        } else if (
          data.errors.includes(
            'This username already exists, please try another username'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot change username',
            body: 'This username already exists, please try another username.',
            variant: 'error',
          });
        } else {
          this.$store.commit('showSnackbar', {
            header: 'Cannot change username',
            body: 'An error occurred while changing your username, please try again later.',
            variant: 'error',
          });
        }

        return;
      }

      // Update the user's username in store
      const userData = await http.get(GET_USER_URL);
      willUpdateUserCache(userData);

      this.resetForm();

      this.$store.commit('showSnackbar', {
        header: 'Username changed!',
        body: 'Your username was successfully changed',
        variant: 'success',
      });
    },
  },
};
</script>
