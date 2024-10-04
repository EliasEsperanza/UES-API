import express from 'express';
import cors from 'cors';

import referenciasRoutes from './routes/referencia.routes.js';
import aulasRoutes from './routes/aulas.routes.js';
import aulasReferencias from './routes/aula_referencia.routes.js';
import aulaZonas from './routes/aulas-zonas.routes.js';
import Zonas from './routes/zona.routes.js';
import videosRoutes from './routes/videos.routes.js';
import videosReferencias from './routes/video_referencia.routes.js';
import Fotos from './routes/fotos.routes.js';
import FotosAulaRoutes from './routes/fotos_aula.routes.js';
import FotosReferencias from './routes/FotosReferencias.routes.js';
import aulaVideos from './routes/aula_video.routes.js';
import Fotos from './routes/fotos.routes.js';
import FotosAulaRoutes from './routes/fotos_aula.routes.js';

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
app.use(aulaZonas);
app.use(Zonas);
app.use(videosRoutes);
app.use(videosReferencias);
app.use(FotosReferencias);
app.use(aulaVideos);
app.use(Fotos);
app.use(FotosAulaRoutes);

export default app;
