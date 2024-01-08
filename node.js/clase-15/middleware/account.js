import { AccountSchema } from "../schemas/account.js";
import accountServices from '../services/account.js';

export function validateAccount(req, res, next) {
    //para validar el schema del body:
    AccountSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false
    })
        .then(async function (data) {
            req.body = data;
            next();
        })
        .catch(function (err) {
            res.status(400).json(err);
        })
}

export function verifySession(req, res, next) {
    //el token lo envia en el Header 
    //accedo al token:
    const token = req.headers['auth-token'];

    if (!token) {
        res.status(401).json({ msg: "No se encuentra el token" });
    }

    accountServices.verifyToken(token)
        .then((payload) => {
            //el id de la sesion actual
            req.token = token;
            req.session = payload;
            next();
        })
        .catch(() => {
            return res.status(401).json({ msg: "El token no es válido" });
        })
}