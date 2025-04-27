/* Definicion de elementos a usar */

const modalsContainer = document.getElementById("modals-container");
const editTaskButton = document.getElementById("editTaskFromDetails");
const modals = {
  add: {
    modal: document.getElementById("modalAddTaskContainer"),
    openButton: document.getElementById("addTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalAdd"),
      document.getElementById("cancelButtonModalAdd"),
    ],
    active: false,
  },
  edit: {
    modal: document.getElementById("editTaskContainer"),
    openButton: document.getElementById("editTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalEdit"),
      document.getElementById("cancelButtonModalEdit"),
    ],
    active: false,
  },
  details: {
    modal: document.getElementById("modalDetailsContainer"),
    openButton: document.getElementById("DetailsTaskButton"),
    closeButtons: [
      document.getElementById("closeButtonModalDetails"),
      document.getElementById("cancelButtonModalDetails"),
    ],
    active: false,
  },
};

const allCloseButtons = modals.add.closeButtons.concat(
  modals.edit.closeButtons,
  modals.details.closeButtons
);

// Funciones básicas
function openModal(modalName) {
  modalsContainer.style.display = "block";
  modals[modalName].modal.style.display = "block";
}

function closeOnlyModal(modalName) {
  modals[modalName].modal.style.display = "none";
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
  modals.details.openButton.addEventListener("click", () =>
    openModal("details")
  );
}

editTaskButton.addEventListener("click", () => openModal("edit"));

// Para cerrar modales
modals.details.openButton.addEventListener("click", function () {
  if (modals["details"].modal.style.display === "block") {
    console.log("details esta activo");
    console.log(`Details acitivo: ${modals.details.active}`);
  }
});

modalsContainer.addEventListener("click", function (e) {
  if (e.target === modalsContainer) {
    if (
      modals.details.modal.style.display === "block" &&
      modals.edit.modal.style.display === "block"
    ) {
      closeOnlyModal("edit");
      return;
    } else {
      closeModal("add");
      closeModal("edit");
      closeModal("details");
    }
  }
});

allCloseButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", function () {
      if (
        modals.details.modal.style.display === "block" &&
        modals.edit.modal.style.display === "block"
      ) {
        console.log("Recontra anda");
        closeOnlyModal("edit");
      } else {
        closeModal("add");
        closeModal("edit");
        closeModal("details");
      }
    });
  }
});

modals.add.closeButtons.forEach((btn) => {
  if (btn) btn.addEventListener("click", () => closeModal("add"));
});

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

createTaskButton.addEventListener("click", function () {
  task.title = title.value;
  title.value = "";

  task.dueDate = dueDate.value;
  task.dueTime = dueTime.value;
  task.description = description.value;
  task.category = category.value;
  task.priority = priority.value;
  for (let element in task) {
    console.log(element + ":  " + task[element]);
    task[element].value = "";
  }
});

// Creacion del objeto tarea
