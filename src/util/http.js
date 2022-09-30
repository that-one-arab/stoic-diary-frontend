import { LOGIN_ROUTE } from '@/constants/routes';
import router from '@/router';
import store from '@/store';

async function get(url, options) {
  try {
    store.commit('setFetchState', { loading: true, url });
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    store.commit('setFetchState', { loading: false, url });

    if (
      data.status_code === 403 &&
      data.details === 'Please authenticate yourself by logging in'
    ) {
      if (!options?.preventLoginRedirection)
        router.push(`${LOGIN_ROUTE}?requireLogin=true`);
      return {
        success: false,
      };
    }

    return data;
  } catch (error) {
    store.commit('setFetchState', { loading: false, url });

    console.error(error);
    return {
      success: false,
      details: 'An error occurred while fetching data to server',
      errors: ['An error occurred while fetching data to server'],
      status_code: 500,
    };
  }
}

async function post(url, body) {
  try {
    store.commit('setFetchState', { loading: true, url });

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    store.commit('setFetchState', { loading: false, url });

    if (
      data.status_code === 403 &&
      data.details === 'Please authenticate yourself by logging in'
    ) {
      router.push(`${LOGIN_ROUTE}?requireLogin=true`);
      return {
        success: false,
      };
    }

    return data;
  } catch (error) {
    store.commit('setFetchState', { loading: false, url });

    console.error(error);
    return {
      success: false,
      details: 'An error occurred while fetching data to server',
      errors: ['An error occurred while fetching data to server'],
      status_code: 500,
    };
  }
}

async function put(url, body) {
  try {
    store.commit('setFetchState', { loading: true, url });

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    store.commit('setFetchState', { loading: false, url });

    if (
      data.status_code === 403 &&
      data.details === 'Please authenticate yourself by logging in'
    ) {
      router.push(`${LOGIN_ROUTE}?requireLogin=true`);
      return {
        success: false,
      };
    }

    return data;
  } catch (error) {
    store.commit('setFetchState', { loading: false, url });

    console.error(error);
    return {
      success: false,
      details: 'An error occurred while fetching data to server',
      errors: ['An error occurred while fetching data to server'],
      status_code: 500,
    };
  }
}

export default { get, post, put };
