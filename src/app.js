import express, { json } from 'express';
import morgan from 'morgan';
// importing routes
import usuarioRoutes from './routes/usuario';

const app = express();

// configurar mirawares
app.use(morgan('dev')); //
app.use(json()); // cuando el cliente envie un json el servidor pueda entender

// routes
app.use('/api/usuario', usuarioRoutes); // cada que visiten, solo con prefijo, => api

export default app;