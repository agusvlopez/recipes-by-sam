//para transformar el archivo json en un objeto js:
import fs from 'node:fs/promises';

import express from 'express';

const app = express();
app.use(express.json()); //interpreta el body cuando viene un JSON.

//consulta a la API de un array
app.get('/products', function(req,res){
    //leemos de forma asincronica el archivo:
    //en vez de utilizar callback utiliza las promesas en este caso
    //para decirle al file system que es un texto lo que quiero leer, le paso el parametro {encoding: 'utf-8'}

    fs.readFile("data/products.json", {encoding: 'utf-8'})
    .then(function(data){
        //transformo el texto en un objeto
        const products = JSON.parse(data);

        //para filtrar los productos que estan eliminados al llamar con get hacemos lo siguiente:
        const productsFilter = [];

        for(let i = 0; i < products.length; i++){
        if(products[i].deleted != true){
            productsFilter.push(products[i])
        }
    }
        //quiero devolver el 200 (todo ok) 
        //le digo que me envia en formato json el array 'productsFilter'
        res.status(200).json(productsFilter); 

    })
    .catch(function(err){
        res.status(500).json({msg: "No se encuentra el archivo"});
    })

})

//consulta a la api de un objeto en particular
//Le tengo que pasar una variable para que sea dinamico, para eso uso el ":"
// query -> ? --filtrar
//params -> URI -- id recurso
//body -> cuerpo del mensaje -- recurso

app.get('/products/:idProduct', function(req,res){
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const {idProduct} = req.params;
    
    fs.readFile("data/products.json", {encoding: 'utf-8'})
    .then(function(data){

        const products = JSON.parse(data);

        let product = null;

        for (let i = 0; i<products.length; i++){
        if(products[i].id == idProduct){
            product = products[i];
        }
        }
        //si existe lo devuelvo, sino devuelvo un estado 404 con un mensaje
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({msg: `No se encuentra el producto #${idProduct}`});
    }
    })
    .catch(function(err){
        res.status(500).json({msg: "No se encuentra el archivo"});
    })

   
})

//POST

app.post('/products', function(req,res){
    let products = [];

    const product = {
        name: req.body.name,
        description: req.body.description,
    }

    fs.readFile("data/products.json", {encoding: "utf-8"})
    .then(function(data){
        //aca se ejecuta una vez terminado de leer
        products = JSON.parse(data);
        product.id = products[products.length - 1].id + 1;
        products.push(product);

        //guardo en disco:
        return fs.writeFile("data/products.json", JSON.stringify(products), {encoding: "utf-8"});
    })
    .then(function(){
        // status 201 es el creado
        res.status(201).json(product);
    })
    .catch(function(err){
        res.status(500).json({msg: "No se pudo guardar el archivo"});
    })

    //aca se ejecuta mientras esta aún leyendo

})

//PUT (reemplaza)

app.put('/products/:idProduct', function(req,res){
    
    //obtengo el id del producto
    const {idProduct} = req.params;
    //preparo el objeto
    const product = {
        name: req.body.name,
        description: req.body.description
    }
    //busco el objeto
    let indexProduct = -1;

    for(let i = 0; i < products.length; i++){
        if(products[i].id == idProduct){
            indexProduct = i;
        }
    }
    
    if(indexProduct != -1) {
        //reemplazo el objeto
        products[indexProduct] = {
            ...product, //spread operator: se usa cuando no sabes cuantos parametros va a tener, entonces le decis aca va haber parametros(sin especificar cuantos)
            id: products[indexProduct].id

        }

        res.status(200).json(products[indexProduct]);
    }else{
        res.status(404).json({msg: `El producto #${idProduct} no existe`});
    }
})

//patch (actualiza)

app.patch('/products/:idProduct', function(req,res){
    
    //obtengo el id del producto
    const {idProduct} = req.params;

    //preparo el objeto
    const product = {};

    if(req.body.name){
        product.name = req.body.name;
    }

    if(req.body.description){
        product.description = req.body.description;
    }
    //busco el objeto
    let indexProduct = -1;

    for(let i = 0; i < products.length; i++){
        if(products[i].id == idProduct){
            indexProduct = i;
        }
    }
    
    if(indexProduct != -1) {
        //reemplazo el objeto
        products[indexProduct] = {
            ...products[indexProduct], //va aescribir todo lo que tiene el producto(nombre y descripcion)
            ...product, //reemplaza el nombre o descripcion en caso de que haya para reemplazar 
            id: products[indexProduct].id //forzar el id que tiene originalmente para que no se reemplace

        }

        res.status(200).json(products[indexProduct]);
    }else{
        res.status(404).json({msg: `El producto #${idProduct} no existe`});
    }
})


//DELETE... (eliminar)
// eliminacion logica (la mas normal de usar)
// eliminacion fisica (definitiva)

app.delete('/products/:idProduct', function(req,res){
    
    //obtengo el id del producto
    const {idProduct} = req.params;

    //busco el objeto
    let indexProduct = -1;

    for(let i = 0; i < products.length; i++){
        if(products[i].id == idProduct){
            indexProduct = i;
        }
    }
    
    if(indexProduct != -1) {
        // creamos una propiedad llamada deleted para indicar que el objeto esta eliminado 
        products[indexProduct].deleted = true; 

        res.status(200).json(products[indexProduct]);
    }else{
        res.status(404).json({msg: `El producto #${idProduct} no existe`});
    }
})


app.listen(2023, function() {
    console.log("El servidor esta levantado! http://localhost:2023");
});
