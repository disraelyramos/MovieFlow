<div class="container-fluid py-4">
    <div class="bg-white p-4 rounded shadow">

        <h5 class="mb-4 text-primary">
            <i class="fas fa-users me-2"></i> Información de Usuarios
        </h5>

        <div class="d-flex justify-content-between align-items-center mb-3">
            <input type="text" id="buscarUsuario" class="form-control w-50" placeholder="🔍 Buscar usuario...">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalNuevoUsuario">
                <i class="fas fa-user-plus me-1"></i> Nuevo
            </button>
        </div>

        <div class="table-responsive">
            <table class="table table-hover table-bordered text-center align-middle">
                <thead class="table-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Estado</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaUsuarios">
                    {{-- Se llena dinámicamente con tabla.js --}}
                </tbody>
            </table>
        </div>
    </div>

    {{-- Modal para nuevo usuario --}}
    @include('modals.nuevo-usuario')

</div>

{{-- ✅ Asegúrate de que este script esté en tu layout principal --}}
{{-- <script src="{{ asset('js/tabla.js') }}"></script> --}}
