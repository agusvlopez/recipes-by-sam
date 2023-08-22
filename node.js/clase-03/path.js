import path from 'node:path';

const ruta = path.join('img/','/profile/105236.jpg');

console.log(ruta);
console.log(path.dirname(ruta));
console.log(path.basename(ruta));
console.log(path.extname(ruta));
console.log(path.resolve('./')); // me trae la ruta absoluta de un directorio