import { Router } from "express";
import {
    getFotosAulas,
    getFotosAulasById,
    getFotosByAulaId,
    createFotoAulaRelation,
    updateFotoAulaRelation
} from '../controllers/Aula_fotos.controller.js';

const router = new Router();

// Obtener todas las relaciones entre aulas y fotos (con cache)
router.get('/aula_fotos', getFotosAulas);

// Obtener una relación específica entre aula y foto
router.get('/aula_fotos/:aula_id/:fotos_id', getFotosAulasById);

// Obtener todas las fotos para un aula específica
router.get('/aulas/:aula_id/fotos', getFotosByAulaId);

// Crear una nueva relación entre aula y foto
router.post('/aula_fotos', createFotoAulaRelation);

// Actualizar una relación específica entre aula y foto
router.put('/aula_fotos/:aula_id/:fotos_id', updateFotoAulaRelation);

export default router;

