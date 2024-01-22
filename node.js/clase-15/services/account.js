//conexion con la bbdd

//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
//const client = new MongoClient('mongodb://127.0.0.1:27017');

import dotenv from 'dotenv'; // Agrega esta línea

// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

//const client = new MongoClient('mongodb://127.0.0.1:27017');
const client = new MongoClient(mongoURI);

const db = client.db("test");
const TokensCollection = db.collection('tokens');
const AccountsCollection = db.collection('accounts');

async function createAccount(account) {
    await client.connect();
    const newAccount = {
        ...account,
        role: 'cliente'
    }

    const salt = await bcrypt.genSalt(10);

    newAccount.password = await bcrypt.hash(account.password, salt);

    await AccountsCollection.insertOne(newAccount);

    return {
        token: await createToken({ ...account, password: undefined, role: account.role })
    };
}

async function verifyAccount(account) {
    await client.connect();

    let accountData = await AccountsCollection.findOne({ email: account.email });

    if (!accountData) {
        throw { msg: "No se encontró el email en la base de datos" }
    }

    if (!await (bcrypt.compare(account.password, accountData.password))) {
        throw { msg: "El password es incorrecto" }
    };

    return { ...account, password: undefined, role: accountData.role };
}

async function createToken(payload) {
    const token = jwt.sign(payload, "CLAVE SECRETA");

    TokensCollection.insertOne({ token, email: payload.email, role: payload.role });
    console.log(token);
    return token;
}

async function createSession(account) {
    let accountData = await AccountsCollection.findOne({ email: account.email });

    return {
        account: await verifyAccount(account),
        token: await createToken({ ...account, password: undefined, role: accountData.role })
    };
}

async function verifyToken(token) {
    await client.connect();

    const payload = jwt.verify(token, "CLAVE SECRETA");
    if (!await TokensCollection.findOne({ token })) {
        throw { msg: "El token no está en la base de datos." }
    }

    return payload;
}

async function deleteSession(token) {
    await client.connect();

    TokensCollection.deleteOne({ token });
}
export default {
    createAccount,
    createSession,
    createSession,
    verifyToken,
    deleteSession,
}