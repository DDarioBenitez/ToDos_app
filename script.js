document.addEventListener('DOMContentLoaded', function() {
    const tareaForm = document.getElementById('tareaForm');
    const nuevaTarea = document.getElementById('nuevaTarea');
    const listaTareas = document.getElementById('listaTareas');
    
    // Cargar tareas al inicio
    cargarTareas();
    
    // Agregar nueva tarea
    tareaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (nuevaTarea.value.trim() === '') return;
      
      const formData = new FormData();
      formData.append('accion', 'agregar');
      formData.append('texto', nuevaTarea.value);
      
      fetch('tareas.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.exito) {
          nuevaTarea.value = '';
          cargarTareas();
        }
      });
    });
    
    // Cargar tareas desde el servidor
    function cargarTareas() {
      fetch('tareas.php?accion=listar')
        .then(response => response.json())
        .then(data => {
          listaTareas.innerHTML = '';
          
          data.tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.textContent = tarea.texto;
            li.dataset.id = tarea.id;
            
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', function() {
              eliminarTarea(tarea.id);
            });
            
            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
          });
        });
    }
    
    // Eliminar tarea
    function eliminarTarea(id) {
      const formData = new FormData();
      formData.append('accion', 'eliminar');
      formData.append('id', id);
      
      fetch('tareas.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.exito) {
          cargarTareas();
        }
      });
    }
  });



  //aca empece yo luquitas

  // Lista de tareas 
  const tareas = [];

  // Variables para las selecciones
  let categoriaSeleccionada = '';
  let prioridadSeleccionada = '';

  // Función para mostrar las tareas filtradas
  function mostrarTareas() {
    const tareasFiltradas = tareas.filter(tarea => {
      const cumpleCategoria = categoriaSeleccionada ? tarea.categoria === categoriaSeleccionada : true;
      const cumplePrioridad = prioridadSeleccionada ? tarea.prioridad === prioridadSeleccionada : true;
      return cumpleCategoria && cumplePrioridad;
    });

    const resultadoDiv = document.getElementById('resultado');
    if (tareasFiltradas.length === 0) {
      resultadoDiv.innerHTML = "<p>No hay tareas que coincidan con los filtros.</p>";
    } else {
      resultadoDiv.innerHTML = tareasFiltradas.map(tarea => `
        <div class="tarea">
          <strong>${tarea.titulo}</strong><br>
          Categoría: ${tarea.categoria} | Prioridad: ${tarea.prioridad}
        </div>
      `).join('');
    }
  }

  // Eventos para los botones de categoría
  document.getElementById('desarrollo').addEventListener('click', function() {
    categoriaSeleccionada = 'desarrollo';
    mostrarTareas();
  });

  document.getElementById('research').addEventListener('click', function() {
    categoriaSeleccionada = 'research';
    mostrarTareas();
  });

  document.getElementById('documentaciones').addEventListener('click', function() {
    categoriaSeleccionada = 'documentaciones';
    mostrarTareas();
  });

  // Eventos para los botones de prioridad
  document.getElementById('high').addEventListener('click', function() {
    prioridadSeleccionada = 'high';
    mostrarTareas();
  });

  document.getElementById('medium').addEventListener('click', function() {
    prioridadSeleccionada = 'medium';
    mostrarTareas();
  });

  document.getElementById('low').addEventListener('click', function() {
    prioridadSeleccionada = 'low';
    mostrarTareas();
  });