class TodoItem {
    constructor(id, date, description) {
        this.id = id;
        this.date = date;
        this.description = description;
    }
}

let todoItems = [];
let todoItemsId = 0;

let inputDateField = document.getElementById("input-date-field");
let inputTaskField = document.getElementById("input-task-field");
let tableTasksDiv = document.getElementById("table-tasks-div");

function deleteTodoItemById(id) {
    let index = todoItems.findIndex(todoItem => {
        return todoItem.id === id;
    });
    todoItems.splice(index, 1);

    showTodoItems();
}

function showTodoItems() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.');
    }


    let tableHtml = "";
    tableHtml += `<table class="table mb-4">`;
    tableHtml +=
        `<thead>
        <tr>
            <th scope="col">№</th>
            <th scope="col">Дата</th>
            <th scope="col">Задача</th>
            <th scope="col">Действие</th>
        </tr>
        </thead>`;

    tableHtml += "<tbody>";

    todoItems.forEach((todoItem, index) => {
        tableHtml += "<tr>";
        tableHtml += `<th scope="row">${index + 1}</th>`;
        tableHtml += `<td>${formatDate(todoItem.date)}</td>`;
        tableHtml += `<td>${todoItem.description}</td>`;
        tableHtml += `<td>
                        <button type="submit" class="btn btn-danger" onclick="deleteTodoItemById(${todoItem.id})">Удалить</button>
                     </td>`;
        tableHtml += "</tr>";

    });

    tableHtml += "</tbody>";
    tableHtml += "</table>";

    tableTasksDiv.innerHTML = tableHtml;
}

function addTodoItem() {
    if(inputTaskField.value == ""){
        alert("Ошибка добавление. Поле задача не может быть пустым!");
        return;
    }

    todoItemsId++;

    todoItems.push(new TodoItem(
            todoItemsId,
            new Date(inputDateField.value),
            inputTaskField.value
        )
    );

    inputDateField.valueAsDate = new Date();
    inputTaskField.value = "";

    showTodoItems();
}


//when script loaded
inputDateField.valueAsDate = new Date();
showTodoItems();

