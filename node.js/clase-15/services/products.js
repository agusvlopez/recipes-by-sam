//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";
import fs from 'fs-extra';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("test");
const ProductCollection = db.collection('products');

const sourcePath = './uploads';
//const destinationPath = '../../react/clase-01/react-app/public/uploads';

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
    try {
        await client.connect();

        const newProduct = {
            ...product,
            file: {
                path: imagePath,
                filename,
            },
        };

        // Insertar el nuevo producto en la base de datos
        await ProductCollection.insertOne(newProduct);
        console.log('Producto creado exitosamente.');

        return newProduct;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

async function updateProductImageInDatabase(idProduct, imagePath, filename) {
    try {
        await client.connect();

        const updatedProduct = {
            file: {
                path: imagePath,
                filename
            },
        };

        // Actualizar solo la imagen del producto en la base de datos
        const result = await ProductCollection.updateOne(
            { _id: new ObjectId(idProduct) },
            { $set: updatedProduct }
        );

        if (result.matchedCount === 1) {
            return ProductCollection.findOne({ _id: new ObjectId(idProduct) });
        }
    } catch (error) {
        console.error('Error updating product image in database:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}
async function updateProduct(idProduct, productData) {
    try {
        await client.connect();

        const oldProduct = await getProductByID(idProduct);

        const updatedProduct = {
            ...productData,
        };

        // Actualizar el producto en la base de datos
        const result = await ProductCollection.updateOne(
            { _id: new ObjectId(idProduct) },
            { $set: updatedProduct }
        );

        if (result.matchedCount === 1) {

            return ProductCollection.findOne({ _id: new ObjectId(idProduct) });
        }
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

async function updateProductImage(idProduct, imagePath, filename) {
    try {
        // Obtener la información del producto antes de la actualización
        const oldProduct = await getProductByID(idProduct);
        const oldImagePath = oldProduct.file.path;

        // Actualizar solo la imagen del producto en la base de datos
        await updateProductImageInDatabase(idProduct, imagePath, filename);

        // Elimina el archivo antiguo
        if (oldImagePath) {
            deleteImageFile(oldImagePath);
        }
    } catch (error) {
        console.error('Error updating product image:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

// async function createProduct(product, imagePath, filename) {

//     await client.connect();

//     const newProduct = {
//         ...product,
//         file: {
//             path: imagePath,
//             filename,
//         },
//     };

//     await ProductCollection.insertOne(newProduct);
//     // Copiar la carpeta uploads
//     fs.copySync(sourcePath, destinationPath);
//     console.log('Carpeta uploads copiada exitosamente.');

//     return newProduct;
// }

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

        // // Eliminar el archivo asociado a la imagen desde la otra carpeta
        // const reactImagePath = `../../react/clase-01/react-app/public/uploads/${product.file.filename}`;
        // if (reactImagePath) {
        //     deleteImageFile(reactImagePath);
        // }

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
        console.log('Image file deleted successfully.');
    } catch (err) {
        console.error('Error deleting image file:', err);
    }
}

// async function updateProduct(idProduct, productData, imagePath, filename) {
//     try {
//         await client.connect();

//         const updatedProduct = {
//             ...productData,
//             file: {
//                 path: imagePath,
//                 filename,
//             },
//         };

//         // Actualiza el producto en la base de datos
//         const result = await ProductCollection.updateOne(
//             { _id: new ObjectId(idProduct) },
//             { $set: updatedProduct }
//         );

//         if (result.modifiedCount === 0) {
//             // Si no se modificó ningún producto, puedes enviar un mensaje de error
//             throw { code: 404, msg: 'Product not found' };
//         }

//         // Elimina el archivo antiguo si se proporcionó uno nuevo
//         if (imagePath) {
//             const oldProduct = await getProductByID(idProduct);
//             const oldImagePath = oldProduct.file.path;
//             if (oldImagePath) {
//                 deleteImageFile(oldImagePath);
//             }
//         }

//         return updatedProduct;
//     } catch (error) {
//         console.error('Error updating product in database:', error);
//         throw { code: 500, msg: 'Internal Server Error' };
//     }
// }

export {
    getProducts,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductImage
}

// export default {
//     getProducts,
//     getProductByID
// }