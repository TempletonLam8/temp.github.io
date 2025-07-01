window.onload = function () {
    loadTasks();
};

function addTask() {
    const input = document.getElementById("taskInput");
    const dueInput = document.getElementById("dueDateInput");
    const task = input.value.trim();
    const dueDate = dueInput.value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = getStoredTasks();
    tasks.push({ text: task, completed: false, due: dueDate });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    span.textContent = task + (dueDate ? ` (Due: ${dueDate})` : "");
    input.value = "";
    dueInput.value = "";
}

if (dueDate && new Date(dueDate) < new Date().setHours(0,0,0,0)) {
    span.style.color = "red"; // Overdue
}


function addTaskToDOM(task, isCompleted, dueDate = "") {
    const list = document.getElementById("taskList");
    const li = document.createElement("li");
    li.classList.add("fade-in");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const span = document.createElement("span");
    span.textContent = task + (dueDate ? ` (Due: ${dueDate})` : "");
    if (isCompleted) {
        span.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed");
        toggleTaskCompletion(task);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
}

function loadTasks() {
    const tasks = getStoredTasks();
    tasks.forEach(t => addTaskToDOM(t.text, t.completed, t.due || ""));
}

function getStoredTasks() {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
}

function toggleTaskCompletion(taskText) {
    let tasks = getStoredTasks();
    tasks = tasks.map(t =>
        t.text === taskText ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("tasks");
        document.getElementById("taskList").innerHTML = "";
    }
}

function updateTaskCounter() {
    const tasks = getStoredTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById("taskCounter").textContent = `${completed} of ${total} tasks completed`;
}
