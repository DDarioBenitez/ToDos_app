const limpiar = document.querySelector("btnLimpiar"); // Selecciona el botón de limpiar
const eliminar = document.querySelector(".filtros-container input[type='checkbox']"); // Selecciona los checkboxes de la sección de filtros
const tareas = document.querySelectorAll("li"); // Selecciona todas las tareas


const limpieza =  document.addEventListener("click", () => {
    tareas.forEach((tarea) => {
        tarea.style.display = "none"; // Oculta la tarea
    });
});








// const checkboxes = document.querySelectorAll(".filtros-container input[type='checkbox']");

// const Limpiar = document.addEventListener("click", () => {
//     const tareas = document.querySelectorAll("li"); // Selecciona todas las tareas
//     if (tareas.length > 0) {
//         tareas.forEach((tarea) => {
//             tarea.style.display = "none"; // Oculta la tarea
//         });
//     }
// });




//  Limpiar.forEach((checkbox) => {
//      checkbox.addEventListener("change", () => {
//          const eliminar = checkbox.checked;
//          const tareas = document.querySelectorAll("li");
//          if (tareas.length > 0) {
//              tareas.forEach((tarea) => {
//                  if (eliminar) {
//                      tarea.style.display = "none";
//                  } else {
//                      tarea.style.display = "list-item";
//                  }
//              });
//          }
//      });
//  });