let userSelect = document.querySelector("#userSelect");

let userText = document.querySelector("#userText");
let userNameText = document.querySelector("#userNameText");
let finishedText = document.querySelector("#finishedText");
let userIDText = document.querySelector("#userIDText");

let infoCard = document.querySelector("#infoCard");

let userTab = document.querySelector("#userTab");
let infoTab = document.querySelector("#infoTab");

let userTabData = document.querySelector("#userTabData");
let infoTabData = document.querySelector("#infoTabData");

let lowCardContainer = document.querySelector("#lowCardContainer");
let mediumCardContainer = document.querySelector("#mediumCardContainer");
let highCardContainer = document.querySelector("#highCardContainer");

let highPriorityTasksElement = document.querySelector("#highPriorityTasks");
let mediumPriorityTasksElement = document.querySelector("#mediumPriorityTasks");
let lowPriorityTasksElement = document.querySelector("#lowPriorityTasks");
let tasksCompleteElement = document.querySelector("#tasksComplete");
let tasksLeftElement = document.querySelector("#tasksLeft");

let lowContainer = document.querySelector("#lowContainer");
let mediumContainer = document.querySelector("#mediumContainer");
let highContainer = document.querySelector("#highContainer");

let makeToDoLinkNoList = document.querySelector("#makeToDoLinkNoList");
let makeToDoLink = document.querySelector("#makeToDoLink");

let currentId = 0;

//counters
let lowPriorityTasks = 0;
let mediumPriorityTasks = 0;
let highPriorityTasks = 0;

let completeTasks = 0;
let incompleteTasks = 0;

window.onload = loadUsers;

userSelect.addEventListener("change", loadUserData);

userTab.addEventListener("click", function () {
   userTabData.style.display = "block";
   infoTabData.style.display = "none";
});
infoTab.addEventListener("click", function () {
   userTabData.style.display = "none";
   infoTabData.style.display = "block";
});

async function loadUsers() {
   let response = await fetch("http://localhost:8083/api/users");
   let data = await response.json();

   for (const user of data) {
      let option = new Option(user.name, user.id);
      userSelect.appendChild(option);
   }
}

async function loadUserData() {
   lowPriorityTasks = 0;
   mediumPriorityTasks = 0;
   highPriorityTasks = 0;
   completeTasks = 0;
   incompleteTasks = 0;

   let response = await fetch("http://localhost:8083/api/users");
   let data = await response.json();

   let currentUserData = data.find((user) => user.id == userSelect.value);
   console.log(currentUserData);

   userText.innerText = currentUserData.name;
   userNameText.innerText = currentUserData.username;
   userIDText.innerText = currentUserData.id;

   //display the user data
   if (userSelect.value) {
      infoCard.style.display = "block";
   } else {
      infoCard.style.display = "none";
   }

   currentId = currentUserData.id;
   makeToDoLinkNoList.href = `http://127.0.0.1:5500/new_todos.html?userid=${currentUserData.id}`;
   makeToDoLink.href = `http://127.0.0.1:5500/new_todos.html?userid=${currentUserData.id}`;
   loadUsersToDos();
}

async function loadUsersToDos() {
   lowPriorityTasks = 0;
   mediumPriorityTasks = 0;
   highPriorityTasks = 0;
   completeTasks = 0;
   incompleteTasks = 0;

   //grabbing the user todos
   let response = await fetch("http://localhost:8083/api/todos/byuser/" + currentId);
   let data = await response.json();

   lowCardContainer.innerHTML = " ";
   mediumCardContainer.innerHTML = " ";
   highCardContainer.innerHTML = " ";

   for (const listIrem of data) {
      createCard(listIrem.category, listIrem.completed, listIrem.priority, listIrem.description, listIrem.deadline);
   }

   let completedPercent = (completeTasks / (incompleteTasks + completeTasks)) * 100;
   if (String(completedPercent) != "NaN") {
      finishedText.innerText = Math.round(completedPercent) + "%";
      makeToDoLinkNoList.style.display = "none";
      makeToDoLink.style.display = "block";
   } else {
      finishedText.innerText = "You have no tasks! Make some tasks to get started.";
      makeToDoLinkNoList.style.display = "block";
      makeToDoLink.style.display = "none";
   }
   updatePriorityContainersVisibility();
}

function createCard(category, isCompleted, priority, description, deadline) {
   // Create card elements
   let card = document.createElement("div");
   card.className = "card mb-3";

   let cardHeader = document.createElement("div");
   cardHeader.className = "card-header";

   // Add check mark or x image
   let checkOrXImage = document.createElement("img");
   checkOrXImage.className = "smallImage";
   if (isCompleted) {
      checkOrXImage.src = "imgs/checkmark-removebg-preview.png";
      checkOrXImage.alt = "Check Mark";
   } else {
      checkOrXImage.src = "imgs/image_2023-12-16_235826163-removebg-preview.png";
      checkOrXImage.alt = "X";
   }
   checkOrXImage.style.float = "right"; // Float to the right
   checkOrXImage.style.marginLeft = "10px"; // Add some margin for spacing

   // Add category text
   let cardTitle = document.createElement("h4");
   cardTitle.className = "card-title";
   cardTitle.style.display = "inline";
   cardTitle.innerText = category;

   // Add isCompleted text
   let isCompletedText = document.createElement("p");
   if (isCompleted) {
      isCompletedText.innerText = "Complete";
   } else {
      isCompletedText.innerText = "Incomplete";
   }

   // Add priority text
   let priorityText = document.createElement("p");
   if (priority === "High") {
      priorityText.className = "text-danger";
   } else if (priority === "Medium") {
      priorityText.className = "text-warning";
   } else {
      priorityText.className = "text-success";
   }
   priorityText.innerText = priority;

   cardHeader.appendChild(checkOrXImage); // Append the check mark or x image
   cardHeader.appendChild(cardTitle);
   cardHeader.appendChild(isCompletedText);
   cardHeader.appendChild(priorityText);

   let cardBody = document.createElement("div");
   cardBody.className = "card-body";

   let descriptionText = document.createElement("p");
   descriptionText.innerText = description;

   cardBody.appendChild(descriptionText);

   let cardFooter = document.createElement("div");
   cardFooter.className = "card-footer";

   let deadlineText = document.createElement("p");
   deadlineText.className = "text-black-50 small";
   deadlineText.innerText = deadline;

   cardFooter.appendChild(deadlineText);

   card.appendChild(cardHeader);
   card.appendChild(cardBody);
   card.appendChild(cardFooter);

   // Append the card to the appropriate container based on priority
   if (priority === "High") {
      highCardContainer.appendChild(card);
   } else if (priority === "Medium") {
      mediumCardContainer.appendChild(card);
   } else {
      lowCardContainer.appendChild(card);
   }

   incrementPriorityCounter(priority, isCompleted);

   highPriorityTasksElement.innerText = "High Priority Tasks: " + highPriorityTasks;
   mediumPriorityTasksElement.innerText = "Medium Priority Tasks: " + mediumPriorityTasks;
   lowPriorityTasksElement.innerText = "Low Priority Tasks: " + lowPriorityTasks;
   tasksCompleteElement.innerText = "Tasks Completed: " + completeTasks;
   tasksLeftElement.innerText = "Tasks Left: " + incompleteTasks;
}

function incrementPriorityCounter(priority, isComplete) {
   switch (priority.toLowerCase()) {
      case "low":
         lowPriorityTasks++;
         break;
      case "medium":
         mediumPriorityTasks++;
         break;
      case "high":
         highPriorityTasks++;
         break;
      default:
         console.log("Invalid priority level");
         break;
   }

   if (isComplete) {
      completeTasks++;
   } else {
      incompleteTasks++;
   }
}

function updatePriorityContainersVisibility() {
   lowContainer.style.display = lowPriorityTasks > 0 ? "block" : "none";
   mediumContainer.style.display = mediumPriorityTasks > 0 ? "block" : "none";
   highContainer.style.display = highPriorityTasks > 0 ? "block" : "none";

   // Update task counts next to each priority
   document.querySelector("#lowPriorityCount").innerText = ` ${lowPriorityTasks}`;
   document.querySelector("#mediumPriorityCount").innerText = ` ${mediumPriorityTasks}`;
   document.querySelector("#highPriorityCount").innerText = ` ${highPriorityTasks}`;
}
