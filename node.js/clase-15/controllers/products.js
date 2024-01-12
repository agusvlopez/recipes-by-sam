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
        // Extract product data and file information from the request
        const { body, file } = req;

        // Check if an image file was uploaded
        if (!file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Call the service to create the product with the image
        const product = await ProductsService.createProduct(body, file.path, file.filename);
        console.log(file);
        // Send the response with the created product
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    getProducts,
    getProductByID,
    createProduct
}

export default {
    getProducts,
    getProductByID,
    createProduct,
}
