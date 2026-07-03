/**
 * Validation: reset password form
 */
import { isValidEmail, isValidPassword } from "./pattern.js";

export const validateResetPassword = () => {
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  if (!resetPasswordForm) {
    return;
  }

  resetPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const passwordError = document.querySelector(".reset-password__error");
    const confirmPasswordError = document.querySelector(
      ".confirm-reset-password__error",
    );

    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    // Password validation
    if (password.trim() === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (!isValidPassword(password)) {
      passwordError.textContent = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Confirm Password validation
    if (confirmPassword.trim() === "") {
      confirmPasswordError.textContent = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }

    if (isValid) {
      alert("Password reset link sent to your email.");
      resetPasswordForm.reset();
    }
  });
};
