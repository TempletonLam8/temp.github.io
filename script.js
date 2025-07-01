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
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(task, false);
    input.value = "";
}

function addTaskToDOM(task, isCompleted) {
    const list = document.getElementById("taskList");
    const li = document.createElement("li");
    li.classList.add("fade-in");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const span = document.createElement("span");
    span.textContent = task;
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
    tasks.forEach(t => addTaskToDOM(t.text, t.completed));
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
