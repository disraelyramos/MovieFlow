document.addEventListener('DOMContentLoaded', () => {
    agregarValidacionLetras('username');

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Limpiar clases previas
        usernameInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');

        let camposVacios = false;

        if (!username) {
            usernameInput.classList.add('is-invalid');
            camposVacios = true;
        }

        if (!password) {
            passwordInput.classList.add('is-invalid');
            camposVacios = true;
        }

        if (camposVacios) return;

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ Guardar el role_id en sessionStorage
                if (result.role_id) {
                    sessionStorage.setItem('role_id', result.role_id);
                }

                mostrarAlerta('Inicio de sesión con éxito', 'success');
                setTimeout(() => window.location.href = "/menu", 1000);
            } else {
                mostrarAlerta(result.message || 'Credenciales inválidas', 'danger');
            }

        } catch (err) {
            mostrarAlerta('Error interno del servidor. Inténtalo más tarde.', 'danger');
            console.error('Error en la petición:', err);
        }
    });
});
