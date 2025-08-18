 @extends('layouts.app')

@section('title', 'Iniciar Sesión')
@section('body-class', 'login-page')

@section('content')
    <div class="container-fluid h-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-lg-10 col-xl-8">
                <div class="login-container row g-0">

                    {{-- Formulario --}}
                    <div class="col-md-6">
                        <div class="login-form-section">
                            <h2 class="login-title">
                                <i class="fas fa-sign-in-alt me-2"></i>
                                Iniciar Sesión
                            </h2>

                            <form id="loginForm" method="POST" novalidate>
                                @csrf
                                <div class="form-group">
                                    <label for="username">Usuario</label>
                                    <input type="text" class="form-control" id="username" name="username">
                                    <div class="invalid-feedback">Campo requerido</div>
                                    <!-- Este div activa el borde rojo con Bootstrap -->
                                </div>

                                <div class="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" class="form-control" id="password" name="password">
                                    <div class="invalid-feedback">Campo requerido</div>
                                </div>

                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="rememberMe">
                                    <label class="form-check-label" for="rememberMe">Recordarme</label>
                                </div>

                                <button type="submit" class="btn btn-login w-100 text-white mb-3">
                                    <i class="fas fa-sign-in-alt me-2"></i>INGRESAR
                                </button>
                            </form>

                            <div class="text-center">
                                <a href="{{ url('/recuperar') }}" class="forgot-password">
                                    <i class="fas fa-key me-1"></i>¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <div class="divider"><span>o continúa con</span></div>

                            <div class="social-login text-center">
                                <button class="btn social-btn">
                                    <i class="fab fa-google text-danger"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {{-- Marca --}}
                    <div class="col-md-6">
                        <div class="brand-section">
                            <div class="floating-elements">
                                <i class="fas fa-film"></i>
                                <i class="fas fa-popcorn"></i>
                                <i class="fas fa-ticket-alt"></i>
                            </div>

                            <div class="cinema-logo">
                                <i class="fas fa-video"></i>
                            </div>

                            <h1 class="brand-title">MovieFlow</h1>
                            <p class="brand-subtitle">Tu experiencia cinematográfica comienza aquí</p>

                            <div class="mt-4">
                                <p class="mb-2"><i class="fas fa-star me-2"></i>Las mejores películas</p>
                                <p class="mb-2"><i class="fas fa-couch me-2"></i>Comodidad premium</p>
                                <p class="mb-0"><i class="fas fa-heart me-2"></i>Momentos inolvidables</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
