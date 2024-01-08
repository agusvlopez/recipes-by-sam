//conexion con la bbdd

//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("test");
const AccountsCollection = db.collection('accounts');


async function createAccount(account){
    await client.connect();
    const newAccount = {
        ...account
    }

    const salt = await bcrypt.genSalt(10);

    newAccount.password = await bcrypt.hash(account.password, salt);

    await AccountsCollection.insertOne(newAccount);
}

async function verifyAccount(account){

}

async function createSession(account){
    await client.connect();

    let accountData = await AccountsCollection.findOne({email: account.email});

    if(!accountData){  
        throw {msg: "No se encontró el email en la base de datos"}
    }

    if(!await (bcrypt.compare(account.password, accountData.password))){
        throw { msg: "El password es incorrecto" }
    };

    return {account: {...account, password: undefined}, token: jwt.sign({email: account.email,
        user_id: null
    }, "CLAVE SECRETA") };
}

async function verifyToken(token){
    return jwt.verify(token, "CLAVE SECRETA");
}

export default {
    createAccount,
    createSession,
    verifyToken
}