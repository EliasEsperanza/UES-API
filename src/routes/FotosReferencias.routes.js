import { Router } from "express";
import {getFotoReferencias,getFotoReferenciaById,getFotoReferenciaByReferenciaId} from '../controllers/FotosReferencias.controller.js';

const router= new Router();

router.get('/FotoReferencias',getFotoReferencias);
router.get('/FotoReferencias/:id',getFotoReferenciaById);
router.put('/FotoReferencias/:referencia_id',getFotoReferenciaByReferenciaId);

export default router;