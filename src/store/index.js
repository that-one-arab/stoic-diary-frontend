import Vue from 'vue';
import Vuex from 'vuex';

import { DefaultSnackbarArguments } from '@/defaultparams';

Vue.use(Vuex);

function generateEmptyLine(sectionName, id) {
  return {
    value: '',
    id: `${sectionName}-line-${id}`,
  };
}

function generateId() {
  const newId =
    Date.now() *
    Math.floor(Math.random() * 100)
      .toString()
      .substring(0, 6);
  return newId;
}

const state = {
  isUserLoggedIn: false,
  user: {
    username: '',
    email: '',
  },
  snackbar: {
    header: '',
    body: '',
    variant: '',
    timeout: -1,
  },
  page: {
    whatWentWrong: [],
    whatWentRight: [],
    whatCanBeImproved: [],
  },
  pageAction: '',
  fetchState: {
    loading: false,
    url: '',
  },
};

const mutations = {
  logInUser(_state) {
    _state.isUserLoggedIn = true;
  },
  logOutUser(_state) {
    _state.isUserLoggedIn = false;
  },
  setUserInfo(_state, { username, email }) {
    _state.user.username = username;
    _state.user.email = email;
  },
  showSnackbar(
    _state,
    { header, body, variant, timeout } = DefaultSnackbarArguments
  ) {
    _state.snackbar = {
      header,
      body,
      variant,
      timeout,
    };
  },

  hideSnackbar(_state) {
    _state.snackbar = {
      header: '',
      body: '',
      variant: '',
      timeout: -1,
    };
  },

  setPageSection(_state, { sectionName, value }) {
    // Sanity check incase I use a wrong key for the sectionName param
    if (!Object.keys(state.page).includes(sectionName))
      throw new Error(
        `Wrong section name when calling setPageSection, please make sure your section name is one of ${Object.keys(
          state.page
        )}`
      );

    _state.page[sectionName] = value;
  },

  setFetchState(_state, { loading, url }) {
    _state.fetchState = {
      loading,
      url,
    };
  },

  /**
   * @param {"POST" | "PUT"} action
   */
  setPageAction(_state, action) {
    _state.pageAction = action;
  },
};

/** Constands */
const SECTION_NAMES = Object.keys(state.page);

const actions = {
  createBlankPage({ commit }) {
    SECTION_NAMES.forEach((sectionName) => {
      const newLine = generateEmptyLine(sectionName, 1);

      commit('setPageSection', { sectionName, value: [newLine] });
    });
  },
  fillPageData({ commit }, sections) {
    // Handles appending a line to a section if the section is empty
    const appendIfEmpty = () => {
      let res = {};

      for (const key in sections) {
        if (!sections[key].length) {
          const newLine = generateEmptyLine(key, 1);
          res[key] = [newLine];
        } else {
          res[key] = sections[key];
        }
      }

      return res;
    };

    const { whatWentWrong, whatWentRight, whatCanBeImproved } = appendIfEmpty();

    commit('setPageSection', {
      sectionName: 'whatWentWrong',
      value: whatWentWrong,
    });
    commit('setPageSection', {
      sectionName: 'whatWentRight',
      value: whatWentRight,
    });
    commit('setPageSection', {
      sectionName: 'whatCanBeImproved',
      value: whatCanBeImproved,
    });
  },
  emptyPage({ commit }) {
    SECTION_NAMES.forEach((sectionName) => {
      commit('setPageSection', { sectionName, value: [] });
    });
  },

  addNewLine({ commit, state }, { sectionName }) {
    const id = generateId();
    const newLine = generateEmptyLine(sectionName, id);

    let section = state.page[sectionName];
    section = [...section, newLine];

    commit('setPageSection', { sectionName, value: section });
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions,
  modules: {},
});
