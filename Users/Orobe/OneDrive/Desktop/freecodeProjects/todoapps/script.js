// DOM elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Task data
const taskData = [];
let currentTask = {};

// Function to reset form inputs and currentTask
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

// Event listeners

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Call function to update tasks container
  updateTaskContainer();

  // Call function to reset form inputs and currentTask
  reset();
});

// ...

// Function to save task data to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("taskData", JSON.stringify(taskData));
};

// Function to load task data from local storage
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem("taskData");
  if (savedData) {
    taskData.push(...JSON.parse(savedData));
    updateTaskContainer(); // Update tasks on page load
  }
};

// Function to add or update a task
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  saveToLocalStorage();
};

// Function to update task container
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // Clear existing tasks
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="btn edit-btn" data-task-id="${id}">Edit</button>
        <button type="button" class="btn delete-btn" data-task-id="${id}">Delete</button>
      </div>
    `;
  });

  // Add event listeners for edit and delete buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) =>
    button.addEventListener("click", handleEditTask)
  );

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", handleDeleteTask)
  );
};

// Function to handle editing a task
const handleEditTask = (event) => {
  const taskId = event.target.getAttribute("data-task-id");
  const taskToEdit = taskData.find((task) => task.id === taskId);

  // Populate form with task data
  titleInput.value = taskToEdit.title;
  dateInput.value = taskToEdit.date;
  descriptionInput.value = taskToEdit.description;

  // Set current task for update
  currentTask = taskToEdit;
};

// Function to handle deleting a task
const handleDeleteTask = (event) => {
  const taskId = event.target.getAttribute("data-task-id");
  const updatedTaskData = taskData.filter((task) => task.id !== taskId);
  taskData.length = 0; // Clear existing task data
  taskData.push(...updatedTaskData);
  updateTaskContainer();
  saveToLocalStorage();
};

// ...

// Event listener for form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask(); // Add or update task
  updateTaskContainer(); // Update tasks on form submission
  reset(); // Reset form
});

// Load tasks from local storage on page load
loadFromLocalStorage();
