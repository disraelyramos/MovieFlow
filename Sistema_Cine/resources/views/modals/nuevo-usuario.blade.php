<div class="modal fade" id="modalNuevoUsuario" tabindex="-1" aria-labelledby="modalNuevoUsuarioLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content shadow">
      <!-- Color actualizado: negro pálido -->
      <div class="modal-header" style="background-color: #1c1c1c; color: white;">
        <h5 class="modal-title" id="modalNuevoUsuarioLabel">
          <i class="fas fa-user-plus me-2"></i> Registrar Nuevo Usuario
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <form id="formNuevoUsuario">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nombre" class="form-label">Nombre</label>
             <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input type="email" class="form-control" id="correo" name="correo" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="usuario" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="usuario" name="usuario" maxlength="9" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="contraseña" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="contraseña" name="contraseña" maxlength="12" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="estado" class="form-label">Estado</label>
              <select class="form-select" id="estado" name="estado" required>
                <option value="">Seleccione estado</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="rol" class="form-label">Rol</label>
              <select class="form-select" id="rol" name="rol" required>
                <option value="">Seleccione rol</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          <i class="fas fa-times me-1"></i> Cancelar
        </button>
        <button type="submit" class="btn btn-primary" form="formNuevoUsuario">
  <i class="fas fa-save me-1"></i> Guardar Usuario
</button>

      </div>
    </div>
  </div>
</div>
