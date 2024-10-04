import { Router } from "express";
import {getAulasReferencias,getAulaReferenciaById,createAulaReferencia,updateAulaReferenciaById,deleteAulaReferenciaById, getReferenciasByAulaId} from '../controllers/aula_referencia.controller.js';

const router= new Router();

router.get('/aula_referencias',getAulasReferencias);
router.get('/aulas_referencias/:aula_id/:referencia_id', getAulaReferenciaById);
router.get('/aulas/:aula_id/referencias', getReferenciasByAulaId);

router.post('/aula_referencias',createAulaReferencia);
router.put('/aula_referencias/:id',updateAulaReferenciaById);
router.delete('/aula_referencias/:id',deleteAulaReferenciaById);

export default router;

