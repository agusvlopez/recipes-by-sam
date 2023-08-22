//MODULOS... en node.js todo es modulos

//commonjs (forma nativa que tiene node de incluir archivos)
//const calculos = require('./calculos.js'); //importamos un modulo 

//Ecmascript Module
//import calculos from './calculos.mjs'; //importo objeto por defecto

import {sumar, restar} from './calculos.js'; //importo la funcion en particular(a diferencia del otro,e ste NO es un objeto)

//ahora llamo a calculos que tiene dentro la funcion sumar..
//process 

let res = sumar(parseInt(process.argv[2]),parseInt(process.argv[3]));
let res2 = restar(parseInt(process.argv[2]),parseInt(process.argv[3]));
console.log("Resultado: ", res);
console.log("Resultado numero 2: ", res2);
console.log(process.argv);