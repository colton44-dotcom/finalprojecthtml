let tasks = [];

const taskForm = document.getElementById('taskForm');
const taskManager = document.getElementById('taskManager');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value.trim();
    const taskPriority = document.getElementById('taskPriority').value;
    const isImportant = document.getElementById('importantCheck').checked;
    const isCompleted = document.getElementById('completedCheck').checked;

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const today = new Date().toLocaleDateString();
    const task = {
        id: Date.now(),
        name: taskName,
        priority: taskPriority,
        isImportant: isImportant,
        isCompleted: isCompleted,
        date: today
    };

    tasks.push(task);

    console.log(JSON.stringify(tasks));

    displayTasks();
    taskForm.reset();

});

function displayTasks() {
    taskManager.innerHTML = "";
    tasks.forEach(task => {
            taskManager.innerHTML += `
        <div class="task-card" id="task-${task.id}">
            <h3>${task.name}</h3>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Important:</strong> ${task.isImportant ? "Yes" : "No"}</p>
            <p><strong>Completed:</strong> ${task.isCompleted ? "Yes" : "No"}</p>
            <p><strong>Date Added:</strong> ${task.date}</p>
        <div class="task-buttons">
            <button class="complete-btn" onclick="toggleCompleted(${task.id})">
                Toggle Completed
            </button>

            <button class="delete-btn" onclick="deleteTask(${task.id})">
                Delete
            </button>
        </div>
    </div>
    `;
    });

    applyTaskStyles();
}

function applyTaskStyles() {
    tasks.forEach(function(task) {
        const taskElement = document.getElementById(`task-${task.id}`);

        if (task.priority === "High") {
            taskElement.style.borderLeftColor = "orange";
        } else if (task.priority === "Medium") {
            taskElement.style.borderLeftColor = "blue";
        } else {
            taskElement.style.borderLeftColor = "green";
        }

        if (task.isImportant) {
            taskElement.style.backgroundColor = "#ffe5e5";
            taskElement.style.color = "red"
        }

        if (task.isCompleted) {
            taskElement.style.textDecoration = "line-through";
            taskElement.style.opacity = "0.7";
        }
    });
}

function toggleCompleted(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.isCompleted = !task.isCompleted;
        }

        return task;
    });

    console.log(JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    console.log(JSON.stringify(tasks));
    displayTasks();
}