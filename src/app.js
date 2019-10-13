import express, { json } from 'express';
import morgan from 'morgan';
var fileUpload = require('express-fileupload');
// var express = require('express');
var app = express();

// configurar mirawares
app.use(morgan('dev')); //
app.use(json()); // cuando el cliente envie un json el servidor pueda entender
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// routes
app.use('/api/usuario', require('./routes/usuario')); // cada que visiten, solo con prefijo, => api
// app.use('/api/categoria', require('./routes/categoria'));
// app.use('/api/top', require('./routes/top'));
export default app;