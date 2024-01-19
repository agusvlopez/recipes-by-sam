// Las funciones del controlador de los productos

//Tres formas de importar:
/*
import { 
    getProducts as getProductService, getProductByID as getProductByIDService
} from "../services/products.js";
*/
import yup from 'yup';

import * as ProductsService from "../services/products.js";

// import ServiceProducts from "../services/products.js";

function getProducts(req, res) {

    ProductsService.getProducts(req.query)
        .then(function (products) {
            //quiero devolver el 200 (todo ok) 
            //le digo que me envia en formato json el array 'productsFilter'
            res.status(200).json(products);
        })
        .catch(function (err) {
            res.status(500).json({ msg: "No se encuentra el archivo" });
        })

}

function getProductByID(req, res) {
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const { idProduct } = req.params;

    ProductsService.getProductByID(idProduct)
        .then(function (product) {
            return res.status(200).json(product)
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            }
            else {
                res.status(500).json({ msg: "No se pudo obtener el archivo" });
            }

        })
}

async function createProduct(req, res) {
    try {
        const { body, file } = req;

        // Verificar si se cargó un archivo de imagen
        if (!file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Obtener el búfer de la imagen y su tipo de contenido
        const fileBuffer = file.buffer;
        const fileContentType = file.mimetype;

        // Llamar al servicio para crear el producto con el búfer de la imagen
        const product = await ProductsService.createProduct(body, fileBuffer, fileContentType);

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const { idProduct } = req.params;

        // Lógica para eliminar el producto con el productId
        const result = await ProductsService.deleteProduct(idProduct);

        if (result.deletedCount == 0) {
            // Si no se eliminó ningún producto, puedes enviar un mensaje de error
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    try {
        const { idProduct } = req.params;
        const { body } = req;

        // Llama al servicio para actualizar el producto
        const updatedProduct = await ProductsService.updateProduct(idProduct, body);

        // Devuelve la respuesta con el producto actualizado
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProductImage(req, res) {
    try {
        const { idProduct } = req.params;
        const { file } = req;

        // Verifica si se proporcionó un archivo de imagen
        const imagePath = file ? file.path : null;

        // Llama al servicio para actualizar la imagen del producto
        await ProductsService.updateProductImage(idProduct, imagePath);

        // Devuelve la respuesta con un mensaje de éxito
        res.status(200).json({ success: true, message: 'Product image updated successfully' });
    } catch (error) {
        console.error('Error updating product image:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
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

export default {
    getProducts,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductImage
}
