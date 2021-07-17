import express from 'express';
import { DocsController } from '../controller/docs.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, DocsController.getAllDocs);
router.post('/', verifyToken, DocsController.createDoc);
router.put('/', verifyToken, DocsController.editDoc);
router.delete('/:id', verifyToken, DocsController.deleteDoc);

export default router;
