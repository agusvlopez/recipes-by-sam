async function A(){
    
    console.log("Ejecuta A");
    //Fuerzo un error:
    // throw "Error A"
    return 15;
    
}

async function F(){    
    return 10;  
}

async function G(){    
    return 11;  
}

//Transformo esta funcion a asincronica con la palabra reservada async.
async function B(){
    console.log("Ejecuta B");
    //con la palabra await rompo con el asincronismo y lo transformo en sincronico.
    //para atrapar en caso de que haya un error con el await, utilizo el try, catch
    let valorFinal;
    try {
        valorFinal = await A() + await F() + await G();
    }
    catch(err){
        valorFinal = 0;
    }
    

    return valorFinal;
    //throw genera una excepcion, un error
    //throw "Forzamos un error"
    // return A()
    // .then(function(data){
    //     return data + 100;
    // })
    // .then(function(data){
    //     return data - 120;
    // })
    // .catch(function(){
    //     // throw "Error"
    //     return 0;
    // })
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