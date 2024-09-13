import { Router } from "express";
import { getReferencias, createReferencia, deleteReferenciaById, getReferenciaById, updateReferenciaById } from "../controllers/referencias.controller.js";

const router = Router();

router.get('/referencias', getReferencias);
router.post('/referencias', createReferencia);
router.delete('/referencias/:id', deleteReferenciaById);
router.get('/referencias/:id', getReferenciaById);
router.put('/referencias/:id', updateReferenciaById);

export default router;