const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./src/routes/auth.routes');
const authGoogleRoutes = require('./src/routes/authGoogle.routes');
const menuRoutes = require('./src/routes/menu.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const estadosRoutes = require('./src/routes/estados.routes');
const rolesRoutes = require('./src/routes/roles.routes');
const asignarMenuRoutes = require('./src/routes/asignarmenu.routes');
const categoriasRoutes = require('./src/routes/categorias.routes'); // ✅ Añadido
const clasificacionesRoutes = require('./src/routes/clasificaciones.routes');
const peliculasRoutes = require('./src/routes/peliculas.routes');

// Ruta base
app.get('/', (req, res) => {
  res.send('API CinePeliz funcionando correctamente 🎬');
});

// Rutas
app.use('/login', authRoutes);
app.use('/api/login-google', authGoogleRoutes);
app.use('/api', menuRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api', asignarMenuRoutes);
app.use('/api', categoriasRoutes); // ✅ Añadido
app.use('/api/clasificaciones', clasificacionesRoutes);
app.use('/api', peliculasRoutes);


// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
