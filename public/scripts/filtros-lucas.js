document.addEventListener("DOMContentLoaded", () => {
    const listaTareas = document.getElementById("listaTareas");
    const filtros = document.querySelectorAll(".filtros-lista input[type='checkbox']");
    const prioridades = document.querySelectorAll(".prioridades-lista input[type='checkbox']");

    // Función para obtener las tareas actuales
    const obtenerTareas = () => {
        return Array.from(listaTareas.querySelectorAll("li")).map((tarea) => ({
            elemento: tarea,
            categoria: tarea.dataset.categoria,
            prioridad: tarea.dataset.prioridad,
        }));
    };

    // Función para filtrar tareas
    const filtrarTareas = () => {
        const tareas = obtenerTareas();

        // Obtener filtros seleccionados
        const categoriasSeleccionadas = Array.from(filtros)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const prioridadesSeleccionadas = Array.from(prioridades)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        // Mostrar/ocultar tareas según los filtros
        tareas.forEach(({ elemento, categoria, prioridad }) => {
            const coincideCategoria =
                categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria);
            const coincidePrioridad =
                prioridadesSeleccionadas.length === 0 || prioridadesSeleccionadas.includes(prioridad);

            if (coincideCategoria && coincidePrioridad) {
                elemento.style.display = "list-item";
            } else {
                elemento.style.display = "none";
            }
        });
    };

    // Escuchar cambios en los checkboxes
    filtros.forEach((checkbox) => checkbox.addEventListener("change", filtrarTareas));
    prioridades.forEach((checkbox) => checkbox.addEventListener("change", filtrarTareas));

    // Agregar nueva tarea con datos de categoría y prioridad
    const tareaForm = document.getElementById("tareaForm");
    const nuevaTareaInput = document.getElementById("nuevaTarea");

    tareaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevaTareaTexto = nuevaTareaInput.value.trim();
        if (!nuevaTareaTexto) return;

        // Crear un ejemplo de tarea con datos ficticios
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = nuevaTareaTexto;
        nuevaTarea.dataset.categoria = "Pendiente"; // Cambiar según sea necesario
        nuevaTarea.dataset.prioridad = "Alta"; // Cambiar según sea necesario

        listaTareas.appendChild(nuevaTarea);
        nuevaTareaInput.value = "";

        filtrarTareas(); // Aplicar filtros a la nueva tarea
    });
});