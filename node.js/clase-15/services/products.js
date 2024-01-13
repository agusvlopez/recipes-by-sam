//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";
import fs from 'fs-extra';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("test");
const ProductCollection = db.collection('products');

const sourcePath = './uploads';
const destinationPath = '../../react/clase-01/react-app/public/uploads';

//en el momento que hacemos algo con la coleccion(en este caso utilizando la constante ProductCollection), recién ahi se conecta a la bbdd

function filterQueryToMongo(filter) {
    const filterMongo = {};

    for (const filed in filter) {
        if (isNaN(filter[filed])) {
            filterMongo[filed] = filter[filed];
        }
        else {
            const [field, op] = filed.split('_');

            if (!op) {
                filterMongo[filed] = parseInt(filter[filed]);
            }
            else {
                if (op === 'min') {
                    filterMongo[field] = {
                        $gte: parseInt(filter[filed])
                    }
                }
                else if (op === 'max') {
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

async function getProductByID(id) {
    await client.connect();
    return ProductCollection.findOne({ _id: new ObjectId(id) });
}

async function createProduct(product, imagePath, filename) {

    await client.connect();

    const newProduct = {
        ...product,
        file: {
            path: imagePath,
            filename,
        },
    };

    await ProductCollection.insertOne(newProduct);
    // Copiar la carpeta uploads
    fs.copySync(sourcePath, destinationPath);
    console.log('Carpeta uploads copiada exitosamente.');

    return newProduct;
}

// async function deleteProduct(idProduct) {
//     await client.connect();

//     const result = await ProductCollection.deleteOne({ _id: new ObjectId(idProduct) });

//     return result;
// }


async function deleteProduct(idProduct) {
    try {
        // Obtener la información del producto antes de eliminarlo
        const product = await getProductByID(idProduct);

        // Eliminar el producto de la base de datos
        const result = await deleteProductFromDatabase(idProduct);

        if (result.deletedCount === 0) {
            // Si no se eliminó ningún producto, puedes enviar un mensaje de error
            return { success: false, error: 'Product not found' };
        }

        // Eliminar el archivo asociado a la imagen desde la carpeta de uploads
        const imagePath = product.file.path;
        if (imagePath) {
            deleteImageFile(imagePath);
        }

        // Eliminar el archivo asociado a la imagen desde la otra carpeta
        const reactImagePath = `../../react/clase-01/react-app/public/uploads/${product.file.filename}`;
        if (reactImagePath) {
            deleteImageFile(reactImagePath);
        }

        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

async function deleteProductFromDatabase(idProduct) {
    return await ProductCollection.deleteOne({ _id: new ObjectId(idProduct) });
}

function deleteImageFile(imagePath) {
    try {
        fs.unlinkSync(imagePath);
        fs.copyFileSync(sourcePath, destinationPath);
        console.log('Image file deleted successfully.');
    } catch (err) {
        console.error('Error deleting image file:', err);
    }
}

export {
    getProducts,
    getProductByID,
    createProduct,
    deleteProduct
}

// export default {
//     getProducts,
//     getProductByID
// }