//importo el modulo validaciones
import {validarTelefono, validarEmail} from './validaciones.js';
//importo el fs
import fs from 'node:fs';

let listaContactos = [];
let csv;

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

function exportarCSV(listaContactos){
    csv = "Nombre,Telefono,Email\n"; // Encabezados CSV

    // for (contacto of listaContactos) {
    //   csv += `${contacto.nombre},${contacto.telefono},${contacto.email}\n`;
    // }
    listaContactos.forEach((contacto) => {
        
        csv += `${contacto.nombre},${contacto.telefono},${contacto.email}\n`;
    });
    console.log(csv)
    return csv;
}


function guardarCSVEnArchivo(nombreArchivo, csvData) {

  fs.writeFile(nombreArchivo, csvData, {encoding: 'utf-8', flag: 'w'},
  function(err){
    if(err){
        console.log("No se pudo guardar");
    }else {
        console.log(`Archivo "${nombreArchivo}" guardado exitosamente.`);
    }
    });
 
}

// Llamada a la función para generar el CSV y guardarlo en un archivo


agregarContacto("Brian Lara","123-456-7890","blara@email.com");
agregarContacto("Juan Gonzalez", "123-456-7899", "jgonzalez@email.com");
console.log(listaContactos);
agregarContacto("Error No Funciona", "000000", "email-invalido");
console.log(listaContactos);

const csvData = exportarCSV(listaContactos);
guardarCSVEnArchivo("contactos.csv", csvData);

exportarCSV(listaContactos);
console.log(csv)