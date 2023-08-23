import fs from 'node:fs';

fs.readFile('hola.txt', {encoding: 'utf-8'}, function(err, data){
    if(err){
        console.log("Ocurrió un error: ", err);
    }else {
        console.log(data);
    }
});

fs.stat('hola.txt', function(err, stats){
    console.log(stats);
});

fs.mkdir("img/profile", {recursive: true}, function (err, path){
    console.log(path);
});

fs.copyFile('hola.txt', 'img/hola.txt', function(err){
    if(err){
        console.log("No se pudo copiar");
    }else {
        console.log("Renombrado correctamente");
    }
});

// fs.rename('img/hola.txt', 'img/profile/hola.txt', function(err){
//     if(err){
//         console.log("No se pudo copiar");
//     }else {
//         console.log("Copiado correctamente");
//     }
// });

fs.unlink('img/profile/hola.txt', function(err){
    if(err){
        console.log("No se pudo eliminar");
    }else {
        console.log("Eliminado correctamente");
    }
});

fs.writeFile("presentes.csv", "nombre, apellido \n Brian, Lara \n David, Godoy", {encoding: 'utf-8', flag: 'w'}, function(err){
    if(err){
        console.log("No se pudo escribir");
    }else {
        console.log("Se pudo escribir");
    }
});

//readdir devuelve un array de string con cada uno de los archivos/carpetas que encontro, nos da la posibilidad de escanear un directorio y ver lo que hay adentro...
fs.readdir('./', function(err, files){
    console.log(files);
});