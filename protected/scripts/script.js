const createTask = (task) => {
    return fetch("/src/controllers/task/createTaskController.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
};

const fetchTasksByUser = async () => {
    return fetch("/src/controllers/task/getTaskController.php?mode=byUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Para incluir cookies de sesión
    });
};

// ====== GESTIÓN DE TAREAS ======
let tareas = [];

let tareaSeleccionada = null;

const todoCount = document.getElementById("toDoCount");
const inProgressCount = document.getElementById("inProgressCount");
const doneCount = document.getElementById("doneCount");
const suspendedCount = document.getElementById("suspendedCount");

const cargarTareas = async () => {
    try {
        const res = await fetchTasksByUser();
        const data = await res.json();

        console.log("📦 Respuesta recibida:", data);

        if (!res.ok || !Array.isArray(data.tasks)) {
            console.error("❌ Error al cargar tareas:", data);
            tareas = [];
        } else {
            tareas = data.tasks.map((task) => ({
                id: task.id,
                titulo: task.title,
                fecha: task.created_at?.split(" ")[0] || "2025-01-01",
                hora: task.created_at?.split(" ")[1]?.slice(0, 5) || "00:00",
                categoria: task.category,
                prioridad: task.priority,
                descripcion: task.description,
                status: task.status,
            }));

            console.log("✅ Tareas cargadas:", tareas);
        }
        todoCount.textContent = tareas.filter((t) => t.status === "pending").length;
        inProgressCount.textContent = tareas.filter((t) => t.status === "in_progress").length;
        doneCount.textContent = tareas.filter((t) => t.status === "completed").length;
        suspendedCount.textContent = tareas.filter((t) => t.status === "suspended").length;
        aplicarFiltrosYBusqueda();
    } catch (error) {
        console.error("⚠️ Error de red o ejecución:", error);
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    await cargarTareas();
});

// ====== UTILIDADES ======

function formateaCategoria(cat) {
    switch (cat) {
        case "Design":
            return "Diseño";
        case "Development":
            return "Desarrollo";
        case "Research":
            return "Revisión";
        case "Documentation":
            return "Documentación";
        default:
            return cat;
    }
}

function formateaPrioridad(prio) {
    switch (prio) {
        case "high":
            return "Alta";
        case "medium":
            return "Media";
        case "low":
            return "Baja";
        default:
            return prio;
    }
}

// ====== RENDERIZADO ======
const columnas = {
    pending: document.getElementById("column-pending"),
    in_progress: document.getElementById("column-in_progress"),
    suspended: document.getElementById("column-suspended"),
    completed: document.getElementById("column-completed"),
};

const contenedorTareas = document.querySelector(".task-column-content");

function renderizarTareas(lista) {
    // Limpiar columnas
    Object.values(columnas).forEach((col) => (col.innerHTML = ""));

    if (lista.length === 0) {
        Object.values(columnas).forEach((col) => {
            col.innerHTML = '<p style="padding:1rem;">No hay tareas para mostrar.</p>';
        });
        return;
    }

    lista.forEach((tarea) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "task-card";
        tarjeta.dataset.id = tarea.id;
        tarjeta.innerHTML = `
            <h3 class="task-card-title">${tarea.titulo}</h3>
            <p class="task-card-date">Due: ${tarea.fecha}</p>
            <div class="task-card-priority">
                <span class="badge-category">${formateaCategoria(tarea.categoria)}</span>
                <span class="badge-${tarea.prioridad}">${formateaPrioridad(tarea.prioridad)}</span>
            </div>
        `;

        const columna = columnas[tarea.status];
        if (columna) columna.appendChild(tarjeta);
    });
}

// ====== FILTROS Y BÚSQUEDA ======

const filtrosCategoria = document.querySelectorAll(".cat-inp");
const filtrosPrioridad = document.querySelectorAll(".prio-inp");
const filtrosStatus = document.querySelectorAll(".status-inp");
const btnClean = document.getElementById("btnClean");
const inputBusqueda = document.getElementById("id_input");

function obtenerFiltros() {
    const categoriasSeleccionadas = Array.from(filtrosCategoria)
        .filter((inp) => inp.checked)
        .map((inp) => inp.value);

    const prioridadesSeleccionadas = Array.from(filtrosPrioridad)
        .filter((inp) => inp.checked)
        .map((inp) => inp.value);

    const estadosSeleccionados = Array.from(filtrosStatus)
        .filter((inp) => inp.checked)
        .map((inp) => inp.value);

    return { categoriasSeleccionadas, prioridadesSeleccionadas, estadosSeleccionados };
}

function aplicarFiltrosYBusqueda() {
    const { categoriasSeleccionadas, prioridadesSeleccionadas, estadosSeleccionados } = obtenerFiltros();
    const busqueda = inputBusqueda.value.trim().toLowerCase();

    let filtradas = tareas.filter((tarea) => {
        const catOK = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(tarea.categoria.toLowerCase());
        const prioOK = prioridadesSeleccionadas.length === 0 || prioridadesSeleccionadas.includes(tarea.prioridad?.toLowerCase() ?? "");
        const statusOK = estadosSeleccionados.length === 0 || estadosSeleccionados.includes(tarea.status?.toLowerCase() ?? "");
        const searchOK = tarea.titulo.toLowerCase().includes(busqueda) || tarea.descripcion.toLowerCase().includes(busqueda);
        return catOK && prioOK && statusOK && searchOK;
    });

    renderizarTareas(filtradas);
}

filtrosCategoria.forEach((inp) => inp.addEventListener("change", aplicarFiltrosYBusqueda));
filtrosPrioridad.forEach((inp) => inp.addEventListener("change", aplicarFiltrosYBusqueda));
filtrosStatus.forEach((inp) => inp.addEventListener("change", aplicarFiltrosYBusqueda));
inputBusqueda.addEventListener("input", aplicarFiltrosYBusqueda);

btnClean.addEventListener("click", (e) => {
    filtrosCategoria.forEach((inp) => (inp.checked = false));
    filtrosPrioridad.forEach((inp) => (inp.checked = false));
    filtrosStatus.forEach((inp) => (inp.checked = false));
    inputBusqueda.value = "";
    aplicarFiltrosYBusqueda();
});

// ====== MODALES ======

const modalsContainer = document.getElementById("modals-container");
const modalAdd = document.getElementById("modalAddTaskContainer");
const modalDetails = document.getElementById("modalDetailsContainer");
const editTaskButton = document.getElementById("editTaskFromDetails");

const addTaskButton = document.getElementById("addTaskButton");
const closeButtonModalAdd = document.getElementById("closeButtonModalAdd");
const cancelButtonModalAdd = document.getElementById("cancelButtonModalAdd");
const closeButtonModalDetails = document.getElementById("closeButtonModalDetails");
const cancelButtonModalDetails = document.getElementById("cancelButtonModalDetails");
const closeButtonModalEdit = document.getElementById("closeButtonModalEdit");
const cancelButtonModalEdit = document.getElementById("cancelButtonModalEdit");

function openModal(modal) {
    modalsContainer.style.display = "block";
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
    modalsContainer.style.display = "none";
}

// Abrir modal de agregar tarea
addTaskButton.addEventListener("click", () => openModal(modalAdd));

// Cerrar modal de agregar tarea
closeButtonModalAdd.addEventListener("click", () => closeModal(modalAdd));
cancelButtonModalAdd.addEventListener("click", () => closeModal(modalAdd));

// Cerrar modal de detalles
if (closeButtonModalDetails) closeButtonModalDetails.addEventListener("click", () => closeModal(modalDetails));
if (cancelButtonModalDetails) cancelButtonModalDetails.addEventListener("click", () => closeModal(modalDetails));

// Cerrar modal haciendo click fuera
modalsContainer.addEventListener("click", function (e) {
    if (e.target === modalsContainer) {
        modalAdd.style.display = "none";
        modalDetails.style.display = "none";
        modalsContainer.style.display = "none";
    }
});

// ====== AGREGAR TAREA ======
// Capturar los datos al poner Editar tarea

const task = {
    title: null,
    dueDate: null,
    dueTime: null,
    description: null,
    category: null,
    priority: null,
};

const title = document.getElementById("titleCreateTask-inp");
const dueDate = document.getElementById("dueDate");
const dueTime = document.getElementById("dueTime");
const description = document.getElementById("descriptionTask");
const category = document.getElementById("categoriesTask");
const priority = document.getElementById("priorityTask");
const createTaskButton = document.getElementById("createTaskButton");
createTaskButton.addEventListener("click", async function () {
    const task = {
        title: title.value.trim(),
        dueDate: dueDate.value,
        dueTime: dueTime.value,
        description: description.value.trim(),
        category: category.value,
        priority: priority.value,
        user_id: 1, // O el ID dinámico según sesión
        status: task.status,
    };

    if (!task.title || !task.dueDate || !task.dueTime || !task.category || !task.priority) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    try {
        const response = await createTask(task);
        const result = await response.json();

        if (response.ok && result.success) {
            console.log("✅ Tarea creada:", result);

            // Agregar la tarea al array local 'tareas' usando el id que devuelve el backend
            tareas.push({
                id: Number(result.task_id), // convierte a número para evitar problemas
                titulo: task.title,
                fecha: task.dueDate,
                hora: task.dueTime,
                descripcion: task.description,
                categoria: task.category,
                prioridad: task.priority,
                status: task.status,
            });

            // Limpiar campos del formulario
            title.value = "";
            dueDate.value = "";
            dueTime.value = "";
            description.value = "";
            category.value = "";
            priority.value = "";

            closeModal(modalAdd); // Cerramos el modal

            // Actualizar la lista de tareas en pantalla
            aplicarFiltrosYBusqueda();
        } else {
            console.error("❌ Error al crear tarea:", result.message || result.error);
            alert("Error al crear tarea: " + (result.message || result.error));
        }
    } catch (error) {
        console.error("❌ Error en la petición:", error);
        alert("Error de red o del servidor.");
    }
});

// ====== DETALLES DE TAREA ======

contenedorTareas.addEventListener("click", function (e) {
    const card = e.target.closest(".task-card");
    if (!card) return;
    const id = card.dataset.id;
    const tarea = tareas.find((t) => t.id == id);
    if (!tarea) return;
    tareaSeleccionada = tarea;
    // Rellenar el modal de detalles
    document.querySelector(".nameTaskDesatails").textContent = tarea.titulo;
    document.querySelector(".dueDateTaskDetails").textContent = tarea.fecha;
    document.querySelector(".duaTimeTaskDetails").textContent = tarea.hora;
    document.querySelector(".descriptionTaskDetails").textContent = tarea.descripcion || "No hay descripcion disponible";
    document.querySelector(".categoryTaskDetails").textContent = formateaCategoria(tarea.categoria);
    document.querySelector(".priorityTaskDetails").textContent = formateaPrioridad(tarea.prioridad);
    document.querySelector(".statusTaskDetails").textContent = tarea.status;

    openModal(modalDetails);
});

// ====== EDITAR TAREA ======
// Referencias a los campos del modal de edición
const modalEdit = document.getElementById("editTaskContainer");
const inputEditTitle = modalEdit.querySelector(".nameTaskInput");
const inputEditDate = modalEdit.querySelector("#dueDate");
const inputEditTime = modalEdit.querySelector("#dueTime");
const inputEditDesc = modalEdit.querySelector("#descriptionTask");
const inputEditCategory = modalEdit.querySelector("#categoriesTask");
const inputEditPriority = modalEdit.querySelector("#priorityTask");
const inputEditStatus = modalEdit.querySelector("#statusTask");

document.getElementById("editTaskFromDetails").addEventListener("click", () => {
    if (!tareaSeleccionada) return;

    // Rellenar el formulario de edición
    inputEditTitle.value = tareaSeleccionada.titulo;
    inputEditDate.value = tareaSeleccionada.fecha;
    inputEditTime.value = tareaSeleccionada.hora;
    inputEditDesc.value = tareaSeleccionada.descripcion;
    inputEditCategory.value = tareaSeleccionada.categoria;
    inputEditPriority.value = tareaSeleccionada.prioridad;
    inputEditStatus.value = tareaSeleccionada.status;

    closeModal(modalDetails); // Cierra el modal de detalles
    openModal(modalEdit); // Abre el modal de edición
});

closeButtonModalEdit.addEventListener("click", () => closeModal(modalEdit));
cancelButtonModalEdit.addEventListener("click", () => closeModal(modalEdit));

// ====== MODIFICAR TAREA ======
const updateTask = (task) => {
    return fetch("/src/controllers/task/updateTaskController.php", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(task),
    });
};

const saveEditButton = modalEdit.querySelector(".positiveButton");
saveEditButton.addEventListener("click", async () => {
    if (!tareaSeleccionada) return;

    const taskEditada = {
        id: tareaSeleccionada.id,
        title: inputEditTitle.value.trim(),
        description: inputEditDesc.value.trim(),
        category: inputEditCategory.value,
        priority: inputEditPriority.value,
        status: inputEditStatus.value,
    };

    try {
        const response = await updateTask(taskEditada);
        const result = await response.json();

        if (response.ok && result.success) {
            console.log("✅ Tarea actualizada:", result);

            // Actualizar en el array local
            const index = tareas.findIndex((t) => t.id === tareaSeleccionada.id);
            if (index !== -1) {
                tareas[index] = {
                    ...tareas[index],
                    titulo: taskEditada.title,
                    descripcion: taskEditada.description,
                    categoria: taskEditada.category,
                    prioridad: taskEditada.priority,
                    status: taskEditada.status,
                };
            }

            aplicarFiltrosYBusqueda(); // Actualizar vista
            closeModal(modalEdit); // Cerrar modal
        } else {
            alert("Error al actualizar tarea: " + (result.message || result.error));
        }
    } catch (error) {
        console.error("❌ Error de red:", error);
        alert("No se pudo actualizar la tarea.");
    }
});

// ====== INICIALIZACIÓN ======
document.addEventListener("DOMContentLoaded", () => {
    aplicarFiltrosYBusqueda();
});
