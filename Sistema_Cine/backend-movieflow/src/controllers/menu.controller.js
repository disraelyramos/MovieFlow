const db = require('../config/db');
const oracledb = require('oracledb');

exports.obtenerMenuPorRol = async (req, res) => {
    const role_id = parseInt(req.params.role_id);

    if (!role_id || isNaN(role_id)) {
        return res.status(400).json({ message: 'ID de rol inválido' });
    }

    let connection;

    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `SELECT
                m.id AS modulo_id,
                m.name AS modulo_name,
                m.icon AS modulo_icon,
                m.route AS modulo_route,
                s.id AS submodulo_id,
                s.name AS submodulo_name,
                s.route AS submodulo_route,
                s.icon AS submodulo_icon
            FROM permisos p
            JOIN modulo m ON p.modulo_id = m.id
            JOIN submodulo s ON p.submodulo_id = s.id
            WHERE p.roles_id = :role_id AND p.active = 1
            ORDER BY m.id, s.id`,
            [role_id],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        const menuEstructurado = [];

        result.rows.forEach(row => {
            const moduloId = Number(row.MODULO_ID);

            let modulo = menuEstructurado.find(m => m.id === moduloId);
            if (!modulo) {
                modulo = {
                    id: moduloId,
                    name: row.MODULO_NAME,
                    icon: row.MODULO_ICON,
                    route: row.MODULO_ROUTE,
                    submodulos: []
                };
                menuEstructurado.push(modulo);
            }

            modulo.submodulos.push({
                id: Number(row.SUBMODULO_ID),
                name: row.SUBMODULO_NAME,
                route: row.SUBMODULO_ROUTE,
                icon: row.SUBMODULO_ICON // ✅ ahora se incluye
            });
        });

        return res.json(menuEstructurado);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener menú' });
    } finally {
        if (connection) await connection.close();
    }
};
