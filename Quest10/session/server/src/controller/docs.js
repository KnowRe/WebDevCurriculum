import { v4 as uuidv4 } from 'uuid';
import DocService from '../service/localDoc.js';
import { validateDoc } from '../utils/validator.js';

export class DocsController {
  static async getAllDocs(req, res, next) {
    try {
      const docs = await DocService.getDocsByUserId(req.user);
      res.status(200).json(docs);
    } catch (e) {
      next(e);
    }
  }

  static async createDoc(req, res, next) {
    try {
      const doc = req.body;
      if (await DocService.hasDoc(doc.name)) {
        res.status(409);
        return next(Error('existed'));
      }
      const newDoc = await DocService.addDoc({
        name: doc.name,
        text: '',
        id: uuidv4(),
        user: req.user,
      });
      res.status(200).json(newDoc);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  static async deleteDoc(req, res, next) {
    try {
      const { id } = req.params;

      const docs = await DocService.getDocs();
      const index = docs.findIndex(doc => doc.id === id);
      if (index < 0) {
        res.status(400);
        return next(Error('Doc does not exist'));
      }
      const removedDocs = await DocService.setDocs([
        ...docs.slice(0, index),
        ...docs.slice(index + 1, docs.length),
      ]);

      res.status(200).json(removedDocs);
    } catch (e) {
      next(e);
    }
  }

  static async editDoc(req, res, next) {
    try {
      const doc = req.body;
      if (!validateDoc(doc)) {
        res.status(400);
        return next(Error('error'));
      }
      const { id } = doc;

      const docs = await DocService.getDocs();
      const index = docs.findIndex(doc => doc.id === id);
      if (index < 0) {
        res.status(400);
        return next(Error('Doc does not exist'));
      }
      const newDoc = {
        ...docs[index],
        ...doc,
      };
      const editedDocs = [...docs.slice(0, index), newDoc, ...docs.slice(index + 1, docs.length)];
      await DocService.setDocs(editedDocs);

      res.status(200).json(newDoc);
    } catch (e) {
      next(e);
    }
  }
}
