(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();let y;const L=new Uint8Array(16);function C(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function S(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function P(e,t,a){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){a=a||0;for(let o=0;o<16;++o)t[a+o]=i[o];return t}return S(i)}class p{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const u={All:"all",completed:"Completed",Pending:"Pending"},l={todos:[new p("Piedra del alma"),new p("Piedra de la realidad"),new p("Piedra del tiempo"),new p("Piedra del poder"),new p("Piedra del espacio"),new p("Piedra del mente")],filter:u.All},k=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=u.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},A=(e=e.All)=>{switch(e){case u.All:return[...l.todos];case u.completed:return l.todos.filter(t=>t.done===!0);case u.Pending:return l.todos.filter(t=>t.done===!1);default:throw new Error(`Option ${e} is not valid`)}},F=e=>{if(!e)throw new Error("Descripcion es necesario");l.todos.push(new p(e)),f()},I=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},U=()=>{l.todos=l.todos.filter(e=>!e.done),f()},D=(e=u.All)=>{l.filter=e,f()},M=()=>l.filter,d={deleteCompleted:U,deleteTodo:x,getCurrentFilter:M,initStore:k,loadStore:T,setFilter:D,toggleTodo:I,getTodos:A,addTodo:F,Filters:u},q=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,O=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:a,id:i}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${a}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),t&&n.classList.add("completed"),n};let g;const N=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(a=>{g.append(O(a))})};let w;const H=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=d.getTodos(u.Pending).length},h={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const r=d.getTodos(d.getCurrentFilter());N(h.TodoList,r),a()},a=()=>{H(h.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=q,document.querySelector(e).append(r),t()})();const i=document.querySelector(h.NewTodoInput),o=document.querySelector(h.TodoList),n=document.querySelector(h.ClearCompleted),m=document.querySelectorAll(h.TodoFilters);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(d.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const c=r.target.closest("[data-id]");d.toggleTodo(c.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{if(r.target.className!=="destroy")return;const c=r.target.closest("[data-id]");d.deleteTodo(c.getAttribute("data-id")),t()}),n.addEventListener("click",r=>{d.deleteCompleted(),t()}),m.forEach(r=>{r.addEventListener("click",c=>{switch(m.forEach(v=>v.classList.remove("selected")),c.target.classList.add("selected"),console.log(c.target.text),c.target.text){case"Todos":d.setFilter(d.Filters.All);break;case"Pendientes":d.setFilter(d.Filters.Pending);break;case"Completados":d.setFilter(d.Filters.completed);break}t(),console.log(num)})})};d.initStore();V("#app");
