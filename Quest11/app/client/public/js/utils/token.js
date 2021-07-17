export class TokenManager {
  static tokenKey = 'accessToken';

  static setToken(token) {
    window.localStorage.setItem('accessToken', token);
  }
  static getToken() {
    return window.localStorage.getItem(this.tokenKey);
  }
  static clearToken() {
    if (this.getToken()) {
      window.localStorage.removeItem(this.tokenKey);
    }
  }
}
