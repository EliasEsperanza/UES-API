import { Router } from "express";
import {getAulasReferencias,getAulaReferenciaById,createAulaReferencia,updateAulaReferenciaById,deleteAulaReferenciaById} from '../controllers/aula_referencia.controller.js';

const router= new Router();

router.get('/aula_referencias',getAulasReferencias);
router.get('/aulas_referencias/:id', getAulaReferenciaById);
router.post('/aula_referencias',createAulaReferencia);
router.put('/aula_referencias/:id',updateAulaReferenciaById);
router.delete('/aula_referencias/:id',deleteAulaReferenciaById);

export default router;

