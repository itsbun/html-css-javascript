/**
 * Validation: forgot password form
 */
import { isValidEmail } from "./pattern.js";

export const validateForgotPassword = () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  if (!forgotPasswordForm) {
    return;
  }

  forgotPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const emailError = document.querySelector(".forgot-password__error");

    emailError.textContent = "";

    let isValid = true;

    // Email validation
    if (email.trim() === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    if (isValid) {
      alert("Password reset link sent to your email.");
      forgotPasswordForm.reset();
    }
  });
};
