/**
 * Muestra una alerta Bootstrap en la esquina superior derecha.
 * @param {string} mensaje - Texto a mostrar.
 * @param {'success' | 'danger' | 'warning' | 'info'} tipo - Tipo de alerta.
 */
function mostrarAlerta(mensaje, tipo = 'danger') {
    const alertaExistente = document.querySelector('.alert.custom-alert');
    if (alertaExistente) alertaExistente.remove();

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} custom-alert alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 300);
    }, 5000);
}

/**
 * Validación: solo letras y espacios
 */
function validarSoloLetras(e) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
}

/**
 * Validación: usuario solo letras (máx. 9)
 */
function validarUsuario(e) {
    const regex = /^[a-zA-Z]{0,9}$/;
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 9);
    }
}

/**
 * Validación: contraseña máx. 12 caracteres
 */
function validarContraseña(e) {
    if (e.target.value.length > 12) {
        e.target.value = e.target.value.slice(0, 12);
    }
}

/**
 * Validación: correo electrónico con formato simple
 */
function validarCorreo(e) {
    const correo = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !regex.test(correo)) {
        e.target.setCustomValidity('Formato de correo inválido');
    } else {
        e.target.setCustomValidity('');
    }
}

/**
 * Aplicar validadores a inputs por ID
 */
function aplicarValidacionesInputs() {
    agregarValidacionLetras('nombre');
    const usuario = document.getElementById('usuario');
    const correo = document.getElementById('correo');
    const pass = document.getElementById('contraseña');

    if (usuario) usuario.addEventListener('input', validarUsuario);
    if (correo) correo.addEventListener('input', validarCorreo);
    if (pass) pass.addEventListener('input', validarContraseña);
}

function agregarValidacionLetras(idInput) {
    const input = document.getElementById(idInput);
    if (input) {
        input.addEventListener('input', validarSoloLetras);
    }
}
