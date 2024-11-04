let tasks = [];

function createTaskElement(task, index) {
    const taskItem = document.createElement('li');
    taskItem.classList.toggle('tasks-completed', task.completed);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        taskItem.classList.toggle('tasks-completed', task.completed);
        saveAllTasks();
    });

    taskItem.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    taskItem.appendChild(taskText);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.name;
    editInput.style.display = 'none';

    editInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const newTaskName = editInput.value.trim();
        if (newTaskName) {
            task.name = newTaskName;
            taskText.textContent = task.name;
            editInput.style.display = 'none';
            taskText.style.display = 'inline';
            saveAllTasks();
        }
    }
});

    const editButton = document.createElement('button');
    editButton.innerHTML ='<img src="img/icon 06.png" class="edit-icon task-icon" alt="редактировать" >';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
        if (editInput.style.display === 'none') {
            editInput.style.display = 'inline';
            taskText.style.display = 'none';
            editInput.focus();
        } else {
            const newTaskName = editInput.value.trim();
            if (newTaskName) {
                task.name = newTaskName;
                taskText.textContent = task.name;
                editInput.style.display = 'none';
                taskText.style.display = 'inline';
                saveAllTasks();
            }
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img src="img/icon 07.png" class="delete-icon task-icon" alt="удалить" >';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        tasks.splice(index, 1);
        saveAllTasks();
    });

    taskItem.append(checkbox, editInput, taskText, editButton, deleteButton);
    return taskItem;
}

function saveAllTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks.map(taskData => ({
        name: taskData.name,
        completed: taskData.completed,
    }));
    renderTasks();
}

function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
}

function addNewTask() {
    const taskInput = document.querySelector('.task-input');
    const taskName = taskInput.value.trim();

    if (taskName === '') {
        alert('Задача не может быть пустой!');
        return;
    }

    const newTask = { name: taskName, completed: false };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
    saveAllTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const taskInput = document.querySelector('.task-input');
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addNewTask();
        }
    });
});

document.querySelector('.task-input-container').style.display = 'block';