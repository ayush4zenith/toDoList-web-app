document.title = "Task Manager!";

// DOM Manipulation
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskNum");

// Loading tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

document.addEventListener("DOMContentLoaded", function () {
    new Typed("#typed", {
        strings: ["Hey there! What would you like to do today?"],
        typeSpeed: 45,
        backSpeed: 25,
        // loop: true
        showCursor: false 
    });
});

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const task = taskInput.value.trim();

        if (task !== "") {
            const taskObject = { text: task, completed: false }; 
            addTaskToList(taskObject); 
            saveTaskToLocalStorage(taskObject); // Save task to local storage
            taskInput.value = ""; 
        } else {
            alert("Please enter a task.");
        }
    });

    function addTaskToList(taskObject) {
        const listItem = document.createElement("li");


        if (taskObject.completed) {
            listItem.classList.add("completed");
        }

        listItem.textContent = taskObject.text;

        listItem.addEventListener("click", function () {
            listItem.classList.toggle("completed");
            updateTaskCompletionInLocalStorage(taskObject.text, listItem.classList.contains("completed"));
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";

        deleteButton.addEventListener("click", function () {
            taskList.removeChild(listItem);
            deleteTaskFromLocalStorage(taskObject.text); // Remove task from local storage
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    // Save task to local storage
    function saveTaskToLocalStorage(taskObject) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(taskObject);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Update task completion status in local storage
    function updateTaskCompletionInLocalStorage(taskText, isCompleted) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.map((task) =>
            task.text === taskText ? { ...task, completed: isCompleted } : task
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Loading tasks from local storage
    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(addTaskToList);
    }

    // Get tasks from local storage
    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    // Deleting task from local storage
    function deleteTaskFromLocalStorage(taskToDelete) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter((task) => task.text !== taskToDelete);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }