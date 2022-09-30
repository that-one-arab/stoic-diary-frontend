const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/api'
    : 'https://stoicdiary.app/api';

/** User related */
export const LOGIN_URL = BASE_URL + '/login'; // POST
export const REGISTER_URL = BASE_URL + '/register'; // POST
export const GET_USER_URL = BASE_URL + '/user'; // GET
export const SIGNOUT_URL = BASE_URL + '/signout'; // GET
export const CHANGE_USERNAME_URL = BASE_URL + '/change-username'; // POST
export const CHANGE_PASSWORD_URL = BASE_URL + '/change-password'; // POST
export const DELETE_ACCOUNT_URL = BASE_URL + '/destroy-account'; // POST
export const REQUEST_RESET_PASSWORD_URL = BASE_URL + '/request-reset-password'; // POST
export const VERIFY_RESET_PASSWORD_TOKEN_URL =
  BASE_URL + '/verify-reset-password-token'; // POST

export const RESET_PASSWORD_URL = BASE_URL + '/reset-password'; // POST

/** Page related */
export const GET_PAGE_URL = (date) => BASE_URL + `/page?date=${date}`; // GET
export const CREATE_PAGE_URL = BASE_URL + '/pages'; // POST
export const UPDATE_PAGE_URL = BASE_URL + '/pages'; // PUT
export const SUGGESTIONS_AUTOCOMPLETE_URL = BASE_URL + '/autocomplete'; // POST
