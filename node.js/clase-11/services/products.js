//Nos brinda toda la info que tiene que ver con la carga o datos de un producto

import fs from 'node:fs/promises';

function notIgnored(product){
    return product.deleted != true;
}

function filterDeleted(products){
    const productsFilter = [];

    for(let i = 0; i < products.length; i++){
    if(notIgnored(products[i])){
            productsFilter.push(products[i]);
        }
    }

    return productsFilter;
}

async function getProductFile(){
    
    return fs.readFile("data/products.json", {encoding: 'utf-8'})
    .then(function(data){

        //transformo el texto en un objeto
        const products = JSON.parse(data);

        //para filtrar los productos que estan eliminados al llamar con get hacemos lo siguiente:
        return products;
    })
}

async function getProducts(){
    //leemos de forma asincronica el archivo:
    //en vez de utilizar callback utiliza las promesas en este caso
    //para decirle al file system que es un texto lo que quiero leer, le paso el parametro {encoding: 'utf-8'}

    return getProductFile()
    .then(function(products){
        //para filtrar los productos que estan eliminados al llamar con get hacemos lo siguiente:
        return filterDeleted(products);
    })
}

function findProduct(id, products){
    let product = null;

    for (let i = 0; i<products.length; i++){
    if(products[i].id == id){
        product = products[i];
    }
    }

    return product;
}

async function getProductByID(id){
    return getProducts()
    .then(function(products){

        let product = findProduct(id, products);
        
        if(product){
            return product;
        } 
        else {
           throw { code: 404, msg: "El producto no se encuentra en el sistema."}
        }
    })
}


export {
    getProducts,
    getProductByID 
}

// export default {
//     getProducts,
//     getProductByID 
// }