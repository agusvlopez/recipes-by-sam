import express from 'express';
import ProductsRoute from './routes/products.js';
import ProductsReviews from './routes/productsReviews.js';

const app = express();
app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(ProductsRoute);
app.use(ProductsReviews);

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

    
    fs.readFile("data/products.json", {encoding: "utf-8"})
    .then(function(data){
 
        const products = JSON.parse(data);
        
        //busco el objeto
        let indexProduct = -1;

        //busco el indice del objeto que estoy buscando en el array
        for(let i = 0; i < products.length; i++){
        if(products[i].id ==    idProduct){
                indexProduct = i;
            }
        }

        if(indexProduct != -1) {
            //reemplazo el objeto
            products[indexProduct] = {
                ...product, //spread operator: se usa cuando no sabes cuantos parametros va a tener, entonces le decis aca va haber parametros(sin especificar cuantos)
                id: products[indexProduct].id
    
            }
           //guardo en disco:
            return fs.writeFile("data/products.json", JSON.stringify(products), {encoding: "utf-8"});
        }else{
            //todo lo que mande por el throw va a ir al catch
            throw {code: 404, msg: "No se encuentra este producto"}
        }
        
    })
    .then(function(){
        // status 201 es el creado
        res.status(201).json(product);
    })
    .catch(function(err){
        if(err?.code){
            res.status(err.code).json({msg: err.msg});
        }
        res.status(500).json({msg: "No se pudo guardar el archivo"});
    })
   
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
