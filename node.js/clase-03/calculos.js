//exportar con ecmascript:
function sumar(n1,n2){
    return n1 + n2;
}

function restar(n1,n2){
    return n1 - n2;
}

//asi:

export {
    sumar,
    restar
}


// objeto por defecto(exporto todo como un objeto):
// export default {
//       sumar,
//     restar
// }


//Common js exportamos la funcion sumar... indico que es lo que quiero exportar.
//module.exports = {
//    sumar
//}

