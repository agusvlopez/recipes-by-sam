const listaTareas = [];

function agregarTarea(tarea) {
    return listaTareas.push(tarea);
}

function listarTareas() {
    return listaTareas;
}

function eliminarTarea(indice) {
    return listaTareas.splice(indice, 1);
}

export {
    agregarTarea,
    listarTareas,
    eliminarTarea
}
console.log(listaTareas);