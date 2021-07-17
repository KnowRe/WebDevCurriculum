const request = async (path, options = {}) => {
  try {
    const res = await fetch(path, options);
    if (!res.ok) {
      throw new Error('request failed');
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export class DocApi {
  static url = 'http://localhost';
  static port = '8000';
  static version = 'v1';
  static path = 'docs';

  static async getDocs() {
    const docs = await request(this.baseApi);
    return docs;
  }

  static async create(name) {
    const doc = await request(this.baseApi, {
      body: JSON.stringify({ name }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return doc;
  }

  static async delete(id) {
    const docs = await request(`${this.baseApi}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return docs;
  }

  static async update(doc) {
    const updatedDoc = await request(this.baseApi, {
      body: JSON.stringify(doc),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return updatedDoc;
  }

  static get baseApi() {
    return `${this.url}:${this.port}/${this.version}/${this.path}`;
  }
}
