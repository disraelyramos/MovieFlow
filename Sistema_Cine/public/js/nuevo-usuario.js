const API_BASE = 'http://localhost:3001/api';

// ✅ Cargar estados y roles al abrir el modal
document.addEventListener('click', async (e) => {
    const boton = e.target.closest('[data-bs-target="#modalNuevoUsuario"]');
    if (!boton) return;

    setTimeout(async () => {
        const estadoSelect = document.getElementById('estado');
        const rolSelect = document.getElementById('rol');
        if (!estadoSelect || !rolSelect) return;

        estadoSelect.innerHTML = '<option value="">Seleccione estado</option>';
        rolSelect.innerHTML = '<option value="">Seleccione rol</option>';

        try {
            const [resEstados, resRoles] = await Promise.all([
                fetch(`${API_BASE}/estados-usuario`),
                fetch(`${API_BASE}/roles`)
            ]);

            const estados = await resEstados.json();
            const roles = await resRoles.json();

            estados.forEach(({ ID, NOMBRE }) => {
                estadoSelect.innerHTML += `<option value="${ID}">${NOMBRE}</option>`;
            });

            roles.forEach(({ ID, NOMBRE }) => {
                rolSelect.innerHTML += `<option value="${ID}">${NOMBRE}</option>`;
            });


            // ✅ Aplicar validaciones a los campos del formulario
            aplicarValidacionesInputs();

        } catch (err) {
            console.error('❌ Error al cargar select:', err);
            estadoSelect.innerHTML = '<option value="">Error</option>';
            rolSelect.innerHTML = '<option value="">Error</option>';
        }
    }, 50); // Esperar DOM del modal
});

// ✅ Evento para guardar usuario
document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'formNuevoUsuario') return;
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value;
    const estado = document.getElementById('estado').value;
    const rol = document.getElementById('rol').value;

    if (!nombre || !correo || !usuario || !contraseña || !estado || !rol) {
        alert('Por favor complete todos los campos.');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, usuario, contraseña, estado, rol })
        });

        const data = await res.json();

        if (res.ok) {
            mostrarAlerta(data.message || 'Usuario registrado con éxito', 'success');
            document.getElementById('formNuevoUsuario').reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalNuevoUsuario'));
            modal.hide();

            
           

        } else {
            mostrarAlerta(data.message || 'Error al registrar el usuario', 'danger');
        }




    } catch (err) {
        console.error('❌ Error al enviar usuario:', err);
        mostrarAlerta('Ocurrió un error al guardar el usuario.', 'danger');
    }
});
