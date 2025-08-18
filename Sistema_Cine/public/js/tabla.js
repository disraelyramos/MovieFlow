const API_BASE = 'http://localhost:3001/api';

// ✅ Cargar automáticamente la vista al iniciar sesión
document.addEventListener('DOMContentLoaded', () => {
    cargarVistaUsuarios(); // Se dispara sin hacer clic
});

// ✅ Cargar la vista Blade de usuarios y luego cargar los datos
function cargarVistaUsuarios() {
    console.log('🟢 Ejecutando cargarVistaUsuarios()');

    fetch('//informacion-de-perfil') // Asegúrate que esta ruta existe en Laravel
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(html => {
            console.log('📦 Vista recibida correctamente');
            const contenedor = document.getElementById('detalle-contenido');

            if (!contenedor) {
                console.error('❌ No se encontró el contenedor #detalle-contenido');
                return;
            }

            contenedor.innerHTML = html;

            // Esperar a que la vista se inserte antes de llenar la tabla
            setTimeout(() => {
                if (typeof cargarUsuarios === 'function') {
                    cargarUsuarios();
                } else {
                    console.warn('⚠️ cargarUsuarios() no está definida');
                }
            }, 100);
        })
        .catch(err => {
            console.error('❌ Error al cargar la vista de usuarios:', err);
        });
}

// ✅ Cargar los usuarios en la tabla
async function cargarUsuarios() {
    console.log('📥 Ejecutando cargarUsuarios()');

    try {
        const response = await fetch(`${API_BASE}/usuario/usuario`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log('✅ Datos recibidos del backend:', data);

        const tbody = document.getElementById('tablaUsuarios');
        if (!tbody) {
            console.error('❌ No se encontró el elemento con id="tablaUsuarios"');
            return;
        }

        tbody.innerHTML = '';

        data.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.NOMBRE}</td>
                <td>${usuario.CORREO}</td>
                <td>${usuario.USUARIO}</td>
                <td>********</td>
                <td>${usuario.ESTADO}</td>
                <td>${usuario.ROL}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1">Editar</button>
                    <button class="btn btn-sm btn-danger">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error('❌ Error en cargarUsuarios():', error);
    }
}
