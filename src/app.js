import express from 'express';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

export default app;