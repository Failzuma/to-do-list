// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = 'DONE';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);
    // Check Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'DELETE';
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton);
    // Append to List
    todoList.appendChild(todoDiv);
    // Clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    // CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK--HEY DO I ALREADY HAVE THING HERE
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // CHECK--HEY DO I ALREADY HAVE THING HERE
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = 'DONE';
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        // Check Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'DELETE';
        deleteButton.classList.add('delete-btn')
        todoDiv.appendChild(deleteButton);
        // Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}