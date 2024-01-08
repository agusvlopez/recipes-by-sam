import { productCreateSchema } from "../schemas/products.js";

export function validateCreateProduct(req, res, next){
        //para validar el schema del body:
        productCreateSchema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })
        .then(async function(product){
            req.body = product;
            next();
        })
       .catch(function(err){
        res.status(400).json(err);
       })
}