import express from 'express';
import path from 'node:path';

const app = express(); //esto crea el servidor

// cada vez que hago get al home('/') ejecuto la funcion
app.get('/', function(req, res){
    // send envia lo que le pasemos por parametro
    res.send("<h1>Hola mundo</h1>");
})

app.get('/favicon.ico', function(req,res){
    res.sendFile(path.resolve('favicon.png'));
});
// aca le mandamos el puerto que queremos que escuche y la funcion que queremos qeu se dispare cada vez que alguien se conecta
app.listen(2023, function() {
    console.log("El servidor esta levantado! http://localhost:2023");
});
