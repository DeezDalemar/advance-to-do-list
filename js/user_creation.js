const nameInput = document.querySelector("#name");
const usernameInput = document.querySelector("#username")
const togglePassword = document.querySelector("#togglePassword");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const newPasswordInput = document.querySelector("#newPassword");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const submitButton = document.querySelector("#submitButton")
const passwordFailureMessage = document.querySelector("#passwordFailureMessage");
const passwordEye = document.querySelector("#passwordEye");
const confirmPasswordEye = document.querySelector("#confirmPasswordEye");

document.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#userSignUpForm").addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();
   });
});

submitButton.addEventListener("click", checkPasswords)
togglePassword.addEventListener("click", togglePasswordVisibility)
toggleConfirmPassword.addEventListener("click", toggleConfirmPasswordVisibility)


function checkPasswords() {
    if (newPasswordInput.value == confirmPasswordInput.value) {
        passwordFailureMessage.style.display = "none"
    } else {
        passwordFailureMessage.style.display = "block";
    }
}

function togglePasswordVisibility() {
    if (newPasswordInput.type === "password") {
        newPasswordInput.type = "text"
        passwordEye.src = "imgs/show.png";
    } else {
        newPasswordInput.type = "password";
        passwordEye.src = "imgs/eye.png"
    }
}

function toggleConfirmPasswordVisibility() {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
         confirmPasswordEye.src = "imgs/show.png";
    } else {
        confirmPasswordInput.type = "password";
        confirmPasswordEye.src = "imgs/eye.png";
    }
}