import { Router } from "express";
import {
    getFotosAulas,
    getFotosAulasById,
    getFotosByAulaId,
    createFotosAulas,
    updateFotosAulasById,
    deleteFotosAulasById
} from '../controllers/Aula_fotos_controller.js';

const router = new Router();

// Obtener todas las relaciones entre aulas y fotos (con cache)
router.get('/aula_fotos', getFotosAulas);

// Obtener una relación específica entre aula y foto
router.get('/aula_fotos/:aula_id/:fotos_id', getFotosAulasById);

// Obtener todas las fotos para un aula específica
router.get('/aulas/:aula_id/fotos', getFotosByAulaId);

// Crear una nueva relación entre aula y foto
router.post('/aula_fotos', createFotosAulas);

// Actualizar una relación específica entre aula y foto
router.put('/aula_fotos/:aula_id/:fotos_id', updateFotosAulasById);

// Eliminar una relación específica entre aula y foto (faltaba en el controlador)
router.delete('/aula_fotos/:aula_id/:fotos_id', deleteFotosAulasById);

export default router;
