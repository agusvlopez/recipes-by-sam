//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";
import fs from 'fs-extra';
import dotenv from 'dotenv'; // Agrega esta línea
import { uploadFile } from "../functions/uploadFile.js";

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

// async function createProduct(product, imagePath, filename) {
//     try {
//         await client.connect();
//         const {} = await uploadFile();
//         const newProduct = {
//             ...product,
//             file: {
//                 data: fileBuffer, // Guardar el búfer del archivo como datos binarios
//                 contentType: fileContentType,
//             },
//         };

//         await ProductCollection.insertOne(newProduct);
//         console.log('Producto creado exitosamente.');

//         return newProduct;
//     } catch (error) {
//         console.error('Error creando producto:', error);
//         throw { code: 500, msg: 'Internal Server Error' };
//     }
// }

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

async function deleteProduct(idProduct) {
    try {
        const product = await getProductByID(idProduct);

        const result = await deleteProductFromDatabase(idProduct);

        if (result.deletedCount === 0) {
            return { success: false, error: 'Product not found' };
        }

        const imagePath = product.file.path;
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

function deleteImageFile(imagePath) {
    try {
        fs.unlinkSync(imagePath);
        console.log('Image file deleted successfully.');
    } catch (err) {
        console.error('Error deleting image file:', err);
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
