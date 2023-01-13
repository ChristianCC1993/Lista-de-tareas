import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',     // Para evitar usar el string abajo creamos esta constante aquí
    NewTodoInput: '#new-todo-input',    // Referencia al id new-todo-input en app.html
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',             // . es para clases, # es para id
    PendingCountLabel: '#pending-count',        
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel);
    }

    // Cuando la función App() se llama
    (()=> {             // <= Función anónima autoinvocada
        const app = document.createElement('div'); // div: Sirve para crear secciones o agrupar contenidos
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUrl = document.querySelector( ElementIDs.TodoList );
    const ClearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
    const FiltersListItems = document.querySelectorAll( ElementIDs.TodoFilters );


    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {    //keyup: evento cuando se presiona y suelta una tecla  
        const code = event.keyCode;     // Por algún motivo node no me lee event.KeyCode si lo paso directo, razón por la cual lo guardo en una constante primero
        if ( code !== 13 ) return;   // Aqui quiere decir que  cuando se presione keyCode 13 (Enter) no hara nada mas
        if ( event.target.value.trim().length === 0 ) return;  //  Aqui le borrara los espacios al texto, tomara el largo y si este es igual a 0 no hara nada más       
        todoStore.addTodo( event.target.value);
        displayTodos();
        event.target.value= '';

    });

    todoListUrl.addEventListener( 'click', ( event ) => {
        const element = event.target.closest('[data-id]');  // con .closest('[data-id]') busca el padre mas cercano que tenga el data attribute data-id mas cercano
        todoStore.toggleTodo( element.getAttribute('data-id') );  // Le pasamos el id a toggleTodo de todo.store.js
        displayTodos();     // Recargamos el display
    });
 
    todoListUrl.addEventListener( 'click', ( event ) => {
        if (event.target.className !== 'destroy') return        // Hace que si el className de lo presionado no es destroy que regrese nada, de lo contrario proseguira con la ejecución del código
        const element = event.target.closest('[data-id]');      // con .closest('[data-id]') busca el padre mas cercano que tenga el data attribute data-id mas cercano
        todoStore.deleteTodo(element.getAttribute('data-id') ); // le paso el id correspondiende al data-id guardado en constante element  a la función deletetodo en todo.store.js
        displayTodos();                                         // Recargo el display
    });

    ClearCompletedButton.addEventListener('click', ( event ) => {
        todoStore.deleteCompleted();
        displayTodos();
    })
    FiltersListItems.forEach( element => {
        element.addEventListener('click', ( element ) => {
            FiltersListItems.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');
            console.log( element.target.text );
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(todoStore.Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(todoStore.Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(todoStore.Filters.completed);
                break;
            }
            displayTodos();
            console.log(num);
        });
    });
}