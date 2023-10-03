let form = document.querySelector("form");
let submit = document.querySelector("#submit");

const userData = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function reset() {
  form.reset();
}

let firstName = document.querySelector("#firstName");
let middleName = document.querySelector("#middleName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");

function validateInput(input) {
  if (input.value.trim() === "") {
    createErrorMessage(input.name, "should not be empty", input.parentElement);
    return false;
  }
  return true;
}

function validateNoNumInput(input) {
  if (input.value.trim() === "") {
    createErrorMessage(input.name, "should not be empty", input.parentElement);
    return false;
  }
  if (/\d/.test(input.value)) {
    createErrorMessage(
      input.name,
      "should not contain numbers",
      input.parentElement
    );
    return false;
  }
  return true;
}

function register(e) {
  e.preventDefault();

  clearErrorMessages();

  const isFirstNameValid = validateNoNumInput(firstName);
  const isMiddleNameValid = validateNoNumInput(middleName);
  const isLastNameValid = validateNoNumInput(lastName);
  const isEmailValid = validateInput(email);
  const isPasswordValid = validateInput(password);
  const isConfirmPasswordValid = validateInput(confirmPassword);

  if (isFirstNameValid && firstName.value.length < 2) {
    createErrorMessage(
      "First Name",
      "should be at least 2 characters long",
      firstName.parentElement
    );
  }

  if (isMiddleNameValid && middleName.value.length < 2) {
    createErrorMessage(
      "Middle Name",
      "should be at least 2 characters long",
      middleName.parentElement
    );
  }

  if (isLastNameValid && lastName.value.length < 2) {
    createErrorMessage(
      "Last Name",
      "should be at least 2 characters long",
      lastName.parentElement
    );
  }

  if (isPasswordValid && password.value.length < 8) {
    createErrorMessage(
      "Password",
      "should be at least 8 characters long",
      password.parentElement
    );
  }

  if (
    isPasswordValid &&
    isConfirmPasswordValid &&
    password.value !== confirmPassword.value
  ) {
    createErrorMessage(
      "Passwords",
      "do not match",
      confirmPassword.parentElement
    );
  }

  if (
    isFirstNameValid &&
    isMiddleNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    password.value === confirmPassword.value
  ) {
    form.submit();
  }
}

function createErrorMessage(name, message, parent) {
  let error = document.createElement("span");
  error.classList.add("error");
  error.innerHTML = `${name} ${message}`;
  parent.appendChild(error);
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((errorElement) => {
    errorElement.remove();
  });
}

form.addEventListener("submit", register);