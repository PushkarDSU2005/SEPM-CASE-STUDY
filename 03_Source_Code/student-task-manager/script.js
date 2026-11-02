"use strict";

// LocalStorage is used for this academic demonstration only. Passwords are
// stored in plain text and can be read by anyone with access to this browser.
// Do not use this client-side authentication approach for a real application.
const STORAGE_KEYS = {
  accounts: "studentTaskManager.accounts.v1",
  tasks: "studentTaskManager.tasks.v1",
  currentUser: "studentTaskManager.currentUser.v1"
};

const VALID_STATUSES = new Set(["pending", "in-progress", "completed"]);

const elements = {
  authentication: document.querySelector("#authentication"),
  dashboard: document.querySelector("#dashboard"),
  loginForm: document.querySelector("#login-form"),
  registrationForm: document.querySelector("#registration-form"),
  loginEmail: document.querySelector("#login-email"),
  loginPassword: document.querySelector("#login-password"),
  studentName: document.querySelector("#student-name"),
  registrationEmail: document.querySelector("#register-email"),
  registrationPassword: document.querySelector("#register-password"),
  logoutButton: document.querySelector("#logout-button"),
  dashboardHeading: document.querySelector("#dashboard-heading"),
  taskForm: document.querySelector("#task-form"),
  taskId: document.querySelector("#task-id"),
  taskTitle: document.querySelector("#task-title"),
  taskCourse: document.querySelector("#task-course"),
  taskDescription: document.querySelector("#task-description"),
  taskDeadline: document.querySelector("#task-deadline"),
  taskStatus: document.querySelector("#task-status"),
  taskFormHeading: document.querySelector("#task-form-heading"),
  saveTaskButton: document.querySelector("#save-task-button"),
  cancelEditButton: document.querySelector("#cancel-edit-button"),
  statusFilter: document.querySelector("#status-filter"),
  taskList: document.querySelector("#task-list"),
  upcomingTaskList: document.querySelector("#upcoming-task-list"),
  overdueTaskList: document.querySelector("#overdue-task-list"),
  taskTemplate: document.querySelector("#task-template"),
  totalTasks: document.querySelector("#total-tasks"),
  pendingTasks: document.querySelector("#pending-tasks"),
  inProgressTasks: document.querySelector("#in-progress-tasks"),
  completedTasks: document.querySelector("#completed-tasks")
};

let currentUser = null;

function getRequiredElements() {
  return Object.entries(elements)
    .filter(([, element]) => !element)
    .map(([name]) => name);
}

function createMessageElement() {
  const message = document.createElement("p");
  message.className = "app-message";
  message.setAttribute("aria-live", "polite");
  message.hidden = true;
  return message;
}

const loginMessage = createMessageElement();
const registrationMessage = createMessageElement();
const dashboardMessage = createMessageElement();

if (elements.loginForm) {
  elements.loginForm.append(loginMessage);
}
if (elements.registrationForm) {
  elements.registrationForm.append(registrationMessage);
}
if (elements.dashboard) {
  elements.dashboard.insertBefore(dashboardMessage, elements.dashboard.firstChild);
}

function showMessage(element, message, isError = false) {
  element.textContent = message;
  element.hidden = false;
  element.setAttribute("role", isError ? "alert" : "status");
}

function clearMessage(element) {
  element.textContent = "";
  element.hidden = true;
}

function clearMessages() {
  clearMessage(loginMessage);
  clearMessage(registrationMessage);
  clearMessage(dashboardMessage);
}

function readStorageArray(key, label) {
  const savedValue = localStorage.getItem(key);
  if (savedValue === null) {
    return [];
  }

  let parsedValue;
  try {
    parsedValue = JSON.parse(savedValue);
  } catch {
    throw new Error(`Saved ${label} data is invalid JSON. It was not changed.`);
  }

  if (!Array.isArray(parsedValue)) {
    throw new Error(`Saved ${label} data has an invalid format. It was not changed.`);
  }

  return parsedValue;
}

function readAccounts() {
  const accounts = readStorageArray(STORAGE_KEYS.accounts, "account");
  const validAccounts = accounts.every((account) =>
    account &&
    typeof account.id === "string" &&
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.password === "string"
  );

  if (!validAccounts) {
    throw new Error("Saved account data has an invalid format. It was not changed.");
  }

  return accounts;
}

function readTasks() {
  const tasks = readStorageArray(STORAGE_KEYS.tasks, "task");
  const validTasks = tasks.every((task) =>
    task &&
    typeof task.id === "string" &&
    typeof task.userId === "string" &&
    typeof task.title === "string" &&
    typeof task.course === "string" &&
    typeof task.description === "string" &&
    typeof task.deadline === "string" &&
    VALID_STATUSES.has(task.status)
  );

  if (!validTasks) {
    throw new Error("Saved task data has an invalid format. It was not changed.");
  }

  return tasks;
}

function saveAccounts(accounts) {
  localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function setSignedIn(isSignedIn) {
  elements.authentication.hidden = isSignedIn;
  elements.dashboard.hidden = !isSignedIn;
}

function getCurrentUserTasks() {
  if (!currentUser) {
    return [];
  }

  return readTasks().filter((task) => task.userId === currentUser.id);
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDeadline(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function sortByDeadline(tasks) {
  return [...tasks].sort((first, second) =>
    first.deadline.localeCompare(second.deadline) ||
    first.title.localeCompare(second.title)
  );
}

function updateDashboardCounts(tasks) {
  elements.totalTasks.textContent = String(tasks.length);
  elements.pendingTasks.textContent = String(
    tasks.filter((task) => task.status === "pending").length
  );
  elements.inProgressTasks.textContent = String(
    tasks.filter((task) => task.status === "in-progress").length
  );
  elements.completedTasks.textContent = String(
    tasks.filter((task) => task.status === "completed").length
  );
}

function appendTaskCard(list, task) {
  const listItem = elements.taskTemplate.content.firstElementChild.cloneNode(true);
  const article = listItem.querySelector("article");
  const course = listItem.querySelector("[data-task-course]");
  const description = listItem.querySelector("[data-task-description]");
  const deadline = listItem.querySelector("[data-task-deadline]");
  const status = listItem.querySelector("[data-task-status]");

  listItem.dataset.taskId = task.id;
  listItem.querySelector("[data-task-title]").textContent = task.title;

  course.textContent = task.course;
  course.hidden = task.course.length === 0;

  description.textContent = task.description;
  description.hidden = task.description.length === 0;

  deadline.dateTime = task.deadline;
  deadline.textContent = formatDeadline(task.deadline);

  status.textContent = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed"
  }[task.status];
  status.dataset.status = task.status;

  article.setAttribute("aria-label", `${task.title}, ${status.textContent}`);
  list.append(listItem);
}

function renderTaskList(list, tasks, emptyStateText) {
  list.replaceChildren();

  if (tasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.textContent = emptyStateText;
    emptyState.setAttribute("role", "status");
    list.append(emptyState);
    return;
  }

  for (const task of sortByDeadline(tasks)) {
    appendTaskCard(list, task);
  }
}

function renderDashboard() {
  const tasks = getCurrentUserTasks();
  const today = getTodayDateString();
  const selectedStatus = elements.statusFilter.value;

  updateDashboardCounts(tasks);

  const upcomingTasks = tasks.filter(
    (task) => task.deadline > today && task.status !== "completed"
  );
  const overdueTasks = tasks.filter(
    (task) => task.deadline < today && task.status !== "completed"
  );
  const filteredTasks = selectedStatus === "all"
    ? tasks
    : tasks.filter((task) => task.status === selectedStatus);

  renderTaskList(
    elements.upcomingTaskList,
    upcomingTasks,
    "No upcoming tasks."
  );
  renderTaskList(
    elements.overdueTaskList,
    overdueTasks,
    "No overdue tasks."
  );
  renderTaskList(
    elements.taskList,
    filteredTasks,
    selectedStatus === "all"
      ? "No tasks yet. Create a task to get started."
      : `No ${elements.statusFilter.options[elements.statusFilter.selectedIndex].text.toLowerCase()} tasks.`
  );
}

function resetTaskForm() {
  elements.taskForm.reset();
  elements.taskId.value = "";
  elements.taskFormHeading.textContent = "Create a task";
  elements.saveTaskButton.textContent = "Save task";
}

function handleStorageError(error, messageElement) {
  const message = error instanceof Error
    ? error.message
    : "An unexpected error occurred while accessing saved data.";
  showMessage(messageElement, message, true);
  console.error("Student Task Manager error:", error);
}

elements.registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage(registrationMessage);

  if (!elements.registrationForm.reportValidity()) {
    return;
  }

  const name = elements.studentName.value.trim();
  const email = normalizeEmail(elements.registrationEmail.value);
  const password = elements.registrationPassword.value;

  if (!name || !email || !password.trim()) {
    showMessage(registrationMessage, "Please complete all required fields.", true);
    return;
  }

  try {
    const accounts = readAccounts();
    if (accounts.some((account) => normalizeEmail(account.email) === email)) {
      showMessage(
        registrationMessage,
        "An account with this email address already exists.",
        true
      );
      return;
    }

    accounts.push({
      id: createId(),
      name,
      email,
      password
    });
    saveAccounts(accounts);

    elements.registrationForm.reset();
    showMessage(
      registrationMessage,
      "Account created successfully. You can now log in."
    );
  } catch (error) {
    handleStorageError(error, registrationMessage);
  }
});

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage(loginMessage);

  if (!elements.loginForm.reportValidity()) {
    return;
  }

  const email = normalizeEmail(elements.loginEmail.value);
  const password = elements.loginPassword.value;

  try {
    const account = readAccounts().find(
      (savedAccount) =>
        normalizeEmail(savedAccount.email) === email &&
        savedAccount.password === password
    );

    if (!account) {
      showMessage(loginMessage, "Invalid email address or password.", true);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.currentUser, account.id);
    currentUser = { id: account.id, name: account.name };
    elements.loginForm.reset();
    clearMessages();
    elements.dashboardHeading.textContent = `Welcome, ${currentUser.name}`;
    setSignedIn(true);
    renderDashboard();
  } catch (error) {
    handleStorageError(error, loginMessage);
  }
});

elements.logoutButton.addEventListener("click", () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    currentUser = null;
    resetTaskForm();
    elements.statusFilter.value = "all";
    clearMessages();
    setSignedIn(false);
    elements.loginEmail.focus();
  } catch (error) {
    handleStorageError(error, dashboardMessage);
  }
});

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage(dashboardMessage);

  if (!elements.taskForm.reportValidity()) {
    return;
  }

  if (!currentUser) {
    showMessage(dashboardMessage, "Please log in before saving a task.", true);
    setSignedIn(false);
    return;
  }

  const title = elements.taskTitle.value.trim();
  const course = elements.taskCourse.value.trim();
  const description = elements.taskDescription.value.trim();
  const deadline = elements.taskDeadline.value;
  const status = elements.taskStatus.value;
  const taskId = elements.taskId.value;

  if (!title || !deadline || !VALID_STATUSES.has(status)) {
    showMessage(
      dashboardMessage,
      "Enter a task title and valid deadline, and choose a valid status.",
      true
    );
    return;
  }

  try {
    const tasks = readTasks();
    const taskData = {
      title,
      course,
      description,
      deadline,
      status
    };

    if (taskId) {
      const taskIndex = tasks.findIndex(
        (task) => task.id === taskId && task.userId === currentUser.id
      );

      if (taskIndex === -1) {
        showMessage(dashboardMessage, "That task could not be found.", true);
        resetTaskForm();
        return;
      }

      tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    } else {
      tasks.push({
        id: createId(),
        userId: currentUser.id,
        ...taskData
      });
    }

    saveTasks(tasks);
    resetTaskForm();
    renderDashboard();
    showMessage(
      dashboardMessage,
      taskId ? "Task updated successfully." : "Task created successfully."
    );
  } catch (error) {
    handleStorageError(error, dashboardMessage);
  }
});

elements.taskForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    elements.taskId.value = "";
    elements.taskFormHeading.textContent = "Create a task";
    elements.saveTaskButton.textContent = "Save task";
  }, 0);
});

elements.cancelEditButton.addEventListener("click", () => {
  clearMessage(dashboardMessage);
});

elements.taskList.addEventListener("click", handleTaskAction);
elements.upcomingTaskList.addEventListener("click", handleTaskAction);
elements.overdueTaskList.addEventListener("click", handleTaskAction);

function handleTaskAction(event) {
  const actionButton = event.target.closest("button[data-action]");
  const listItem = event.target.closest("li[data-task-id]");

  if (!actionButton || !listItem || !currentUser) {
    return;
  }

  const taskId = listItem.dataset.taskId;

  try {
    const tasks = readTasks();
    const task = tasks.find(
      (savedTask) =>
        savedTask.id === taskId && savedTask.userId === currentUser.id
    );

    if (!task) {
      showMessage(dashboardMessage, "That task could not be found.", true);
      renderDashboard();
      return;
    }

    if (actionButton.dataset.action === "edit") {
      elements.taskId.value = task.id;
      elements.taskTitle.value = task.title;
      elements.taskCourse.value = task.course;
      elements.taskDescription.value = task.description;
      elements.taskDeadline.value = task.deadline;
      elements.taskStatus.value = task.status;
      elements.taskFormHeading.textContent = "Edit task";
      elements.saveTaskButton.textContent = "Update task";
      clearMessage(dashboardMessage);
      elements.taskTitle.focus();
      elements.taskForm.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (actionButton.dataset.action === "delete") {
      const confirmed = window.confirm(`Delete "${task.title}"? This cannot be undone.`);
      if (!confirmed) {
        return;
      }

      saveTasks(tasks.filter((savedTask) => savedTask.id !== task.id));
      if (elements.taskId.value === task.id) {
        resetTaskForm();
      }
      renderDashboard();
      showMessage(dashboardMessage, "Task deleted successfully.");
    }
  } catch (error) {
    handleStorageError(error, dashboardMessage);
  }
}

elements.statusFilter.addEventListener("change", () => {
  try {
    renderDashboard();
  } catch (error) {
    handleStorageError(error, dashboardMessage);
  }
});

function restoreSignedInUser() {
  const accountId = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!accountId) {
    setSignedIn(false);
    return;
  }

  const account = readAccounts().find((savedAccount) => savedAccount.id === accountId);
  if (!account) {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    setSignedIn(false);
    showMessage(loginMessage, "Please log in to continue.", false);
    return;
  }

  currentUser = { id: account.id, name: account.name };
  elements.dashboardHeading.textContent = `Welcome, ${currentUser.name}`;
  setSignedIn(true);
  renderDashboard();
}

const missingElements = getRequiredElements();
if (missingElements.length > 0) {
  console.error(
    `Student Task Manager could not start. Missing HTML elements: ${missingElements.join(", ")}`
  );
} else {
  try {
    restoreSignedInUser();
  } catch (error) {
    setSignedIn(false);
    handleStorageError(error, loginMessage);
  }
}
