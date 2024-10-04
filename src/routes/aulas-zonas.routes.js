import { Router } from "express";
import { 
    get_Aulas_Zonas, 
    get_Aula_Zonas_ById, 
    create_Aula_Zonas, 
    update_Aula_Zona_ById, 
    delete_Aula_Zona_ById 
} from '../controllers/Aula_Zonas.controller.js';

const router = new Router();

router.get('/aulas_zonas', get_Aulas_Zonas);
router.get('/aulas_zonas/:aula_id/:zona_id', get_Aula_Zonas_ById);
router.post('/aulas_zonas', create_Aula_Zonas);
router.put('/aulas_zonas/:aula_id/:zona_id', update_Aula_Zona_ById);
router.delete('/aulas_zonas/:aula_id/:zona_id', delete_Aula_Zona_ById);

export default router;
