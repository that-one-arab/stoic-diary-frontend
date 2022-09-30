import store from '@/store';

const ERR_HEADER = 'An error occurred';
const ERR_BODY = 'Please try again later';
/**
 * @description an abstraction of `this.$store.commit`. Handles displaying a UI error for the user
 * @param {object} options optional parameter, specifies the header and body text
 */
function showError({ header, body } = { header: ERR_HEADER, body: ERR_BODY }) {
  store.commit('showSnackbar', {
    header,
    body,
    variant: 'error',
  });
}

export default { showError };
