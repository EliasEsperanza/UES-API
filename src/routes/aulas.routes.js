import { Router } from "express";
import {getAulas,getAulaById,createAula,updateAulaById,deleteAulaById} from '../controllers/aulas.controller.js';

const router= new Router();

router.get('/Aulas',getAulas);
router.get('/Aulas/:id',getAulaById);
router.post('/Aulas',createAula);
router.put('/Aulas/:id',updateAulaById);
router.delete('/Aulas/:id',deleteAulaById);

export default router;