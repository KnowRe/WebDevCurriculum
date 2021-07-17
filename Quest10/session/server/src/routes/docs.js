import express from 'express';
import { DocsController } from '../controller/docs.js';
import { authGuard } from '../middleware/authGuard.js';

const router = express.Router();

router.get('/', authGuard, DocsController.getAllDocs);
router.post('/', authGuard, DocsController.createDoc);
router.put('/', authGuard, DocsController.editDoc);
router.delete('/:id', authGuard, DocsController.deleteDoc);

export default router;
