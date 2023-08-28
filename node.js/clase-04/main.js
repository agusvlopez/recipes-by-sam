//importo el http para crear el servidor..
import http from 'node:http';
import fs from 'node:fs';
//createServer() es la funcion que nos permite crear el servidor
//Aca le puedo pasar una funcion como parametro(callback) que se ejecuta cuando alguien se conecta. En este funcion se envian dos parametros: request(req), toda toda la info que se esta solicitando(de la consulta), le manda el cliente al servidor la peticion. y el response(res), es la respuesta del servidor al cliente
const server = http.createServer(function(request, response){
    console.log("Alguien se conecto!!");
    response.setHeader('Content-Type', 'text/html');
    response.write("<h1>Hola mundo!</h1>");

    if(request.url === '/'){
        response.write("<h2>Inicio de la pagina</h2>");
    }
    else if(request.url === '/hola'){
        response.write("<h2>Hola que hace!</h2>");
    }
    else if(request.url === '/favicon.ico'){
        fs.readFile('./favicon.png', function (err,data){
            if(!err){
                response.write(data);
                response.end();
            }else{
                response.end();
            }
        })
    }
    else {
        response.write("<h2>Pagina no encontrada</h2>");
    }
    console.log("URL: ", request.url);
    //.end es para indicar que finaliza el mensaje que estoy enviando
    response.end();
});

//el servidor escucha determinado puerto.. en este caso es el puerto 2023
server.listen(2023, function(){
    console.log("El servidor esta levantado! http://localhost:2023");
});