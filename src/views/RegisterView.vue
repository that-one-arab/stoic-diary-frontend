<template>
  <v-form v-model="valid">
    <v-container>
      <div class="d-flex justify-center align-center pb-10 h-100vh">
        <v-row justify="center">
          <v-col lg="6">
            <v-card class="pa-8" :loading="loading">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="10"
                    label="Username"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    required
                    type="password"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-col>

                <v-row class="d-flex justify-space-between mt-4">
                  <v-col cols="12" sm="12" md="12" lg="6">
                    <p>
                      <a :href="routes.LOGIN_ROUTE">Or click here to login</a>
                    </p>
                  </v-col>
                  <v-col cols="12" sm="12" md="3" lg="3">
                    <v-btn
                      :disabled="loading"
                      elevation="2"
                      @click="handleSubmit"
                      >Register</v-btn
                    >
                  </v-col>
                </v-row>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { usernameRules, emailRules, passwordRules } from '@/constants/rules';
import { REGISTER_URL } from '@/constants/urls';
import { LOGIN_ROUTE } from '@/constants/routes';
import http from '@/util/http';

export default {
  name: 'RegisterView',
  data() {
    return {
      routes: {
        LOGIN_ROUTE,
      },

      valid: false,

      username: '',
      usernameRules,
      email: '',
      emailRules,

      password: '',
      confirmPassword: '',
      passwordRules,
      confirmPasswordRules: [
        (v) => v === this.password || 'Your input does not match your password',
      ],

      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      // Form values
      const { username, email, password } = this;

      this.loading = true;
      const data = await http.post(REGISTER_URL, {
        username,
        email,
        password,
      });
      this.loading = false;

      if (!data.success) {
        if (
          data.errors.includes(
            'This user with this username and/or email already exists'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot create account',
            body: 'This user with this username and/or email already exists. Please try a different username and/or email',
            variant: 'error',
          });
        } else {
          this.$store.commit('showSnackbar', {
            header: 'Cannot create account',
            body: 'An error occurred while creating your account, please try again later.',
            variant: 'error',
          });
        }

        return;
      }

      this.$store.commit('showSnackbar', {
        header: 'Account created',
        body: 'Your account was successfully created, please log in with your newly created account',
        variant: 'success',
      });

      this.$router.push(LOGIN_ROUTE);
    },
  },
};
</script>
