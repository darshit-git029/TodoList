import * as selectors from './dom.js';
import { addTask } from './taskFunctions.js';

class TodoApp {
    constructor() {
        this.submitBtn = selectors.submitBtn;
        this.showText = selectors.showText;
        this.btnShow = selectors.btnShow;
        this.inputText = selectors.inputText;
        this.container = selectors.container;
        this.showStatus = selectors.showStatus;
        this.action = selectors.action;
        this.displayWork = selectors.displayWork;
        this.message = selectors.meassge;
        this.edit = selectors.edit;
        this.previous = selectors.previous;
        this.tasks = [];
        this.nextId = 1; 
        this.init();
    }

    init() {
        this.submitBtn.addEventListener("click", this.confirmAddTask.bind(this));
        this.loadFromLocalStorage();
    }

    confirmAddTask() {
        const taskText = this.inputText.value.trim();

        if (!taskText) {
            alert("Please enter a task");
            return;
        }

        if (confirm("Are you sure to add this task? ✅")) {
            const task = {
                id: this.nextId++, 
                text: taskText,
                status: "pending",
                color: "black",
                fontWeight: "normal",
            };

            this.tasks.push(task);
            this.renderTask(task);
            this.saveToLocalStorage();
            this.inputText.value = '';
        }
    }

    renderTask(task) {
        const taskElement = addTask(
            { value: task.text, status: task.status },
            this.container,
            this.showStatus,
            this.action,
            this.confirmDeleteTask.bind(this, task.id),
            task.id
        );

        task.element = taskElement;
    }

    confirmDeleteTask(taskId) {
        if (confirm("Are you sure you want to delete this task? ❌")) {
            this.deleteTask(taskId);
            this.recalculateTaskNumbers();
            this.saveToLocalStorage();
            this.showStatus();
        }
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
            const task = this.tasks[taskIndex];
            const taskElement = task.element;

            if (taskElement) {
                taskElement.remove();
            }

            this.tasks.splice(taskIndex, 1);

            // Update the nextId if necessary
            this.updateNextId();
        }
    }

    updateNextId() {
        // Find the highest current ID and set nextId to one more than that
        if (this.tasks.length > 0) {
            this.nextId = Math.max(...this.tasks.map(task => task.id)) + 1;
        } else {
            this.nextId = 1; // Reset to 1 if no tasks are present
        }
    }

    recalculateTaskNumbers() {
        this.container.querySelectorAll('.task-container').forEach((taskContainer, index) => {
            const taskIndex = taskContainer.querySelector('.task-index');
            if (taskIndex) {
                taskIndex.innerText = index + 1; // Update task number display
            }
        });
    }

    saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("nextId", this.nextId); // Save the next ID for persistence
    }

    loadFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.tasks = storedTasks;

        this.nextId = parseInt(localStorage.getItem("nextId"), 10) || 1; // Load nextId from localStorage

        this.tasks.forEach(task => {
            this.renderTask(task);
        });
        this.recalculateTaskNumbers();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const todoApp = new TodoApp();
});

const submit = document.querySelector(".submit-btn");
const edit = document.querySelector(".edit-btn");
const displayWork = document.querySelector(".display-work");
const meassge = document.querySelector(".meassge");
    
submit.addEventListener("click", () => {
    displayWork.style.display = "block";
    meassge.style.display = "none"
    edit.style.display = "block";
});