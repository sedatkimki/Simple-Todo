const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector("#todo");
const completedTodos = document.querySelector(".completed-todos");



eventListeners();

function eventListeners() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    document.addEventListener("DOMContentLoaded",loadAllCompletedTodosToUI)
    todoList.addEventListener("click",deleteTodo);
    todoList.addEventListener("click",checkTodo);
    completedTodos.addEventListener("click",deleteTodo)
    completedTodos.addEventListener("click",markCompletedTodoAsNewTodo)
}


function deleteTodo(e) {
    if (e.target.className === "fas fa-times fa-2x") {
        // deleting animation
        e.target.parentElement.parentElement.classList.add("animate")
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 400);

        if (e.target.parentElement.parentElement.parentElement.className== "completed-todos") {
            deleteCompletedTodoFromStorage(e.target.parentElement.parentElement.firstChild.textContent);
        }
        else {
            deleteTodoFromStorage(e.target.parentElement.parentElement.firstChild.textContent);
        }
        
    }

}

function checkTodo(e) {
    if (e.target.className === "fas fa-check fa-2x")
    {
        // take completed tasks to bottom
        e.target.className = "fas fa-arrow-up fa-2x"
        completedTodos.prepend(e.target.parentElement.parentElement); 
        completedTodos.classList.add("pushdown"); // animation
        setTimeout(() => {
            completedTodos.classList.remove("pushdown");
        }, 600);

        deleteTodoFromStorage(e.target.parentElement.parentElement.firstChild.textContent);
        addCompletedTodoToStorage(e.target.parentElement.parentElement.firstChild.textContent);

        console.log(e.target.parentElement.parentElement.firstChild.textContent);
    }
}

function markCompletedTodoAsNewTodo(e) {
    if (e.target.className === "fas fa-arrow-up fa-2x")
    {
        // take completed tasks to bottom
        e.target.className = "fas fa-check fa-2x"
        todoList.prepend(e.target.parentElement.parentElement); 
        todoList.classList.add("pushdown"); // animation
        setTimeout(() => {
            todoList.classList.remove("pushdown");
        }, 600);

        deleteCompletedTodoFromStorage(e.target.parentElement.parentElement.firstChild.textContent);
        addTodoToStorage(e.target.parentElement.parentElement.firstChild.textContent);
    }
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        
    }
    else {
        // check localstorage
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
    

    e.preventDefault();
}


function addTodoToUI(newTodo) {
    const todoItem = document.createElement("li");
    todoItem.className = "container ds-flex algn-cnter jfy-spce comefromtop ";
    todoItem.setAttribute("style","list-style-type: none;");
    todoItem.innerHTML= `<h2></h2>
        <div class="button-container ds-flex">
            <button class="fas fa-check fa-2x"></button>
            <button class="fas fa-times fa-2x"></button>
        </div>
    `
    todoItem.firstChild.appendChild(document.createTextNode(newTodo));
    todoList.prepend(todoItem);
    // animation
    todoList.classList.add("pushdown");
    setTimeout(() => {
        todoList.classList.remove("pushdown");
    }, 600);
    
    

    todoInput.value= "";

}

function addCompletedTodoToUI(newTodo) {
    const todoItem = document.createElement("li");
    todoItem.className = "container ds-flex algn-cnter jfy-spce comefromtop ";
    todoItem.setAttribute("style","list-style-type: none;");
    todoItem.innerHTML= `<h2></h2>
        <div class="button-container ds-flex">
            <button class="fas fa-arrow-up fa-2x"></button>
            <button class="fas fa-times fa-2x"></button>
        </div>
    `
    todoItem.firstChild.appendChild(document.createTextNode(newTodo));
    completedTodos.prepend(todoItem);
    // animation
    completedTodos.classList.add("pushdown");
    setTimeout(() => {
        todoList.classList.remove("pushdown");
    }, 600);

}



function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos")===null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function getCompletedTodosFromStorage() {
    let completedTodos;

    if (localStorage.getItem("completedTodos")===null) {
        completedTodos = [];
    }
    else {
        completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
    }

    return completedTodos;
}


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));


}

function addCompletedTodoToStorage(newTodo) {
    let completedTodos = getCompletedTodosFromStorage();

    completedTodos.push(newTodo);

    localStorage.setItem("completedTodos",JSON.stringify(completedTodos));


}



function deleteTodoFromStorage(deletedtodo) {
    let todos = getTodosFromStorage();

    todos.forEach((element,index) => {
        if (element === deletedtodo) {
            todos.splice(index,1);
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    });
}

function deleteCompletedTodoFromStorage(deletedtodo) {
    let todos = getCompletedTodosFromStorage();

    todos.forEach((element,index) => {
        if (element === deletedtodo) {
            todos.splice(index,1);
            localStorage.setItem("completedTodos",JSON.stringify(todos));
        }
    });
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(element => {
        addTodoToUI(element);
    });
}

function loadAllCompletedTodosToUI() {
    let completedTodos = getCompletedTodosFromStorage();

    completedTodos.forEach(element => {
        addCompletedTodoToUI(element);
    });
}

