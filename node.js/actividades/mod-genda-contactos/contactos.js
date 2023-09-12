//importo el modulo validaciones
import {validarTelefono, validarEmail} from './validaciones.js';

let listaContactos = [];

function agregarContacto(nombre, telefono, email) {
    
    let contactoNuevo = {
        nombre: "",
        telefono: "",
        email: ""
    };

    let telValidado = validarTelefono(telefono);
    let emailValidado = validarEmail(email);

    if(telValidado && emailValidado){
        
        contactoNuevo["nombre"] = nombre;
        contactoNuevo["telefono"] = telefono;
        contactoNuevo["email"] = email;
    
        listaContactos.push(contactoNuevo);
    }else {
        return console.log(`No se pudo agregar el contacto porque los datos o algun dato estan incorrecto/s`);
    }
}


agregarContacto("Brian Lara","123-456-7890","blara@email.com");
agregarContacto("Juan Gonzalez", "123-456-7899", "jgonzalez@email.com");
console.log(listaContactos);
agregarContacto("Error No Funciona", "000000", "email-invalido");
console.log(listaContactos);