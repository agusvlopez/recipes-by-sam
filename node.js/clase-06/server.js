import express from 'express';
// import path from 'node:path';

const app = express(); //esto crea el servidor

//cada vez que venga una solicitud de un recurso si ninguno de las otras funciones lo encuentra lo va a buscar en la carpeta public
//configuramos express para que sepa donde se encuentra el contenido estatico
app.use('/', express.static('public'));

//me permite recibir datos en el body de una solicitud con urlencode
//agregarmos middleware para que express pueda procesar los datos del body de la solicitud
app.use(express.urlencoded({ extended: true}));

app.get('/form', function(req,res){

    let nombre = req.query.nombre;
    res.send(`Hola ${nombre}, ¿como estas?`);
});

app.post('/form', function(req,res){

    let nombre = req.body.nombre;
    res.send(`Hola ${nombre}, ¿como estas?`);
});
// cada vez que hago get al home('/') ejecuto la funcion
// app.get('/', function(req, res){
//     // send envia lo que le pasemos por parametro
//     res.sendFile(path.resolve('home.html'));
// })

// app.get('/favicon.ico', function(req,res){
//     res.sendFile(path.resolve('favicon.png'));
// });

// app.get('/home.png', function(req,res){
//     res.sendFile(path.resolve('home.png'));
// });

// aca le mandamos el puerto que queremos que escuche y la funcion que queremos qeu se dispare cada vez que alguien se conecta
app.listen(2023, function() {
    console.log("El servidor esta levantado! http://localhost:2023");
});
