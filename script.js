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
