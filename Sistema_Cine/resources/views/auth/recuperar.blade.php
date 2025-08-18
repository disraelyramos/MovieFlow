@extends('layouts.app')

@section('title', 'Recuperar Contraseña')

@section('body-class', 'login-page')

@section('content')
    <div class="container-fluid h-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-lg-10 col-xl-8">
                <div class="login-container row g-0">

                    {{-- Formulario de recuperación --}}
                    <div class="col-md-6">
                        <div class="login-form-section">

                            {{-- Indicador de pasos --}}
                            <div class="step-indicator mb-3">
                                <div class="step active" id="step1">1</div>
                                <div class="step-line" id="line1"></div>
                                <div class="step" id="step2">2</div>
                                <div class="step-line" id="line2"></div>
                                <div class="step" id="step3">✓</div>
                            </div>

                            <h2 class="login-title">
                                <i class="fas fa-key me-2"></i>Recuperar Contraseña
                            </h2>

                            {{-- Paso 1 --}}
                            <div id="requestSection">
                                <p class="form-subtitle">Ingresa tu usuario y correo para enviarte un código</p>
                                <form id="requestForm">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="username" placeholder="Usuario"
                                            required>
                                        <label for="username"><i class="fas fa-user me-2"></i>Usuario</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="email"
                                            placeholder="Correo electrónico" required>
                                        <label for="email"><i class="fas fa-envelope me-2"></i>Correo electrónico</label>
                                    </div>
                                    <button type="submit" class="btn btn-login w-100 text-white mb-3">
                                        <i class="fas fa-paper-plane me-2"></i>GENERAR CÓDIGO
                                    </button>
                                </form>
                            </div>

                            {{-- Paso 2 --}}
                            <div id="verifySection" class="code-section d-none">
                                <p class="form-subtitle">Hemos enviado un código de 6 dígitos a tu correo</p>
                                <div class="timer mb-3 text-center">
                                    <i class="fas fa-clock me-2"></i>
                                    <span id="countdown">02:00</span>
                                </div>
                                <form id="verifyForm">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control text-center" id="verificationCode"
                                            maxlength="6" placeholder="Código" required
                                            style="font-size: 1.5rem; letter-spacing: 0.5rem;">
                                        <label for="verificationCode"><i class="fas fa-shield-alt me-2"></i>Código</label>
                                    </div>
                                    <div class="row g-2">
                                        <div class="col-6">
                                            <button type="submit" class="btn btn-success w-100 text-white">
                                                <i class="fas fa-check me-2"></i>VERIFICAR
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button type="button" class="btn btn-secondary w-100 text-white"
                                                id="cancelBtn">
                                                <i class="fas fa-times me-2"></i>CANCELAR
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div class="text-center mt-3">
                                    <button class="btn btn-link text-decoration-none" id="resendBtn" disabled>
                                        <i class="fas fa-redo me-1"></i>Reenviar código
                                    </button>
                                </div>
                            </div>

                            {{-- Mensaje de éxito --}}
                            <div id="successMessage" class="success-message d-none text-center mt-4">
                                <i class="fas fa-check-circle fa-2x mb-3 text-success"></i>
                                <h4>¡Código verificado!</h4>
                                <p>Revisa tu correo para crear tu nueva contraseña.</p>
                            </div>

                            {{-- Volver al login --}}
                            <div class="text-center mt-4">
                                <a href="{{ route('login') }}" class="forgot-password" id="backToLogin">
                                    <i class="fas fa-arrow-left me-2"></i>Volver al login
                                </a>

                            </div>

                        </div>
                    </div>

                    {{-- Marca CinePeliz --}}
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
                                <p><i class="fas fa-shield-alt me-2"></i>Seguridad garantizada</p>
                                <p><i class="fas fa-clock me-2"></i>Recuperación rápida</p>
                                <p><i class="fas fa-user-lock me-2"></i>Datos protegidos</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
