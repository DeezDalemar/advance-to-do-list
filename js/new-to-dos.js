let userID = 0;

const prioritySelect = document.querySelector("#priority");
const categorySelect = document.querySelector("#category");
const descriptionText = document.querySelector("#description");
const deadlineInput = document.querySelector("#deadline");
const usernameDisplay = document.querySelector("#usernameDisplay")


const submitButton = document.querySelector("#submitButton");

window.onload = init;
submitButton.addEventListener("click", addToDoItem);
document.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#addTodoForm").addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();
   });
});

function init() {
   const urlParams = new URLSearchParams(location.search);

   if (urlParams.has("userid") === true) {
      userID = urlParams.get("userid");
   }

    console.log(userID);
    grabUsername()
    loadCategoryList()
}

async function addToDoItem() {
    if (prioritySelect.value && categorySelect.value && descriptionText.value && deadlineInput.value) {
        let response = await fetch(`http://localhost:8083/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getFormData()),
        });

        window.location.assign("http://127.0.0.1:5500/todos.html");
    } else {
        console.log("Welp smthn went wrong");
    }
}

function getFormData() {
    let newToDoObj = {
        userid: userID,
        category: categorySelect.value,
        description: descriptionText.value,
        deadline: deadlineInput.value,
       priority: prioritySelect.value
    }
    console.log(newToDoObj);
    return newToDoObj;
}

async function grabUsername() {
    let response = await fetch("http://localhost:8083/api/users");
    let data = await response.json();

    let currentUserData = data.find((user) => user.id == userID);
    usernameDisplay.innerText = currentUserData.username
}

async function loadCategoryList() {
    let response = await fetch("http://localhost:8083/api/categories");
    let data = await response.json()

    for (const category of data) {
        let option = new Option(category.name, category.name)
        categorySelect.appendChild(option)
    }
}