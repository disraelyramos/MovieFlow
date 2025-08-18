document.addEventListener('DOMContentLoaded', async () => {
    const menuList = document.getElementById('menu-list');
    const detalleContenido = document.getElementById('detalle-contenido');
    const roleId = sessionStorage.getItem('role_id');

    if (!roleId) {
        mostrarAlerta('Rol no encontrado en sesión', 'danger');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/menu/${roleId}`);
        const modulos = await response.json();

        menuList.innerHTML = ''; // Limpiar menú anterior

        modulos.forEach(modulo => {
            const liModulo = document.createElement('li');
            liModulo.classList.add('nav-item');

            const moduloLabel = document.createElement('span');
            moduloLabel.classList.add('nav-link', 'fw-bold', 'text-white', 'text-uppercase');
            moduloLabel.innerHTML = `<i class="fas ${modulo.icon} me-2"></i>${modulo.name}`;
            liModulo.appendChild(moduloLabel);

            if (modulo.submodulos?.length) {
                const ulSub = document.createElement('ul');
                ulSub.classList.add('nav', 'flex-column', 'ms-3');
                const subIdsRenderizados = new Set();

                modulo.submodulos.forEach(sub => {
                    if (!subIdsRenderizados.has(sub.id)) {
                        subIdsRenderizados.add(sub.id);

                        const liSub = document.createElement('li');
                        liSub.classList.add('nav-item');

                        const subLink = document.createElement('a');
                        subLink.classList.add('nav-link');
                        subLink.href = '#';
                        subLink.textContent = sub.name.replace(/_/g, ' ');

                        subLink.addEventListener('click', async (e) => {
                            e.preventDefault();

                            try {
                                const timestamp = Date.now();
                                const rutaVista = `${sub.route}?t=${timestamp}`;
                                const vistaResponse = await fetch(rutaVista);
                                if (!vistaResponse.ok) throw new Error('Error HTTP ' + vistaResponse.status);

                                const html = await vistaResponse.text();
                                detalleContenido.innerHTML = html;

                                // Inyectar JS solo si la vista lo necesita
                                if (sub.route.includes('informacion-de-perfil')) {
                                    const script = document.createElement('script');
                                    script.src = '/js/nuevo-usuario.js';
                                    script.defer = true;
                                    script.onload = () => console.log('✅ Script nuevo-usuario.js cargado');
                                    document.body.appendChild(script);
                                }

                            } catch (error) {
                                console.error('❌ Error al cargar la vista:', error);
                                mostrarAlerta('No se pudo cargar la vista seleccionada', 'danger');
                                detalleContenido.innerHTML = `
                                    <div class="alert alert-danger">Error al cargar el contenido</div>
                                `;
                            }
                        });

                        liSub.appendChild(subLink);
                        ulSub.appendChild(liSub);
                    }
                });

                liModulo.appendChild(ulSub);
            }

            menuList.appendChild(liModulo);
        });

    } catch (err) {
        console.error('❌ Error al cargar menú:', err);
        mostrarAlerta('Error al cargar el menú', 'danger');
    }
});
