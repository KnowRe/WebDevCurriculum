export const request = async (path, options = {}) => {
  try {
    const res = await fetch(path, {
      credentials: 'include',
      ...options,
    });
    if (res.status === 401) {
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
