import yup from 'yup';

//creamos el Schema que se va a encargar de validar el producto
export const productCreateSchema = yup.object({
    name: yup.string().min(5, 'El nombre debe contener mas de 5 caracteres').required("El nombre es un campo requerido"),
    description: yup.string().min(5, 'La descripción debe contener mas de 5 caracteres').required("Descripción es un campo requerido"),
    stock: yup.number().max(2500, 'La cantidad máxima es de 2500').required(),
    price: yup.number().required()
});

export const productUpdateSchema = yup.object({
    name: yup.string().min(5, 'El nombre debe contener mas de 5 caracteres'),
    description: yup.string().min(5, 'La descripción debe contener mas de 5 caracteres'),
    stock: yup.number().max(2500, 'La cantidad máxima es de 2500'),
    price: yup.number()
});

