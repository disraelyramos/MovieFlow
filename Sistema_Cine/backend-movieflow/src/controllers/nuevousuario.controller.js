const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registrarUsuario = async (req, res) => {
  const { nombre, correo, usuario, contraseña, estado, rol } = req.body;

  if (!nombre || !correo || !usuario || !contraseña || estado === undefined || !rol) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `SELECT COUNT(*) AS total FROM usuarios WHERE usuario = :usuario`,
      [usuario],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );

    if (result.rows[0].TOTAL > 0) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const password_hash = await bcrypt.hash(contraseña, 10);

    await connection.execute(
      `INSERT INTO usuarios (nombre, correo, usuario, password_hash, estado, role_id)
       VALUES (:nombre, :correo, :usuario, :password_hash, :estado, :rol)`,
      { nombre, correo, usuario, password_hash, estado, rol },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });

// Reemplaza esto dentro del catch:
} catch (error) {
  console.error('❌ Error al registrar usuario:', error); // <-- importante
  res.status(500).json({ message: 'Error del servidor', error: error.message });
}



   finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar conexión:', err);
      }
    }
  }
};
