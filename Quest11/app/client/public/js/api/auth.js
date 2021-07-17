import { request } from './index.js';

export class AuthApi {
  static url = 'http://localhost';
  static port = '8000';
  static version = 'v1';
  static path = 'auth';

  static async login(payload) {
    const user = await request(`${this.baseApi}/login`, {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return user;
  }

  static async logout() {
    const res = await request(`${this.baseApi}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.text();
  }

  static async whoami() {
    const res = await request(`${this.baseApi}/whoami`);
    return await res.json();
  }

  static get baseApi() {
    return `${this.url}:${this.port}/${this.version}/${this.path}`;
  }
}
