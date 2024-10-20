let tasks = [];

// Функция для создания элемента задачи
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

    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
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
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        tasks.splice(index, 1);
        saveAllTasks();
    });

    taskItem.append(editInput, editButton, deleteButton);
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

// Функция для отображения задач
function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
}

// Функция для добавления новой задачи
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

// Обработчик события после загрузки страницы
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