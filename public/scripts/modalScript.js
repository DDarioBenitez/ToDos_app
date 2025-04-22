
/* Definicion de elementos a usar */

const modalsContainer = document.getElementById("modals-container");
const editTaskButton = document.getElementById("editTaskFromDetails");
const modals = {
  add: {
    modal: document.getElementById("modalAddTaskContainer"),
    openButton: document.getElementById("addTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalAdd"),
      document.getElementById("cancelButtonModalAdd")
    ]
  },
  edit: {
    modal: document.getElementById("editTaskContainer"),
    openButton: document.getElementById("editTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalEdit"),
      document.getElementById("cancelButtonModalEdit")
    ]
  },
  details: {
    modal: document.getElementById("modalDetailsContainer"),
    openButton: document.getElementById("DetailsTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalDetails"),
      document.getElementById("cancelButtonModalDetails")
    ]
  }

}

// Funciones básicas 
function openModal(modalName) {
  modalsContainer.style.display = "block";
  modals[modalName].modal.style.display = "block";
}

function closeModal(modalName) {
  modalsContainer.style.display = "none";
  modals[modalName].modal.style.display = "none";
}


// Para abrir modales
if (modals.add.openButton) {
  modals.add.openButton.addEventListener("click", () => openModal("add"));
}

if (modals.edit.openButton) {
  modals.edit.openButton.addEventListener("click", () => openModal("edit"));
}

if (modals.details.openButton) {
  modals.details.openButton.addEventListener("click", () => openModal("details"));
}

// Para cerrar modales
modals.add.closeButtons.forEach(btn => {
  if (btn) btn.addEventListener("click", () => closeModal("add"));
});

modals.edit.closeButtons.forEach(btn => {
  if (btn) btn.addEventListener("click", () => closeModal("edit"));
});

modals.details.closeButtons.forEach(btn => {
  if (btn) btn.addEventListener("click", () => closeModal("details"));
});


editTaskButton.addEventListener("click", () => openModal("edit"));

// click fuera del modal
modalsContainer.addEventListener("click", function (e) {
  if (e.target === modalsContainer) {
    // Cerrar todos los modales
    closeModal("add");
    closeModal("edit");
    closeModal("details");
  }
});





//Contendores Modales


// const modalAddTaskContainer = document.getElementById("modalAddTaskContainer");
// const x_add = document.getElementById("closeButtonModalAdd");
// const cancel_add = document.getElementById("cancelButtonModalAdd");
// const addTaskButton = document.getElementById("addTaskButton");


// const editTaskContainer = document.getElementById("editTaskContainer");
// const editTaskButton = document.getElementById("editTaskButton");
// const x_edit = document.getElementById("closeButtonModalEdit");
// const cancel_edit = document.getElementById("cancelButtonModalEdit");


// const modalDetailsContainer = document.getElementById("modalDetailsContainer");
// const DetailsTaskButton = document.getElementById("DetailsTaskButton");
// const x_details = document.getElementById("closeButtonModalDetails");
// const cancel_details = document.getElementById("cancelButtonModalDetails");


//Botones Para mostrar

// Botones para cerrar



// //Abrir Modales

// function openAddTaskModal() {
//   modalsContainer.style.display = "block";
//   modalAddTaskContainer.style.display = "block";
// }

// function openEditTaskModal() {
//   modalsContainer.style.display = "block";
//   editTaskContainer.style.display = "block";
// }

// function openDetailsTaskModal() {
//   modalsContainer.style.display = "block";
//   modalDetailsContainer.style.display = "block";
// }

// // Cerrar Modales

// function closeAddTaskModal() {
//   modalsContainer.style.display = "none";
//   modalAddTaskContainer.style.display = "none";
// }

// function closeEditTaskModal() {
//   modalsContainer.style.display = "none";
//   editTaskContainer.style.display = "none";
// }

// function closeDetailsTaskModal() {
//   modalsContainer.style.display = "none";
//   modalDetailsContainer.style.display = "none";
// }

// // Listeners

// //Para abrir Agregar Tarea
// addTaskButton.addEventListener("click", openAddTaskModal);
// editTaskButton.addEventListener("click", openEditTaskModal);
// DetailsTaskButton.addEventListener("click", openDetailsTaskModal);

// //Para  Cerrar agregar Tarea
// x_add.addEventListener("click", closeAddTaskModal);
// cancel_add.addEventListener("click", closeAddTaskModal);

// //Para cerrar Detalles
// x_details.addEventListener("click", closeDetailsTaskModal);
// cancel_details.addEventListener("click", closeDetailsTaskModal);

// modalsContainer.addEventListener("click", function (e) {
//   if (e.target === modalsContainer) {
//     closeAddTaskModal();
//   }
// });

// //Para Cerrar Editar tarea

// x_edit.addEventListener("click", closeEditTaskModal);
// cancel_edit.addEventListener("click", closeEditTaskModal);
