//commonjs (forma nativa que tiene node de incluir archivos)
//const calculos = require('./calculos.js'); //importamos un modulo

//Ecmascript Module
import calculos from './calculos.mjs'; //importo objeto por defecto

//import {sumar} from './calculos.js'; //importo la funcion en particular

//ahora llamo a calculos que tiene dentro la funcion sumar..
let res = calculos.sumar(parseInt(process.argv[2], parseInt(process.argv[3])));

console.log("Resultado: ", res);
console.log(process.argv);