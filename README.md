### Dificultad: ⚔️ Normal

-   Como usuario quiero registrar mis tareas pendientes para organizarme mejor \*
-   Como usuario quiero eliminar las tareas que ya finalizaron \*
-   Como usuario quiero agregar prioridades a cada tarea ---
-   Como usuario quiero poder guardar las tareas (conectar a db)---1
    {
    Conectar a una base de datos MySql usando XAMPP,
    definir modelos: Task y User
    }
-   Como usuario quiero poder organizar por prioridad ---2
    {
    Agregar al modelo Task una propiedad llamada priority que sea un enum con las prioridades : LOW, MEDIUM Y HIGH
    En la vista utilizando el metodo preferido podes listar las tareas en 3 columnas definidas por el enum
    }
-   Como usuario quiero poder filtrar y buscar ---3
    {
    En la vista poder visualizar todas las tareas y mediante un sistema de filtrado y busqueda visualizar solo las elegidas
    }
-   Como usuario quiero poder organizarlos por categoria ---4
    {
    Agregar al modelo Task una propiedad llamada categoria el cual seria un enum definido por el usuario,
    En la vista poder visualizarlo por categorias si se requiere.
    }
-   Como usuario quiero agregarle una descripcion a la tarea y poder editarla ---5
    {
    En el modelo Task agregar una propiedad descripcion.
    En la vista modificar el modal de creacion para agregar el campo descripcion, ademas de que en el modal de visualizacion de detalles debe poder editarse y visualizarse
    }
-   Como usuario quiero agregarle fecha y hora a las tareas ---6
    {
    Al modelo Task agregar Date y Time opcionales.
    En la vista a la hora de crear la tarea poder agregarle fecha y hora si el usuario quiere, ademas de que debe poder modificarse
    }
-   Como usuario quiero poder usar la aplicacion en mi celular y en mi computador ---7
    {
    Usar el metodo de programacion Mobile First
    }
-   Como usuario quiero poder marcar como finalizada o suspendida ---8
    {
    Agregar a el modelo Task status que sea un enum FINISH, PENDING y SUSPEND
    en la vista poder modificar el status.
    }
-   Como usuario quiero poder visualizar los detalles de la tarea ---9
    {
    Un modal donde se visualizen todos los detalles de la tarea incluyendo un boton para editar.
    }
-   Como usuario quiero poder registrarme y/o loggear ---10
    {
    Generar pagina de registro y login.
    }
