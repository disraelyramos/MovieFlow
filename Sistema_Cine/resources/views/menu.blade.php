@extends('layouts.app')

@section('title', 'Menú Principal')
@section('body-class', '')

@section('content')
<div class="menu-wrapper d-flex">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <h6>CINEPELIZ</h6>
        </div>
        <ul id="menu-list" class="nav flex-column">
            <!-- Menú dinámico generado por JavaScript -->
            <li class="nav-item">
                <a href="javascript:void(0)" onclick="cargarVistaUsuarios()" class="nav-link">
                    <i class="fas fa-users me-2"></i> Usuarios
                </a>
            </li>
        </ul>
    </aside>

    <!-- Contenido dinámico (Panel derecho) -->
    <div id="detalle-contenido" class="flex-grow-1 p-4">
        <!-- Aquí se cargará 'informacion-de-perfil.blade.php' -->
    </div>
</div>
@endsection
