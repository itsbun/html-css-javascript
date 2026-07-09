import { isValidPassword } from "../../scripts/regex.js";

export const validateResetPassword = () => {
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  if (!resetPasswordForm) {
    return;
  }

  resetPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(resetPasswordForm);
    const password = String(formData.get("password") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    ).trim();

    const passwordError = resetPasswordForm.querySelector(
      ".reset-password__error",
    );
    const confirmPasswordError = resetPasswordForm.querySelector(
      ".confirm-reset-password__error",
    );

    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (!isValidPassword(password)) {
      passwordError.textContent = "Password must be at least 8 characters.";
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
      alert("Password reset link sent to your email.");
      resetPasswordForm.reset();
    }
  });
};
