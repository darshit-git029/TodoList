export function addTask(inputText, container, showStatus, action, confirmDeleteTask, taskNumber, saveToLocalStorage) {
    const text = inputText.value.trim();

    if (text !== '') {
        const taskContainer = document.createElement('div');
        const taskcount = document.querySelector(".No")
        taskContainer.classList.add('task-container');
        taskcount.classList.add("No");
        taskContainer.setAttribute('data-task-number', taskNumber);

        const indexDiv = document.createElement('div');
        indexDiv.classList.add('task-index');
        indexDiv.innerText = taskNumber;
        taskcount.appendChild(indexDiv);

        const textArea = document.createElement("textarea");
        textArea.readOnly = true;
        textArea.value = text;
        textArea.classList.add('textarea');
        taskContainer.appendChild(textArea);
        container.appendChild(taskContainer);
        inputText.value = "";

        // STATUS
        const status = document.createElement("div");
        status.classList.add("status-text");
        status.innerHTML = "InProgress";
        taskContainer.appendChild(status);
        showStatus.appendChild(status);

        // DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", () => {
            // Call the function to delete the task
            confirmDeleteTask(taskContainer, status, deleteBtn, finishBtn);
        });
        action.appendChild(deleteBtn);  // Ensure you're appending to the correct parent


        // FINISH BUTTON
        const finishBtn = document.createElement("button");
        finishBtn.classList.add("finished-btn");
        finishBtn.innerHTML = "Finished";
        finishBtn.addEventListener("click", () => {
            if (textArea.style.color !== "green") {
                textArea.style.color = "green";
                textArea.style.fontWeight = "600";
                textArea.style.textAlign = "center";
                status.innerHTML = "Complete";
                saveToLocalStorage();
            } else {
                alert("This task is already Finished.");
            }
        });
        
        taskContainer.appendChild(finishBtn);
        action.appendChild(finishBtn);

        return taskContainer; // Return the task container for editing
    }
}
