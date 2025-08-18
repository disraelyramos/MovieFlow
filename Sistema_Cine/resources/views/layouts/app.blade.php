<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'CinePeliz')</title>

    {{-- Estilos externos --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    {{-- Estilos personalizados --}}
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
    <link href="{{ asset('css/recuperar.css') }}" rel="stylesheet">
    <link href="{{ asset('css/menu.css') }}" rel="stylesheet">
        <link href="{{ asset('css/perfil.css') }}" rel="stylesheet">

    {{-- Estilos adicionales desde vistas --}}
    @stack('styles')
</head>

<body class="@yield('body-class')">

    {{-- Contenido dinámico --}}
    @yield('content')

    {{-- Scripts externos --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    {{-- Scripts personalizados --}}
    <script src="{{ asset('js/login.js') }}"></script>
    <script src="{{ asset('js/recuperar.js') }}"></script>
    <script src="{{ asset('js/alertas.js') }}"></script>
    <script src="{{ asset('js/menu.js') }}"></script>
    <script src="{{ asset('js/perfil.js') }}"></script>
     <script src="{{ asset('js/nuevo-usuario.js') }}"></script>
       <script src="{{ asset('js/tabla.js') }}"></script>

    {{-- Scripts adicionales desde vistas --}}
    @stack('scripts')
</body>

</html>
