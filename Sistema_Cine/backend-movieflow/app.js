const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware CORS
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Middleware para JSON
app.use(express.json());

// Rutas
const authRoutes = require('./src/routes/auth.routes');
const menuRoutes = require('./src/routes/menu.routes');
const usuarioRoutes = require('./src/routes/usuario.routes'); // ✅ Agregado
const estadosRoutes = require('./src/routes/estados.routes');
const rolesRoutes = require('./src/routes/roles.routes');



app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/usuario', usuarioRoutes); // ✅ Agregado
app.use('/api/estados-usuario', estadosRoutes);
app.use('/api/roles', rolesRoutes);



// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

module.exports = app;
