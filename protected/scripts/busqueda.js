
let valor_input

document.getElementById("id_input") .addEventListener('keydown', (e) => { 
    if (e.key === "Enter"){
        e.preventDefault();
        valor_input = e.target.value;
        console.log(valor_input);


        const tarea_nombre = tareas.filter(tarea=>tarea.nombre===valor_input)
        console.log(tarea_nombre)

        const tarea_categoria = tareas.filter(tarea=>tarea.categoria===valor_input)
        console.log(tarea_categoria)

        const tarea_prioridad = tareas.filter(tarea=>tarea.prioridad===valor_input)
        console.log(tarea_prioridad)

    }
});


let tareas = [
    {
        nombre: 'Matemática',
        categoria: 'Pendientes',
        prioridad: "alta"
    },
    {
        nombre: 'Lengua',
        categoria: 'En progreso',
        prioridad: "alta"
    }
]