<?php


use Illuminate\Support\Facades\Route;




Route::get('/', function () {
    return redirect('/login');
});

// Ruta al login (ahora con nombre)
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

// Ruta a recuperación de contraseña
Route::get('/recuperar', function () {
    return view('auth.recuperar'); // resources/views/auth/recuperar.blade.php
})->name('recuperar');

Route::get('/menu', function () {
    return view('menu');
})->name('menu');

Route::get('/components/informacion-de-perfil', function () {
    return view('components.informacion-de-perfil');
});

// routes/web.php
Route::get('/roles/registrar', function () {
    return view('components.informacion-de-perfil');
});
