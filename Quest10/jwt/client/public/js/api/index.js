import { TokenManager } from '../utils/token.js';

export const request = async (path, options = {}) => {
  try {
    const token = TokenManager.getToken();
    const fetchOptions = {
      headers: {},
      credentials: 'include',
      ...options,
    };

    Object.assign(fetchOptions.headers, {
      Authorization: token,
    });

    const res = await fetch(path, fetchOptions);
    if (res.status === 401) {
      TokenManager.clearToken();
      document.location.href = '/login';
    }
    if (!res.ok) {
      throw new Error('request failed');
    }

    return res;
  } catch (e) {
    console.error(e);
  }
};
