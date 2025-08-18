const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      'SELECT id, nombre FROM roles',
      [],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener roles:', err);
    res.status(500).json({ message: 'Error al obtener roles' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
