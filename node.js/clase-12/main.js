//creo el cliente:

import { MongoClient, ObjectId } from 'mongodb';

//en el parametro pongo la URI o connection string(sin poner localhost)
const client = new MongoClient('mongodb://127.0.0.1:27017');

//connect() es una funcion asincronica:
client.connect()
.then(async function(){
    console.log("Conectado al servidor");

    const db = client.db('test');

    // db.collection('Users').insertOne({
    //     name: 'Mongo User',
    //     type: 'System'
    // })

    //Devuelve una promesa con un documento
    // const doc = await db.collection("Users")
    // .findOne({_id: new ObjectId('651c964f5941071a2289cf6c')});
    // console.log(doc);


    //  const cursor = db.collection("Users").find();

    //recorre todo el cursor, genera un array y lo devuelve
    const docs = await db.collection("Users").find({type: "Alumno"}).toArray();
    console.log(docs);

     const update = await db.collection("Users").updateOne({_id: new ObjectId('651ca3b72574213f2e6d4cef')}, {
         $set: {
             name: "Nuevo usuario"
         }
     })

})
.catch(function(err){
    console.log("No se pudo conectar: ", err);
})