import {
  FORGOT_PASSWORD_ROUTE,
  ENTER_NEW_PASSWORD_ROUTE,
  VERIFY_RESET_PASSWORD_TOKEN_ROUTE,
  // DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  PAGE_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
  HELP_ROUTE,
} from '@/constants/routes';
import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import http from '@/util/http';
import {
  GET_USER_URL,
  VERIFY_RESET_PASSWORD_TOKEN_URL,
} from '@/constants/urls';
import notification from '@/util/notification';
import SETTINGS_SIDEBAR_TABS from '@/constants/settings/tabs';

Vue.use(VueRouter);

export function willUpdateUserCache(data) {
  const { username, email } = data.details;
  const { username: cachedUsername, email: cachedEmail } = store.state.user;
  if (username !== cachedUsername || email !== cachedEmail) {
    store.commit('setUserInfo', {
      username,
      email,
    });
  }
}

// Verify if the user is logged in
async function handleProtectedRoute(to, from, next) {
  const data = await http.get(GET_USER_URL, { preventLoginRedirection: true });

  if (!data.success) {
    store.commit('logOutUser');
    next({ path: LOGIN_ROUTE });

    return;
  }

  // Verify that the user's information wasnt updated, if it was, then update the store.
  willUpdateUserCache(data);

  next();
}

async function handleVerifyResetPasswordSecret(to, from, next) {
  const { secret, email } = to.query;

  const data = await http.post(VERIFY_RESET_PASSWORD_TOKEN_URL, {
    secret,
    email,
  });

  if (!data.success) {
    if (data.status_code === 403) {
      // Display the "This link has expired" template inside "VerifyResetPasswordSecretView.vue"
      next();
    } else {
      // Server error
      notification.showError();
    }

    return;
  }

  // Redirect the user to the "enter new password route"
  next({ path: ENTER_NEW_PASSWORD_ROUTE, query: { secret, email } });
}

async function handleSetDefaultSettingsTab(to, from, next) {
  const isValidTab = (tab) =>
    !!SETTINGS_SIDEBAR_TABS.find((el) => el.value === tab);

  const { tab } = to.query;

  if (tab && isValidTab(tab)) {
    // Return whatever the URL parameter has.
    return next();
  }

  // Set the default opened tab to the change username tab
  next({ path: to.path, query: { tab: 'change-username' } });
}

const routes = [
  // Redirect "/" to "/page"
  {
    path: '/',
    redirect: PAGE_ROUTE,
  },
  // Public routes
  {
    path: LOGIN_ROUTE,
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    name: 'Forgot Password',
    component: () => import('../views/ForgotPasswordView.vue'),
  },
  {
    path: ENTER_NEW_PASSWORD_ROUTE,
    name: 'Enter New Password',
    component: () => import('../views/EnterNewPasswordView.vue'),
  },
  {
    path: VERIFY_RESET_PASSWORD_TOKEN_ROUTE,
    name: 'Verify Reset Password Secret',
    component: () => import('../views/VerifyResetPasswordSecretView.vue'),
    beforeEnter: async (to, from, next) => {
      return handleVerifyResetPasswordSecret(to, from, next);
    },
  },
  {
    path: REGISTER_ROUTE,
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
  // Protected routes
  {
    path: PAGE_ROUTE,
    name: 'Page',
    component: () => import('../views/PageView.vue'),
    beforeEnter: (to, from, next) => {
      handleProtectedRoute(to, from, next);
    },
  },
  {
    path: SETTINGS_ROUTE,
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    beforeEnter: (to, from, next) => {
      handleProtectedRoute(to, from, next);
      handleSetDefaultSettingsTab(to, from, next);
    },
  },
  {
    path: HELP_ROUTE,
    name: 'Help',
    component: () => import('../views/HelpView.vue'),
    beforeEnter: (to, from, next) => {
      handleProtectedRoute(to, from, next);
    },
  },
  /** Not implemented */
  // {
  //   path: DASHBOARD_ROUTE,
  //   name: 'Dashboard',
  //   component: () => import('../views/DashboardView.vue'),
  //   beforeEnter: (to, from, next) => {
  //     handleProtectedRoute(to, from, next);
  //   },
  // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
