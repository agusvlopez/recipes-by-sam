function A(){
    
    console.log("Ejecuta A");
    return 15;
    
}

//Transformo esta funcion a asincronica con la palabra reservada async.
async function B(){
    console.log("Ejecuta B");
    //throw genera una excepcion, un error
    //throw "Forzamos un error"
    return A() + k;
}

function C(){
    console.log("Ejecuta C");
    return 20;
};

//secuencial: hasta que no termine B() no va a llamar a C(). Es decir toda la ejecución va a ser sincronica. 
// const promesa = B();

B()
.then(function(data){
     //ejecuta cuando la promesa termine bien
     console.log("Se ejecuta cuando termine B", data);
})

//Para controlar cuando una funcion termina mal usamos el catch:
.catch(function(err){
    console.log("Se ejecuta cuando error B: ", err);
})

// console.log("B: ", B());
console.log("C: ",C());