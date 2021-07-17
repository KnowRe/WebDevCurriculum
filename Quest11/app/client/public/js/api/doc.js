import { request } from './index.js';

export class DocApi {
  static url = 'http://localhost';
  static port = '8000';
  static version = 'v1';
  static path = 'docs';

  static async getDocs() {
    const res = await request(this.baseApi);
    return await res.json();
  }

  static async create(name) {
    const res = await request(this.baseApi, {
      body: JSON.stringify({ name }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }

  static async delete(id) {
    const res = await request(`${this.baseApi}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }

  static async update(doc) {
    const res = await request(this.baseApi, {
      body: JSON.stringify(doc),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }

  static get baseApi() {
    return `${this.url}:${this.port}/${this.version}/${this.path}`;
  }
}
