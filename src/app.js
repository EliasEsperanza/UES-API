import express from 'express';
import cors from 'cors';

import referenciasRoutes from './routes/referencia.routes.js';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(referenciasRoutes);

export default app;