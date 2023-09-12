import express from 'express';
const app = express();
app.use(express.json()); //interpreta el body cuando viene un JSON.


//URI /products -- urlencode //aca identificamos el recurso que en este caso son los productos(products).

// /realstates <-- array
// /realstates/1234 <-- object
// /realstates/1234/images

// clients/55/realstates <-- array // del cliente 55 quiero traerme los realstates

// /realstates/user/1234 <-- objeto //aunque no tiene mucho sentido usarlo

//Quiero que me devuelva todos los productos:

const products = [
    {
        id: 1,
        name: "Café Espresso",
        description: "Un café concentrado y fuerte que se prepara forzando agua caliente a través de granos de café molidos finamente."
    },
    {
        id: 2,
        name: "Café Latte",
        description: "Un café suave hecho con una mezcla de café espresso y leche caliente, a menudo servido con un poco de espuma de leche en la parte superior."
    },
    {
        id: 3,
        name: "Café Americano",
        description: "Un café más suave que se hace agregando agua caliente al espresso, diluyendo así la concentración."
    }

]

// En todos los verbos(GET,POST,PTCH,PUT,DELETE) tienen que seguir una estructura similar, donde le indiquemos:
/*
- el recurso que queremos (en este caso es el '/products')
- el verbo (en este caso el get)
- el estado (en este caso el 200)
- lo que le vamos a enviar (siempre en formato json) (en este caso el array products)
*/ 

//consulta a la API de un array
app.get('/products', function(req,res){
    //quiero devolver el 200 (todo ok)
    res.status(200).json(products); //le digo que me envia en formato json el array 'products'
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
    
    //ya tengo el id del producto, ahora tengo que buscarlo:
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

//POST

app.post('/products', function(req,res){

    const product = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
    }

    products.push(product);
    // status 201 es el creado
    res.status(201).json(product);

})

//PUT

app.put('/products/:idProduct', function(req,res){
    
    //obtengo el id del producto
    const {idProduct} = req.params;
    
    // Busca el producto en el arreglo de productos por su ID
     const productToUpdate = products.find((product) => product.id == idProduct);

    // Verifica si el producto existe
    if (!productToUpdate) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Actualiza las propiedades del producto con los valores proporcionados en el cuerpo de la solicitud
    productToUpdate.name = req.body.name || productToUpdate.name;
    productToUpdate.description = req.body.description || productToUpdate.description;

    // Devuelve el producto actualizado
    res.status(200).json(productToUpdate);
})

//DELETE... (me falta hacer)

app.listen(2023, function() {
    console.log("El servidor esta levantado! http://localhost:2023");
});
