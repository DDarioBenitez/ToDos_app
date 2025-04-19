console.log("Funca");

/* Definicion de elementos a usar */

//Contendores Modales
const modalsContainer = document.getElementById("modals-container");
const modalAddTaskContainer = document.getElementById("modalAddTaskContainer");
const editTaskContainer = document.getElementById("editTaskContainer");
const modalDetailsContainer = document.getElementById("modalDetailsContainer");

//Botones Para mostrar
const addTaskButton = document.getElementById("addTaskButton");
const editTaskButton = document.getElementById("editTaskButton");
const DetailsTaskButton = document.getElementById("DetailsTaskButton");

// Botones para cerrar
const x_add = document.getElementById("closeButtonModalAdd");
const cancel_add = document.getElementById("cancelButtonModalAdd");

const x_edit = document.getElementById("closeButtonModalEdit");
const cancel_edit = document.getElementById("cancelButtonModalEdit");

const x_details = document.getElementById("closeButtonModalDetails");
const cancel_details = document.getElementById("cancelButtonModalDetails");

//Abrir Modales

function openAddTaskModal() {
  modalsContainer.style.display = "block";
  modalAddTaskContainer.style.display = "block";
}

function openEditTaskModal() {
  modalsContainer.style.display = "block";
  editTaskContainer.style.display = "block";
}

function openDetailsTaskModal() {
  modalsContainer.style.display = "block";
  modalDetailsContainer.style.display = "block";
}

// Cerrar Modales

function closeAddTaskModal() {
  modalsContainer.style.display = "none";
  modalAddTaskContainer.style.display = "none";
}

function closeEditTaskModal() {
  modalsContainer.style.display = "none";
  editTaskContainer.style.display = "none";
}

function closeDetailsTaskModal() {
  modalsContainer.style.display = "none";
  modalDetailsContainer.style.display = "none";
}

// Listeners

//Para abrir Agregar Tarea
addTaskButton.addEventListener("click", openAddTaskModal);
editTaskButton.addEventListener("click", openEditTaskModal);
DetailsTaskButton.addEventListener("click", openDetailsTaskModal);

//Para  Cerrar agregar Tarea
x_add.addEventListener("click", closeAddTaskModal);
cancel_add.addEventListener("click", closeAddTaskModal);

//Para cerrar Detalles
x_details.addEventListener("click", closeDetailsTaskModal);
cancel_details.addEventListener("click", closeDetailsTaskModal);

modalsContainer.addEventListener("click", function (e) {
  if (e.target === modalsContainer) {
    closeAddTaskModal();
  }
});

//Para Cerrar Editar tarea

x_edit.addEventListener("click", closeEditTaskModal);
cancel_edit.addEventListener("click", closeEditTaskModal);
