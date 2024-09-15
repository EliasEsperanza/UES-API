import { Router } from "express";
import {getAulasReferencias,getAulaReferenciaById,createAulaReferencia,updateAulaReferenciaById,deleteAulaReferenciaById} from '../controllers/aula_referencia.controller';

const routerAulaReferencia= new Router();

routerAulaReferencia.get('/aula_referencias',getAulasReferencias);
routerAulaReferencia.get('/aula_referencias/:id',getAulaReferenciaById);
routerAulaReferencia.post('/aula_referencias',createAulaReferencia);
routerAulaReferencia.put('/aula_referencias/:id',updateAulaReferenciaById);
routerAulaReferencia.delete('/aula_referencias/:id',deleteAulaReferenciaById);

export default routerAulaReferencia;

