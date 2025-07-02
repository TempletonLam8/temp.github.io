window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDateInput");
  const task = input.value.trim();
  const dueDate = dateInput.value;

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  const tasks = getStoredTasks();
  tasks.push({ text: task, completed: false, due: dueDate });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToDOM(task, false, dueDate);
  input.value = "";
  dateInput.value = "";
  updateTaskCount();
}

function addTaskToDOM(task, isCompleted, dueDate = "") {
  const list = document.getElementById("taskList");
  const li = document.createElement("li");

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
    updateTaskCount();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  list.appendChild(li);
}

function loadTasks() {
  const tasks = getStoredTasks();
  tasks.forEach(t => addTaskToDOM(t.text, t.completed, t.due || ""));
  updateTaskCount();
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
    updateTaskCount();
  }
}

function downloadTasks() {
  const tasks = getStoredTasks();
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();
  URL.revokeObjectURL(url);
}

function updateTaskCount() {
  const tasks = getStoredTasks();
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById("taskCount").textContent = `${completed} of ${tasks.length} tasks completed`;
}
