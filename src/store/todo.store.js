import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    completed: 'Completed',
    Pending: 'Pending'
}

const state = {                             // Función que crea nuevas tareas de la clase todo                       
    todos: [
        new Todo('Piedra del alma'),        // Se crea una nueva clase Todo importada desde todo.model
        new Todo('Piedra de la realidad'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del mente'),
    ],
    filter: Filters.All,
}
/**
 * Función que inicializa el store
 */
const initStore = (  ) => {                 // Función que inicializa el store
    loadStore();
    console.log('InitStore');
}

/**
 * Función que carga el store desde la memoria local del navegador 
 */
const loadStore = ( ) => {                 // Función que carga el store
    if(!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') )
    state.todos = todos;
    state.filter = filter;
}
/**
 * Función que guarda el estado actual del store en el navegador
 */
const saveStateToLocalStorage = () => {    // Guarda el estado actual en el sistema
    localStorage.setItem( 'state',JSON.stringify(state));
};

const getTodos = ( filter = filter.All ) => {    // Función que devuelve todos los registros del store
    
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.completed:
            return state.todos.filter( todo => todo.done === true ); // o ( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => todo.done === false ); // o ( todo => !todo.done );

        default:
            throw new Error(`Option ${ filter } is not valid`);
    }

}

/**
 * 
 * @param {String} descripcion 
 */
const addTodo = ( descripcion ) => {        // Función que agrega registros al store
    if (!descripcion) throw new Error('Descripcion es necesario');
    state.todos.push( new Todo( descripcion ) ) ;
    saveStateToLocalStorage();
}

/**
 * Función que recibe un id y cambia el estaddo del done
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {          // Función que marca los registros del store con su respectivo done: true
   
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {          // Función que elimina registros del store
    state.todos = state.todos.filter( todo => todo.id !== todoId )
    saveStateToLocalStorage();
}

const deleteCompleted = () => {     // Función que elimina registos completados
    state.todos = state.todos.filter( todo => !todo.done )  // elimina todos los que no estan marcados como completados
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {  // Función que filtra registros del store
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {            // Función que devuelve el filtro aplicado al store
    return state.filter;
}

export default {                            // Funciones qeu seran exportadas
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    getTodos,
    addTodo,
    Filters,
}