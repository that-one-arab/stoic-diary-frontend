<template>
  <v-form v-model="valid">
    <v-container>
      <div class="d-flex justify-center align-center pb-10 h-100vh">
        <v-card class="pa-8" :loading="false">
          <v-row justify="space-between" align="center">
            <v-col cols="12" md="12">
              <v-text-field
                v-model="userIdentifier"
                :rules="userIdentifierRules"
                label="Username or email"
                required
                @keyup.enter="handleSubmit"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                style="padding-top: 0"
                v-model="password"
                label="Password"
                required
                type="password"
                @keyup.enter="handleSubmit"
              ></v-text-field>
            </v-col>

            <v-switch v-model="rememberMe" label="Remember me"></v-switch>
            <p>
              <a :href="routes.FORGOT_PASSWORD_ROUTE">Forgot password?</a>
            </p>
          </v-row>
          <v-row justify="space-between">
            <v-col cols="12" sm="12" md="12" lg="6">
              <p>
                <a :href="routes.REGISTER_ROUTE">Or click here to register</a>
              </p>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="2">
              <v-btn elevation="2" @click="handleSubmit">Log in</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { snackbarColors } from '@/components/SnackBar';
import http from '@/util/http';
import { LOGIN_URL } from '@/constants/urls';
import { REGISTER_ROUTE, FORGOT_PASSWORD_ROUTE } from '@/constants/routes';
import Cookies from 'js-cookie';

export default {
  name: 'LoginView',
  data() {
    return {
      valid: false,

      userIdentifier: '',
      userIdentifierRules: [(v) => !!v || 'This field is required'],

      password: '',
      rememberMe: false,

      routes: {
        REGISTER_ROUTE,
        FORGOT_PASSWORD_ROUTE,
      },
    };
  },
  created() {
    // Handle automatically filling userIdentifier and password fields with saved cookies
    const userIdentifier = Cookies.get('login_useridentifier');
    const password = Cookies.get('login_password');
    const rememberMe = Cookies.get('login_rememberMe');
    if (userIdentifier && password && rememberMe) {
      this.userIdentifier = userIdentifier;
      this.password = password;
      this.rememberMe = rememberMe;
    }

    // The app might push the user to the login page because their session expired, we can tell that by the 'requireLogin' query param
    if (this.$route.query?.requireLogin)
      this.$store.commit('showSnackbar', {
        header: 'Your session has expired',
        body: 'Please login again with your credentials',
        variant: snackbarColors.error,
      });
  },
  methods: {
    async handleSubmit() {
      const {
        userIdentifier: userIdentifierValue,
        password,
        rememberMe,
      } = this;

      let userIdentifierKey = 'username';

      if (userIdentifierValue.includes('@')) userIdentifierKey = 'email';

      // Attempt to log user in
      const data = await http.post(LOGIN_URL, {
        [userIdentifierKey]: userIdentifierValue,
        password,
      });

      if (!data.success) {
        if (
          data.errors.includes(
            'Login failed, please check your email and/or password'
          )
        ) {
          this.$store.commit('showSnackbar', {
            header: 'Cannot login',
            body: 'Login failed, please check your username or email field and/or password field',
            variant: 'error',
          });
        } else {
          this.$store.commit('showSnackbar', {
            header: 'Cannot login',
            body: 'An error occurred while logging in, please try again later.',
            variant: 'error',
          });
        }

        return;
      }

      // Save or delete user credentials depending on value of rememberMe
      if (rememberMe) {
        Cookies.set('login_rememberMe', true);
        Cookies.set('login_useridentifier', userIdentifierValue);
        Cookies.set('login_password', password);
      } else {
        Cookies.set('login_rememberMe', false);
        Cookies.remove('login_useridentifier');
        Cookies.remove('login_password');
      }

      // Set user logged in state to true
      this.$store.commit('logInUser');
      // Push to root (handled in router.js)
      this.$router.push('/');
    },
  },
};
</script>
