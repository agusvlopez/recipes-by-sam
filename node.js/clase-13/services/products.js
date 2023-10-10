//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("test");
const ProductCollection = db.collection('products');

//en el momento que hacemos algo con la coleccion(en este caso utilizando la constante ProductCollection), recién ahi se conecta a la bbdd

function filterQueryToMongo(filter){
    const filterMongo = {};
    
    for(const filed in filter){
        if(isNaN(filter[filed])){
            filterMongo[filed] = filter[filed];
        }
        else {
            const [field, op] = filed.split('_');

            if(!op){
                filterMongo[filed] = parseInt(filter[filed]);
            }
            else {
                if(op === 'min'){
                    filterMongo[field] = {
                        $gte: parseInt(filter[filed])
                    }
                }
                else if(op === 'max'){
                    filterMongo[field] = {
                        $lte: parseInt(filter[filed])
                    }
                }
            }
          
        }
        
    }    

    return filterMongo;
   
}

async function getProducts(filter = {}) {
    await client.connect();

    const filterValido = filterQueryToMongo(filter);

    return ProductCollection.find(filterValido).toArray();
}


// function notIgnored(product){
//     return product.deleted != true;
// }

// function filterDeleted(products){
//     const productsFilter = [];

//     for(let i = 0; i < products.length; i++){
//     if(notIgnored(products[i])){
//             productsFilter.push(products[i]);
//         }
//     }

//     return productsFilter;
// }

// async function getProductFile(){
    
//     return fs.readFile("data/products.json", {encoding: 'utf-8'})
//     .then(function(data){

//         //transformo el texto en un objeto
//         const products = JSON.parse(data);

//         //para filtrar los productos que estan eliminados al llamar con get hacemos lo siguiente:
//         return products;
//     })
// }

// async function getProducts(){
//     //leemos de forma asincronica el archivo:
//     //en vez de utilizar callback utiliza las promesas en este caso
//     //para decirle al file system que es un texto lo que quiero leer, le paso el parametro {encoding: 'utf-8'}

//     return getProductFile()
//     .then(function(products){
//         //para filtrar los productos que estan eliminados al llamar con get hacemos lo siguiente:
//         return filterDeleted(products);
//     })
// }

// function findProduct(id, products){
//     let product = null;

//     for (let i = 0; i<products.length; i++){
//     if(products[i].id == id){
//         product = products[i];
//     }
//     }

//     return product;
// }

async function getProductByID(id){
    await client.connect();
    return ProductCollection.findOne({_id: new ObjectId(id)});
}

async function createProduct(product){

    await client.connect();
    const newProduct = { ...product};

    await ProductCollection.insertOne(newProduct);

    return product;
}

export {
    getProducts,
    getProductByID,
    createProduct,
}

// export default {
//     getProducts,
//     getProductByID 
// }