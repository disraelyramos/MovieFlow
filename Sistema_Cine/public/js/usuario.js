document.addEventListener('DOMContentLoaded', async () => {
    try {
        await cargarUsuarios();
    } catch (error) {
        mostrarAlertaError('Error al cargar usuarios.');
        console.error(error);
    }
});

async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios'); // Ajusta si cambia la URL
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('La respuesta no es una lista de usuarios');
        }

        const tbody = document.querySelector('#tablaUsuarios tbody');
        tbody.innerHTML = ''; // Limpiar antes de volver a cargar

        data.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.ID}</td>
                <td>${usuario.NOMBRE}</td>
                <td>${usuario.CORREO}</td>
                <td>${usuario.USUARIO}</td>
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
        throw error;
    }
}

function mostrarAlertaError(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger mt-2';
    alerta.role = 'alert';
    alerta.innerText = mensaje;
    document.body.prepend(alerta);
    setTimeout(() => alerta.remove(), 4000);
}
