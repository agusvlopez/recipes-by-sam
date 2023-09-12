function validarTelefono(telefono) {
    const telefonoRegex = /^\d{3}-\d{3}-\d{4}$/; // Asumiendo que el formato válido es asi:  “123-456-7890”
  
    return telefonoRegex.test(telefono);
}

function validarEmail(email){

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    return emailRegex.test(email);
    
}

 export {
    validarTelefono,
    validarEmail
}

console.log(validarTelefono("123-456-7890"));
console.log(validarEmail("blara@email.com"));