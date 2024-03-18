//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient } from "mongodb";
import fs from 'fs-extra';
import dotenv from 'dotenv'; // Agrega esta línea
import { uploadFile } from "../functions/uploadFile.js";
import { storage } from "../firebase/firebase.js";
import { deleteObject, ref } from "firebase/storage";
import { ObjectId } from "bson";

// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

//const client = new MongoClient('mongodb://127.0.0.1:27017');
const client = new MongoClient(mongoURI);
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

async function getProductByID(id) {
    await client.connect();
    return ProductCollection.findOne({ _id: new ObjectId(id) });
}

async function createProduct(product) {
    try {
        // Inserta el nuevo producto en la base de datos y obtén el documento insertado
        const result = await ProductCollection.insertOne(product);

        // Devuelve solo la información relevante del nuevo producto
        const newProduct = {
            _id: result.insertedId,
            name: product.name,
            description: product.description,
            stock: product.stock,
            price: product.price,
            file: product.file,
        };

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

        // Obtener el producto existente
        const oldProduct = await getProductByID(idProduct);

        // Crear el objeto de producto actualizado
        const updatedProduct = {
            _id: oldProduct._id,
            name: productData.name || oldProduct.name,
            description: productData.description || oldProduct.description,
            stock: parseInt(productData.stock) || oldProduct.stock,
            price: parseInt(productData.price) || oldProduct.price,
            file: oldProduct.file,
        };

        // Si hay un nuevo archivo, actualizar la propiedad 'file' en 'updatedProduct'
        if (productData.file) {
            updatedProduct.file = productData.file;
            // Eliminar la imagen anterior si existe
            if (oldProduct.file) {
                await deleteImageFile(oldProduct.file);
            }
        }

        // Actualizar el producto en la base de datos
        const result = await ProductCollection.updateOne(
            { _id: new ObjectId(idProduct) },
            { $set: updatedProduct }
        );

        console.log('Producto antiguo:', oldProduct);
        console.log('Producto actualizado:', updatedProduct);
        console.log('Resultado de la actualización:', result);

        if (result.matchedCount === 1) {
            console.log('Producto editado exitosamente.');
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
        const oldImagePath = oldProduct.file;

        // Actualizar solo la imagen del producto en la base de datos
        await updateProductImageInDatabase(idProduct, imagePath, filename);

        // Elimina el archivo antiguo de Firebase Storage
        if (oldImagePath) {
            await deleteImageFile(oldImagePath);
        }
    } catch (error) {
        console.error('Error updating product image:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

// async function deleteImageFileFromStorage(imagePath) {
//     try {
//         // Obtén la referencia al archivo en Firebase Storage
//         const fileRef = ref(storage, imagePath);

//         // Elimina el archivo de Firebase Storage
//         await deleteObject(fileRef);

//         console.log('Image file deleted successfully from Firebase Storage.');
//     } catch (err) {
//         console.error('Error deleting image file from Firebase Storage:', err);
//         throw err;
//     }
// }

async function deleteProduct(idProduct) {
    try {
        const product = await getProductByID(idProduct);

        const result = await deleteProductFromDatabase(idProduct);

        if (result.deletedCount === 0) {
            return { success: false, error: 'Product not found' };
        }

        const imagePath = product.file;
        if (imagePath) {
            deleteImageFile(imagePath);
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


async function deleteImageFile(imagePath) {
    try {
        // Obtén la referencia al archivo en Firebase Storage
        const fileRef = ref(storage, imagePath);

        // Elimina el archivo de Firebase Storage
        await deleteObject(fileRef);

        console.log('Image file deleted successfully from Firebase Storage.');
    } catch (err) {
        console.error('Error deleting image file from Firebase Storage:', err);
        throw err; // Puedes relanzar el error para manejarlo en el nivel superior si es necesario
    }
}

export {
    getProducts,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductImage
}
