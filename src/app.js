import express from 'express';
import cors from 'cors';

import referenciasRoutes from './routes/referencia.routes.js';
import aulasRoutes from './routes/aulas.routes.js';
import aulasReferencias from './routes/aula_referencia.routes.js';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(referenciasRoutes);
app.use(aulasRoutes);
app.use(aulasReferencias);

export default app;