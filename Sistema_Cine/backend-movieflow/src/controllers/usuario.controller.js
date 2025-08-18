const db = require('../config/db');
const oracledb = require('oracledb');

exports.getUsuarios = async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `SELECT u.ID, u.NOMBRE, u.CORREO, u.USUARIO, u.PASSWORD_HASH,
              e.NOMBRE AS ESTADO, r.NOMBRE AS ROL
       FROM usuarios u
       JOIN estados_usuario e ON u.estado = e.id
       JOIN roles r ON u.role_id = r.id`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);

  } catch (err) {
    console.error('❌ Error al obtener usuarios:');
    console.error('📄 Mensaje:', err.message);
    console.error('📌 Stack:', err.stack);
    res.status(500).json({ message: 'Error del servidor' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('❌ Error al cerrar conexión:', closeErr.message);
      }
    }
  }
};
