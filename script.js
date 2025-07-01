function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const list = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;

    // Remove task on click
    li.addEventListener("click", () => {
        list.removeChild(li);
    });

    list.appendChild(li);
    input.value = "";
}

// Load tasks when page loads
window.onload = function () {
    loadTasks();
};

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = getStoredTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(task);
    input.value = "";
}

function addTaskToDOM(task) {
    const list = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
        list.removeChild(li);
        removeTask(task);
    });

    list.appendChild(li);
}

function loadTasks() {
    const tasks = getStoredTasks();
    tasks.forEach(task => addTaskToDOM(task));
}

function getStoredTasks() {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
}

function removeTask(taskToRemove) {
    let tasks = getStoredTasks();
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
