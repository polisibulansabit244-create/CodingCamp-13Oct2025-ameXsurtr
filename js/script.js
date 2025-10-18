/// Database Simulation
let tasksDb = [];

/// Add Functionality
function addTask() {
    /// Get Input Values
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    /// Validate Input
    if (validateInput(taskInput.value, taskDate.value)) {
        /// Create Task Object
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
        };

        /// Add to database
        tasksDb.push(newTask);

        /// Reset input
        taskInput.value = '';
        taskDate.value = '';

        /// Render
        renderTasks(tasksDb);
    }
}

/// Render Functionality
function renderTasks(list = tasksDb) {
    /// Clear Existing List
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    /// If no tasks
    if (list.length === 0) {
        taskList.innerHTML = '<li>No tasks available</li>';
        return;
    }

    /// Render Each Task
    list.forEach((taskObj, index) => {
        taskList.innerHTML += `
            <li class="border p-2 rounded my-2 flex justify-between items-center">
                <span>${taskObj.task} - <strong>${taskObj.date}</strong></span>
                <button class="bg-red-400 text-white px-2 py-1 rounded" onclick="deleteTask(${index});">Delete</button>
            </li>
        `;
    });
}

/// Delete Single Task
function deleteTask(index) {
    tasksDb.splice(index, 1);
    renderTasks(tasksDb);
}

/// Delete All Functionality
function deleteAllTasks() {
    tasksDb = [];
    renderTasks();
}

/// Filter Functionality
function filterTasks() {
    const filterValue = prompt('Masukkan tanggal (YYYY-MM-DD) atau kata kunci untuk filter:');

    if (!filterValue || filterValue.trim() === '') {
        alert('Filter dibatalkan — menampilkan semua task.');
        renderTasks(tasksDb);
        return;
    }

    /// Cek apakah input berupa tanggal atau teks
    const filtered = tasksDb.filter(taskObj =>
        taskObj.task.toLowerCase().includes(filterValue.toLowerCase()) ||
        taskObj.date.includes(filterValue)
    );

    /// Render hasil filter
    renderTasks(filtered);
}

/// Input Validation
function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

/// Event Binding for Filter Button
document.getElementById('filter-btn').addEventListener('click', filterTasks);


