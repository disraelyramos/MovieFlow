const bcrypt = require('bcrypt');

async function generarHash() {
    const plainPassword = '74103825'; // puedes cambiarlo
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Contraseña encriptada:', hashedPassword);
}

generarHash();
