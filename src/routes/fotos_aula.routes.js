import { Router } from "express";
import {
    getFotosAulas,
    getFotosAulasById,
    getFotosByAulaId,
    createFotosAulas,
    updateFotosAulasById,
    deleteFotosAulasById
} from '../controllers/aula_fotos_controller.js';

const router = new Router();

router.get('/aula_fotos', getFotosAulas);
router.get('/aulas_fotos/:aula_id/:fotos_id', getFotosAulasById);
router.get('/aulas/:aula_id/fotos', getFotosByAulaId);
router.post('/aula_fotos', createFotosAulas);
router.put('/aula_fotos/:aula_id/:fotos_id', updateFotosAulasById);
router.delete('/aula_fotos/:aula_id/:fotos_id', deleteFotosAulasById);

export default router;
