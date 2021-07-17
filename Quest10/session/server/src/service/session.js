import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson } from '../utils/file.js';

const __dirname = path.resolve();
const filePath = `${__dirname}/src/data/session.json`;

export class SessionService {
  static async getSessions() {
    return await readJson(filePath);
  }

  static async createSession(id) {
    const session = {
      sid: uuidv4(),
      id: id,
    };
    try {
      if (await this.findSessionById(id)) {
        await this.removeSessionById(id);
      }
      const sessions = await this.getSessions();
      await this.setSessions([...sessions, session]);
      return session.sid;
    } catch (e) {
      console.error(e);
    }
  }

  static async findSessionById(id) {
    const sessions = await this.getSessions();
    const session = sessions.find(session => (session.id = id));
    return session ?? null;
  }

  static async findSessionBySid(sid) {
    const sessions = await this.getSessions();
    const session = sessions.find(session => (session.sid = sid));
    return session ?? null;
  }

  static async setSessions(sessions) {
    await writeJson(filePath, sessions);
    return sessions;
  }

  static async removeSessionById(id) {
    const sessions = await this.getSessions();
    const index = sessions.findIndex(session => session.id === id);
    const newSessions = [
      ...sessions.slice(0, index),
      ...sessions.slice(index + 1, sessions.length),
    ];
    if (index >= 0) {
      await this.setSessions(newSessions);
    }
  }

  static async removeSessionBySid(sid) {
    const sessions = await this.getSessions();
    const index = sessions.findIndex(session => session.sid === sid);
    const newSessions = [
      ...sessions.slice(0, index),
      ...sessions.slice(index + 1, sessions.length),
    ];
    if (index >= 0) {
      await this.setSessions(newSessions);
    }
  }
}
