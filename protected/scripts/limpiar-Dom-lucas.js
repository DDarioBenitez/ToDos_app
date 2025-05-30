const data ={
    categorias: [ ],
    prioridades: [ ],
}

const clearButton = document.getElementById("btnClean"); // Selecciona el botón de limpiar
const dellListaCheckbox = document.getElementsByClassName("cat-inp"); // Selecciona el checkbox de eliminar
const dellPrioCheckbox = document.getElementsByClassName("prio-inp"); // Selecciona el checkbox de eliminar

console.log(dellListaCheckbox[2].checked); // Verifica si es un array


const auxPrio = Array.from(dellPrioCheckbox)
console.log(Array.isArray(auxPrio)); // Verifica si es un array
const aux = Array.from(dellListaCheckbox)
console.log(Array.isArray(aux)); // Verifica si es un array

auxPrio.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
        const checkSelect = event.target.checked; // Verifica si el checkbox está seleccionado toma true o false
        if (checkSelect) {
            const prioridad = event.target.value;
            data.prioridades.push(prioridad);
            }else {
                const prioridad = event.target.value;
                const index = data.prioridades.indexOf(prioridad);
                if (index > -1) {
                    data.prioridades.splice(index, 1);
                }
            }
            console.log(data.prioridades);   
        });
    
    });

aux.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
        const checkSelect = event.target.checked; // Verifica si el checkbox está seleccionado toma true o false
        // Imprime el array de categorías
        if (checkSelect) {
            const categoria = event.target.value; // Obtiene el valor del checkbox seleccionado
            data.categorias.push(categoria); // Agrega la categoría al array de categorías
        } else {
            const categoria = event.target.value; // Obtiene el valor del checkbox deseleccionado
            const index = data.categorias.indexOf(categoria); // Busca el índice de la categoría en el array
            if (index > -1) {
                data.categorias.splice(index, 1); // Elimina la categoría del array si existe
            }
        }
        console.log(data.categorias);
    });
    
});

//capturar lo que esta checkeado 
console.log(typeof dellPrioCheckbox);

clearButton.addEventListener("click", () => {
    
for (const checkbox of dellListaCheckbox) {
    console.log(checkbox.checked); // Verifica si es un array
    
 checkbox.checked = false; // Desmarca el checkbox
    
}
for (const checkbox of dellPrioCheckbox) {
 checkbox.checked = false; // Desmarca el checkbox
    
}
});

// filtrar los datos para filtrar las tareas funsion de filtrado simple y filtrado cruzado por categoría y prioridad tiene que devolver un  hacer arrray de obj hacerlo y aplicar un filtro en ese



// const allCheckbox = dellListaCheckbox.concat(dellPrioCheckbox)
 // Selecciona los checkboxes de la sección de filtros
// const tareas = document.querySelectorAll("li"); // Selecciona todas las tareas
// console.log(allCheckbox);


// const limpieza =  document.addEventListener("click", () => {
//     tareas.forEach((tarea) => {
//         tarea.style.display = "none"; // Oculta la tarea
//     }); 
    
// });


// const checkboxes = document.querySelectorAll(".filtros-container input[type='checkbox']");

// const Limpiar = document.addEventListener("click", () => {
//     const tareas = document.querySelectorAll("li"); // Selecciona todas las tareas
//     if (tareas.length > 0) {
//         tareas.forEach((tarea) => {
//             tarea.style.display = "none"; // Oculta la tarea
//         });
//     }
// });




//   eliminar.forEach((checkbox) => {
//       checkbox.addEventListener("change", () => {
//           const eliminar = checkbox.checked;
//           const tareas = document.querySelectorAll("li");
//           if (tareas.length > 0) {
//               tareas.forEach((tarea) => {
//                   if (eliminar) {
//                       tarea.style.display = "none";
//                   } else {
//                       tarea.style.display = "list-item";
//                   }
//               });
//           }
//       });
//   });

//cuando trabajas con un objeto se trabaja con function despues del objeto y para trabajar con las clases si se puede trabajar sin ponerle function
    tareas = [
        { id: 1, nombre: "Tarea 1", categoria: "Pendientes", prioridad: "Alta" },
        { id: 2, nombre: "Tarea 2", categoria: "En progreso", prioridad: "Media" },
        { id: 3, nombre: "Tarea 3", categoria: "Completadas", prioridad: "Baja" },
    ]
    
    function filtrarPorCategoria(categoria) {
        return tareas.filter(tarea => tarea.categoria === categoria);
    }
    function filtrarPorPrioridad(prioridad) {
        return tareas.filter(tarea => tarea.prioridad === prioridad);
    }
    function filtrarPorCategoriaYPrioridad(categoria, prioridad) {
        return tareas.filter(tarea => tarea.categoria === categoria && tarea.prioridad === prioridad);
    }
    function filtrarPorNombre(nombre) {
        return tareas.filter(tarea => tarea.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    function filtrarPorNombreYcategoriaYprioridad(nombre, categoria, prioridad) {
        return tareas.filter(tarea => tarea.nombre.toLowerCase().includes(nombre.toLowerCase()) && tarea.categoria === categoria && tarea.prioridad === prioridad);
    }


console.log(filtrarPorNombre("tarea 2" )); // Filtra por categoría "Trabajo"

// yo habia hecho asi para trabajar con las clases

// function tareas = {
//     tareas: [
//         { id: 1, nombre: "Tarea 1", categoria: "Pendientes", prioridad: "Alta" },
//         { id: 2, nombre: "Tarea 2", categoria: "En progreso", prioridad: "Media" },
//         { id: 3, nombre: "Tarea 3", categoria: "Completadas", prioridad: "Baja" },
//     ],
//     filtrarPorCategoria(categoria) {
//         return this.tareas.filter(tarea => tarea.categoria === categoria);
//     },
//     filtrarPorNombre(nombre) {
//         return this.tareas.filter(tarea => tarea.nombre.toLowerCase().includes(nombre.toLowerCase())); 
//     },
//     filtrarPorPrioridad(prioridad) {
//         return this.tareas.filter(tarea => tarea.prioridad === prioridad);
//     },
//     filtrarPorCategoriaYPrioridad(categoria, prioridad) {
//         return this.tareas.filter(tarea => tarea.categoria === categoria && tarea.prioridad === prioridad);
//     },
//     filtrarPorCategoriaYnombreYprioridad(categoria, nombre, prioridad){
//         return this.tareas.filter(tarea => tarea.categoria === categoria && tarea.nombre.toLowerCase().includes(nombre.toLowerCase()) && tarea.prioridad === prioridad);
//     }
// };

