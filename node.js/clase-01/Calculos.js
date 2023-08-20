function sumar(numero1, numero2){
    return numero1 + numero2;
};

function dividir(numero1, numero2){
    return numero1 / numero2;
};

function encontrarMayorValor(arr) {
    if (arr.length === 0) {
        return null;
    }

    let mayor = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > mayor) {
            mayor = arr[i];
        }
    }

    return mayor;
};

console.log("La suma de 5 y 10 es: " + sumar(5,10));
console.log("La suma de 20 y 2 es: " + sumar(20,2) + " y su división es: " + dividir(20,2));
console.log(`Y si divido 20 y 0... me da: ${dividir(20,0)}`);
console.log(`En un array, el mayor de la lista [2,8,9,7,5,6] es: ${encontrarMayorValor([2,8,9,7,5,6])}`);