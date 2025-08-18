// src/controllers/auth.controller.js
const db = require('../config/db'); // ✅ Importación correcta del módulo con getConnection
const bcrypt = require('bcrypt');
const oracledb = require('oracledb'); // ✅ Necesario para el formato de salida

exports.login = async (req, res) => {
    const { username, password } = req.body;
    let connection;

    try {
        connection = await db.getConnection();

        // Consulta a Oracle con TRIM + LOWER para evitar errores por espacios o mayúsculas
        const result = await connection.execute(
            `SELECT usuario, password_hash, estado, role_id 
             FROM usuarios 
             WHERE TRIM(LOWER(usuario)) = TRIM(LOWER(:usuario))`,
            [username],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Validación: ¿existe el usuario?
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // Validación de contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, user.PASSWORD_HASH);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Validación de estado activo
        if (user.ESTADO !== 1) {
            return res.status(403).json({ message: 'Usuario inactivo' });
        }

        // ✅ Actualizar campo ultimo_login con la hora del servidor Oracle
        await connection.execute(
            `UPDATE usuarios 
             SET ultimo_login = SYSTIMESTAMP 
             WHERE TRIM(LOWER(usuario)) = TRIM(LOWER(:usuario))`,
            [username],
            { autoCommit: true }
        );

        // Éxito
        return res.json({
            message: 'Inicio de sesión exitoso',
            role_id: user.ROLE_ID
        });

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};
