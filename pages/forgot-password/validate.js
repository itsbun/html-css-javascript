import { isValidEmail } from "../../scripts/regex.js";

export const validateForgotPassword = () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  if (!forgotPasswordForm) {
    return;
  }

  forgotPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(forgotPasswordForm);
    const email = String(formData.get("email") ?? "").trim();

    const emailError = forgotPasswordForm.querySelector(
      ".forgot-password__error",
    );

    emailError.textContent = "";

    let isValid = true;

    if (email === "") {
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
