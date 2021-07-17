import path from 'path';
import { readJson, writeJson } from '../utils/file.js';

const __dirname = path.resolve();
const filePath = `${__dirname}/src/data/docs.json`;

export default class {
  static async getDocs() {
    const docs = await readJson(filePath);
    return docs;
  }

  static async getDocsByUserId(id) {
    const docs = await readJson(filePath);
    return docs.filter(doc => doc.user === id);
  }

  static async hasDoc(name) {
    const docs = await this.getDocs();
    const doc = docs.find(doc => doc.name === name);
    return !!doc;
  }

  static async addDoc(doc) {
    console.log('%c [JL] addDoc - doc', 'font-size: 16px; color:  red;', doc);
    const docs = await this.getDocs();
    const docss = await this.setDocs([...docs, doc]);
    console.log('%c [JL] addDoc - docss', 'font-size: 16px; color:  red;', docss);
    return doc;
  }

  static async setDocs(docs) {
    await writeJson(filePath, docs);
    return docs;
  }
}
