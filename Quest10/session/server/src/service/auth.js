import path from 'path';
import { readJson, writeJson } from '../utils/file.js';

const __dirname = path.resolve();
const filePath = `${__dirname}/src/data/user.json`;

export class UserService {
  static async findUser(id) {
    const users = await readJson(filePath);
    const user = users.find(u => u.id === id);
    if (user) {
      return user;
    }
    throw 'no user';
  }
}
