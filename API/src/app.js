import express, { json } from 'express';
// exportar modulos
import morgan from 'morgan';
// importing routes
import usuarioRoutes from './routes/usuario';

const app = express();

// configurar mirawares
app.use(morgan('dev')); //
app.use(json()); // cuando el cliente envie un json el servidor pueda entender

// routes
app.use('/api/usuario', usuarioRoutes); // cada que visiten, colo quen prefijo, => api

export default app;