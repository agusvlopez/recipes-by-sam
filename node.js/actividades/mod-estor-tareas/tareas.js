const listaTareas = [];

function agregarTarea(tarea) {
    listaTareas.push(tarea);
}

function listarTareas() {
    listaTareas.forEach(function(tarea, indice) {
      console.log(`Tarea ${indice + 1}: ${tarea}`);
      });
      return;
}

function eliminarTarea(indice) {
    return listaTareas.splice(indice, 1);
}

export default {
    agregarTarea,
    listarTareas,
    eliminarTarea
}
