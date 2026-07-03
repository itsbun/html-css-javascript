/**
 * Validation: register form
 */
import { navigateTo } from "../../apps/router.js";
import { isValidEmail, isValidPassword } from "../../scripts/regex.js";

export const validateRegister = () => {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) {
    return;
  }

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    ).trim();

    const fullNameError = registerForm.querySelector(".fullNameError");
    const emailError = registerForm.querySelector(".emailError");
    const passwordError = registerForm.querySelector(".passwordError");
    const confirmPasswordError = registerForm.querySelector(
      ".confirmPasswordError",
    );

    fullNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    if (fullName === "") {
      fullNameError.textContent = "Full name is required.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (!isValidPassword(password)) {
      passwordError.textContent = "Password does not meet the requirements.";
      isValid = false;
    }

    if (confirmPassword === "") {
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
