/**
 * Validation: login form
 */
import { isValidEmail } from "./pattern.js";

export const validateLogin = () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Email validation
    if (email.trim() === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    // Password validation
    if (password.trim() === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    }

    if (isValid) {
      alert("Login successful!");
      loginForm.reset();
    }
  });
};
