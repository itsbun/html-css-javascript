/**
 * Validation: register form
 */
import { navigateTo } from "../apps/router.js";
import { isValidEmail, isValidPassword } from "./pattern.js";

export const validateRegister = () => {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) {
    return;
  }

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    const fullNameError = document.querySelector(".fullNameError");
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    const confirmPasswordError = document.querySelector(
      ".confirmPasswordError",
    );

    fullNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    // Full name validation
    if (fullName.trim() === "") {
      fullNameError.textContent = "Full name is required.";
      isValid = false;
    }

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
    } else if (!isValidPassword(password)) {
      passwordError.textContent = "Password does not meet the requirements.";
      isValid = false;
    }

    // Confirm password validation
    if (confirmPassword.trim() === "") {
      confirmPasswordError.textContent = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }

    if (isValid) {
      alert("Register account successful!");
      navigateTo("?page=login");
    }
  });
};
