import express from 'express';
import { DocsController } from '../controller/docs.js';

const router = express.Router();

router.get('/', DocsController.getAllDocs);
router.post('/', DocsController.createDoc);
router.put('/', DocsController.editDoc);
router.delete('/:id', DocsController.deleteDoc);

export default router;
